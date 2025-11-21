/**
 * Route API : POST /api/checkout
 * 
 * Cette route gère la création d'une session de paiement Stripe Checkout.
 * 
 * FLUX DE TRAVAIL :
 * 1. Reçoit productId et email depuis le formulaire de checkout
 * 2. Récupère le produit depuis la base de données MySQL via Prisma
 * 3. Crée une Order en statut "pending" dans la table Order
 * 4. Crée un OrderItem associé dans la table OrderItem
 * 5. Crée une session Stripe Checkout avec les détails du produit
 * 6. Met à jour l'Order avec le stripeSessionId pour pouvoir la retrouver plus tard
 * 7. Retourne l'URL de la session Stripe pour rediriger l'utilisateur
 * 
 * IMPORTANT : L'Order est créée AVANT le paiement pour pouvoir la tracker.
 * Le statut passera à "paid" via le webhook Stripe après paiement réussi.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// Initialisation du client Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(request: NextRequest) {
  try {
    // Vérifier les variables d'environnement nécessaires
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("❌ STRIPE_SECRET_KEY n'est pas définie");
      return NextResponse.json(
        { error: "Stripe configuration error" },
        { status: 500 }
      );
    }

    // Récupération des données du body (productId et email)
    const body = await request.json();
    const { productId, email } = body;

    console.log("🔍 Création checkout session:", { productId, email });

    // Validation des données requises
    if (!productId || !email) {
      return NextResponse.json(
        { error: "Product ID and email are required" },
        { status: 400 }
      );
    }

    // Récupération du produit depuis la base de données
    console.log("🔍 Récupération du produit ID:", productId);
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      console.error("❌ Produit non trouvé:", productId);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("✅ Produit trouvé:", product.title);

    /**
     * ÉTAPE 1 : Création de l'Order en base de données
     * 
     * On crée l'Order AVANT le paiement pour pouvoir la tracker.
     * Statut initial : "pending" (en attente de paiement)
     * Le statut sera mis à jour à "paid" par le webhook Stripe après paiement réussi.
     */
    console.log("🔍 Création de l'Order...");
    const order = await prisma.order.create({
      data: {
        email, // Email du client pour la confirmation
        amountTotal: product.priceCents, // Montant total en centimes
        status: "pending", // Statut initial : en attente de paiement
        items: {
          // Création simultanée de l'OrderItem associé
          create: {
            productId: product.id,
            quantity: 1, // Pour l'instant, on ne gère que les commandes d'un seul album
            unitPrice: product.priceCents, // Prix unitaire en centimes
          },
        },
      },
    });

    console.log("✅ Order créée:", order.id);

    /**
     * ÉTAPE 2 : Création de la session Stripe Checkout
     * 
     * Stripe Checkout est une page de paiement hébergée par Stripe.
     * On configure :
     * - Les items à payer (l'album avec son prix)
     * - Les URLs de redirection (succès/annulation)
     * - L'email du client
     * - Les métadonnées pour retrouver l'Order (orderId)
     */
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Paiement par carte bancaire uniquement
      line_items: [
        {
          price_data: {
            currency: "eur", // Devise : Euro
            product_data: {
              name: product.title, // Nom de l'album
              description: product.description || undefined, // Description optionnelle
              images: product.coverUrl ? [product.coverUrl] : undefined, // Image de la pochette
            },
            unit_amount: product.priceCents, // Prix en centimes (ex: 1500 = 15,00€)
          },
          quantity: 1, // Quantité : 1 album
        },
      ],
      mode: "payment", // Mode paiement unique (pas d'abonnement)
      success_url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/discographie?success=true&session_id={CHECKOUT_SESSION_ID}`, // URL de redirection après paiement réussi avec session_id
      cancel_url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/discographie?canceled=true`, // URL de redirection si annulation
      customer_email: email, // Email du client (pré-rempli dans le formulaire Stripe)
      metadata: {
        orderId: order.id.toString(), // ID de l'Order pour pouvoir la retrouver
      },
    });

    console.log("✅ Session Stripe créée:", session.id);

    /**
     * ÉTAPE 3 : Mise à jour de l'Order avec le stripeSessionId
     * 
     * On stocke le stripeSessionId dans l'Order pour pouvoir :
     * - Retrouver l'Order depuis le webhook Stripe
     * - Vérifier le statut du paiement si besoin
     */
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    // Retour de l'URL de la session Stripe pour rediriger l'utilisateur
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }
    return NextResponse.json(
      { 
        error: "Failed to create checkout session",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
