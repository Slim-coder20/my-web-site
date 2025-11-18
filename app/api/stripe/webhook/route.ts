/**
 * Route API : POST /api/stripe/webhook
 *
 * Cette route reçoit les événements Stripe via webhook pour mettre à jour
 * le statut des commandes après paiement.
 *
 * FLUX DE TRAVAIL :
 * 1. Stripe envoie un événement après chaque action (paiement réussi, échoué, etc.)
 * 2. On vérifie la signature du webhook pour s'assurer qu'il vient bien de Stripe
 * 3. Si l'événement est "checkout.session.completed" (paiement réussi) :
 *    - On retrouve l'Order via le stripeSessionId
 *    - On met à jour le statut de l'Order à "paid"
 *
 * IMPORTANT : Cette route doit être configurée dans le Dashboard Stripe
 * avec l'URL : https://ton-domaine.com/api/stripe/webhook
 * et l'événement : checkout.session.completed
 *
 * SÉCURITÉ : La signature du webhook est vérifiée pour éviter les requêtes frauduleuses.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

// Initialisation du client Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

// Secret du webhook (récupéré depuis le Dashboard Stripe)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Initialisation du client Resend pour l'envoi d'emails
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log("🔔 Webhook reçu !");

  // Récupération du body brut (important pour la vérification de signature)
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  console.log("📝 Signature présente:", !!signature);

  if (!signature) {
    console.error("❌ Pas de signature dans les headers");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  /**
   * VÉRIFICATION DE LA SIGNATURE DU WEBHOOK
   *
   * Stripe signe chaque webhook avec le secret pour garantir l'authenticité.
   * Si la signature ne correspond pas, cela signifie que la requête
   * ne vient pas de Stripe et on la rejette.
   */
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log("✅ Signature vérifiée, type d'événement:", event.type);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  /**
   * GESTION DE L'ÉVÉNEMENT checkout.session.completed
   *
   * Cet événement est envoyé par Stripe quand un paiement est complété avec succès.
   * On utilise le stripeSessionId pour retrouver l'Order dans notre base de données
   * et mettre à jour son statut à "paid".
   */
  if (event.type === "checkout.session.completed") {
    console.log("💳 Événement checkout.session.completed reçu");
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("📦 Session ID:", session.id);

    try {
      /**
       * MISE À JOUR DU STATUT DE L'ORDER
       *
       * On retrouve l'Order via le stripeSessionId (qui a été stocké lors de la création)
       * et on met à jour son statut de "pending" à "paid".
       */
      // Rechercher la commande de deux façons :
      // 1. Par stripeSessionId (méthode principale)
      // 2. Par orderId dans les métadonnées (solution de secours)
      console.log(
        `🔍 Recherche de la commande avec stripeSessionId: ${session.id}`
      );

      let existingOrder = await prisma.order.findUnique({
        where: { stripeSessionId: session.id },
      });

      // Si pas trouvé par stripeSessionId, essayer avec orderId des métadonnées
      if (!existingOrder && session.metadata?.orderId) {
        console.log(
          `🔍 Commande non trouvée par sessionId, recherche par orderId: ${session.metadata.orderId}`
        );
        existingOrder = await prisma.order.findUnique({
          where: { id: parseInt(session.metadata.orderId) },
        });

        // Si trouvé par orderId, mettre à jour le stripeSessionId
        if (existingOrder) {
          await prisma.order.update({
            where: { id: existingOrder.id },
            data: { stripeSessionId: session.id },
          });
          console.log(
            `✅ stripeSessionId mis à jour pour la commande ${existingOrder.id}`
          );
        }
      }

      if (!existingOrder) {
        console.log(`⚠️  Commande non trouvée pour la session: ${session.id}`);
        // Retourner 200 pour ne pas faire échouer le webhook
        return NextResponse.json({
          received: true,
          message: "Order not found (test event)",
        });
      }

      const updatedOrder = await prisma.order.update({
        where: { id: existingOrder.id },
        data: { status: "paid" },
        include: {
          items: {
            include: {
              product: true, // Inclure les détails du produit pour l'email
            },
          },
        },
      });

      console.log(`✅ Order updated to paid for session: ${session.id}`);

      /**
       * ENVOI DE L'EMAIL DE CONFIRMATION DE COMMANDE
       *
       * Après la mise à jour du statut à "paid", on envoie un email de confirmation
       * au client avec les détails de sa commande.
       */
      if (process.env.RESEND_API_KEY) {
        try {
          // Formatage du montant total
          const totalAmount = (updatedOrder.amountTotal / 100).toFixed(2);

          // Construction de la liste des produits commandés
          const productsList = updatedOrder.items
            .map(
              (item) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <strong>${item.product.title}</strong>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
                ${item.quantity}
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
                ${(item.unitPrice / 100).toFixed(2)} €
              </td>
            </tr>
          `
            )
            .join("");

          // Envoi de l'email de confirmation
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: updatedOrder.email,
            subject: "Confirmation de votre commande - Slim Abida",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
                  Merci pour votre commande !
                </h2>
                
                <p>Bonjour,</p>
                
                <p>Nous avons bien reçu votre commande et votre paiement a été confirmé.</p>
                
                <h3 style="color: #333; margin-top: 30px;">Détails de votre commande</h3>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <thead>
                    <tr style="background-color: #f5f5f5;">
                      <th style="padding: 10px; text-align: left; border-bottom: 2px solid #333;">Produit</th>
                      <th style="padding: 10px; text-align: center; border-bottom: 2px solid #333;">Quantité</th>
                      <th style="padding: 10px; text-align: right; border-bottom: 2px solid #333;">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productsList}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #333;">
                        Total :
                      </td>
                      <td style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #333;">
                        ${totalAmount} €
                      </td>
                    </tr>
                  </tfoot>
                </table>
                
                <p style="margin-top: 30px;">
                  Votre commande sera traitée dans les plus brefs délais.
                </p>
                
                <p>
                  Si vous avez des questions, n'hésitez pas à nous contacter.
                </p>
                
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                  Cordialement,<br>
                  L'équipe Slim Abida
                </p>
              </div>
            `,
          });

          console.log(`Confirmation email sent to ${updatedOrder.email}`);
        } catch (emailError) {
          // On log l'erreur mais on ne bloque pas le webhook
          // Le paiement est déjà confirmé, l'email est secondaire
          console.error("Error sending confirmation email:", emailError);
        }
      }
    } catch (error) {
      console.error("❌ Error updating order:", error);
      // Logger plus de détails pour le débogage
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      // Retourner 200 pour ne pas faire échouer le webhook
      // Stripe réessaiera automatiquement si nécessaire
      return NextResponse.json(
        {
          error: "Failed to update order",
          details:
            process.env.NODE_ENV === "development"
              ? error instanceof Error
                ? error.message
                : String(error)
              : undefined,
        },
        { status: 200 } // Retourner 200 pour éviter que Stripe réessaie indéfiniment
      );
    }
  }

  // Retour d'une confirmation à Stripe
  console.log("✅ Webhook traité avec succès");
  return NextResponse.json({ received: true });
}
