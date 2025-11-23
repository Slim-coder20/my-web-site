import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Récupérer tous les albums
export async function GET() {
  try {
    const albums = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(albums);
  } catch (error) {
    console.error("Erreur GET albums:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouvel album
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, description, priceCents, coverUrl } = body;

    // Validation
    if (!slug || !title || !priceCents) {
      return NextResponse.json(
        { error: "Slug, titre et prix sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si le slug existe déjà
    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ce slug existe déjà" },
        { status: 400 }
      );
    }

    const album = await prisma.product.create({
      data: {
        slug,
        title,
        description: description || null,
        priceCents: parseInt(priceCents),
        coverUrl: coverUrl || null,
      },
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error("Erreur POST album:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}
