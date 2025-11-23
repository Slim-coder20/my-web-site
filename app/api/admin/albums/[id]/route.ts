import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Modifier un album
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { slug, title, description, priceCents, coverUrl } = body;

    // Validation
    if (!slug || !title || !priceCents) {
      return NextResponse.json(
        { error: "Slug, titre et prix sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si le slug existe déjà (sauf pour cet album)
    const existing = await prisma.product.findFirst({
      where: {
        slug,
        NOT: { id: parseInt(id) },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ce slug existe déjà" },
        { status: 400 }
      );
    }

    const album = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        slug,
        title,
        description: description || null,
        priceCents: parseInt(priceCents),
        coverUrl: coverUrl || null,
      },
    });

    return NextResponse.json(album);
  } catch (error) {
    console.error("Erreur PUT album:", error);
    return NextResponse.json(
      { error: "Erreur lors de la modification" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un album
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Vérifier s'il y a des commandes associées
    const orderItems = await prisma.orderItem.findMany({
      where: { productId: parseInt(id) },
    });

    if (orderItems.length > 0) {
      return NextResponse.json(
        { error: "Impossible de supprimer : des commandes sont associées" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE album:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}

