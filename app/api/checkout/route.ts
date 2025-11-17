import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, email } = body;

    if (!productId || !email) {
      return NextResponse.json(
        { error: "Product ID and email are required" },
        { status: 400 }
      );
    }

    // Récupérer le produit depuis la base de données
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Créer une Order en statut "pending" dans la base de données
    const order = await prisma.order.create({
      data: {
        email,
        amountTotal: product.priceCents,
        status: "pending",
        items: {
          create: {
            productId: product.id,
            quantity: 1,
            unitPrice: product.priceCents,
          },
        },
      },
    });

    // Créer une session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.title,
              description: product.description || undefined,
              images: product.coverUrl ? [product.coverUrl] : undefined,
            },
            unit_amount: product.priceCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/discographie?success=true`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/discographie?canceled=true`,
      customer_email: email,
      metadata: {
        orderId: order.id.toString(),
      },
    });

    // Mettre à jour l'Order avec le stripeSessionId
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
