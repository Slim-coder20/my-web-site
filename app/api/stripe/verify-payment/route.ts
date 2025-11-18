/**
 * Route API : POST /api/stripe/verify-payment
 *
 * Cette route vérifie le statut d'un paiement Stripe et met à jour
 * la commande si le paiement est réussi.
 *
 * UTILISATION :
 * Appelée depuis la page de succès après un paiement Stripe
 * pour vérifier et mettre à jour le statut de la commande.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

// Initialisation du client Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

// Initialisation du client Resend pour l'envoi d'emails
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    console.log(`🔍 Vérification du paiement pour la session: ${sessionId}`);

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Vérifier si le paiement est réussi
    if (session.payment_status !== "paid") {
      console.log(`⚠️  Paiement non complété pour la session: ${sessionId}`);
      return NextResponse.json({
        status: session.payment_status,
        message: "Payment not completed",
      });
    }

    console.log(`✅ Paiement confirmé pour la session: ${sessionId}`);

    // Rechercher la commande
    let order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
    });

    // Si pas trouvé par stripeSessionId, essayer avec orderId des métadonnées
    if (!order && session.metadata?.orderId) {
      console.log(
        `🔍 Commande non trouvée par sessionId, recherche par orderId: ${session.metadata.orderId}`
      );
      order = await prisma.order.findUnique({
        where: { id: parseInt(session.metadata.orderId) },
      });

      // Si trouvé par orderId, mettre à jour le stripeSessionId
      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: { stripeSessionId: sessionId },
        });
        console.log(
          `✅ stripeSessionId mis à jour pour la commande ${order.id}`
        );
      }
    }

    if (!order) {
      console.log(`⚠️  Commande non trouvée pour la session: ${sessionId}`);
      return NextResponse.json({
        error: "Order not found",
      });
    }

    // Si la commande est déjà payée, ne rien faire
    if (order.status === "paid") {
      console.log(`ℹ️  Commande ${order.id} déjà payée`);
      return NextResponse.json({
        status: "paid",
        message: "Order already paid",
      });
    }

    // Mettre à jour le statut de la commande
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { status: "paid" },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    console.log(`✅ Commande ${order.id} mise à jour à "paid"`);

    // Envoyer l'email de confirmation
    if (process.env.RESEND_API_KEY) {
      try {
        const totalAmount = (updatedOrder.amountTotal / 100).toFixed(2);

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

        console.log(`✅ Email de confirmation envoyé à ${updatedOrder.email}`);
      } catch (emailError) {
        console.error("❌ Erreur lors de l'envoi de l'email:", emailError);
      }
    }

    return NextResponse.json({
      status: "paid",
      message: "Order updated successfully",
      orderId: updatedOrder.id,
    });
  } catch (error) {
    console.error("❌ Erreur lors de la vérification du paiement:", error);
    return NextResponse.json(
      {
        error: "Failed to verify payment",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    );
  }
}
