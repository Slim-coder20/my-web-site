/**
 * Route de débogage pour vérifier la vidéo d'arrière-plan
 *
 * GET /api/debug/background-video
 *
 * Cette route permet de vérifier si la vidéo d'arrière-plan existe dans la base de données
 * et de voir son URL et son type.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Recherche de la vidéo d'arrière-plan
    const video = await prisma.video.findFirst({
      where: {
        videoUrl: {
          contains: "video-album",
        },
      },
      select: {
        id: true,
        title: true,
        videoUrl: true,
        videoType: true,
        thumbnailUrl: true,
      },
    });

    // Récupérer toutes les vidéos pour debug
    const allVideos = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        videoUrl: true,
        videoType: true,
      },
      take: 10,
    });

    return NextResponse.json({
      backgroundVideo: video,
      allVideos: allVideos,
      totalVideos: allVideos.length,
      message: video
        ? "Vidéo d'arrière-plan trouvée"
        : "Aucune vidéo d'arrière-plan trouvée avec 'video-album' dans l'URL",
    });
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la récupération",
        message: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
