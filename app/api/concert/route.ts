import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupération de tous les concerts de la base de données
export async function GET() {
  try {
    const concerts = await prisma.concert.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        location: true,
        imageUrl: true,
        imageAlt: true,
        description: true,
        venue: true,
        ticketUrl: true,
        createdAt: true,
        // On exclut updatedAt car il peut contenir des dates invalides (0000-00-00)
      },
      orderBy: {
        date: "desc", // Tri par date décroissante (les plus récents en premier)
      },
    });
    // Retourne la réponse JSON avec les concerts
    return NextResponse.json(concerts, { status: 200 });
  } catch (error) {
    console.error("Error fetching concerts:", error);
    // Retourne la réponse JSON avec l'erreur
    return NextResponse.json(
      { error: "Failed to fetch concerts" },
      { status: 500 }
    );
  }
}
