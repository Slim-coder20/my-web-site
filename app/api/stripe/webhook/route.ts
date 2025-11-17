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

// Initialisation du client Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

// Secret du webhook (récupéré depuis le Dashboard Stripe)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  // Récupération du body brut (important pour la vérification de signature)
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
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
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
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
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      /**
       * MISE À JOUR DU STATUT DE L'ORDER
       * 
       * On retrouve l'Order via le stripeSessionId (qui a été stocké lors de la création)
       * et on met à jour son statut de "pending" à "paid".
       */
      await prisma.order.update({
        where: { stripeSessionId: session.id },
        data: { status: "paid" },
      });

      console.log(`Order updated to paid for session: ${session.id}`);
    } catch (error) {
      console.error("Error updating order:", error);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      );
    }
  }

  // Retour d'une confirmation à Stripe
  return NextResponse.json({ received: true });
}
