import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupération de toutes les vidéos de la base de données
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        videoUrl: true,
        videoType: true,
        thumbnailUrl: true,
        createdAt: true,
        // On exclut updatedAt car il peut contenir des dates invalides (0000-00-00)
      },
      orderBy: {
        id: "desc", // Tri par id au lieu de createdAt pour éviter les problèmes de dates
      },
    });
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des vidéos" },
      { status: 500 }
    );
  }
}
