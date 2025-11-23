import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

// Forcer le rendu dynamique (SSR) pour éviter les erreurs de connexion pendant le build
export const dynamic = "force-dynamic";

// Récupération de la vidéo d'arrière-plan depuis la base de données
async function getBackgroundVideo() {
  try {
    console.log("🔍 Recherche de la vidéo d'arrière-plan (video-album)...");
    
    // Recherche par URL contenant "video-album"
    let video = await prisma.video.findFirst({
      where: {
        videoUrl: {
          contains: "video-album",
        },
      },
      select: {
        videoUrl: true,
        videoType: true,
      },
    });

    // Si pas trouvée par URL, chercher par titre "Vidéo d'arrière-plan" ou "arrière-plan"
    if (!video) {
      console.log("🔍 Recherche alternative par titre...");
      video = await prisma.video.findFirst({
        where: {
          OR: [
            { title: { contains: "arrière-plan" } },
            { title: { contains: "Arrière-plan" } },
            { title: { contains: "background" } },
            { title: { contains: "Background" } },
          ],
        },
        select: {
          videoUrl: true,
          videoType: true,
        },
      });
    }

    if (video) {
      console.log("✅ Vidéo d'arrière-plan trouvée:", {
        videoUrl: video.videoUrl,
        videoType: video.videoType,
      });
    } else {
      console.warn("⚠️ Aucune vidéo d'arrière-plan trouvée");
      
      // Vérifier toutes les vidéos disponibles pour debug
      const allVideos = await prisma.video.findMany({
        select: {
          id: true,
          title: true,
          videoUrl: true,
        },
        take: 10,
      });
      console.log("📹 Vidéos disponibles dans la base:", allVideos);
    }

    return video;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de la vidéo d'arrière-plan:", error);
    if (error instanceof Error) {
      console.error("Message d'erreur:", error.message);
      console.error("Stack:", error.stack);
    }
    return null;
  }
}

/**
 * Normalise l'URL de la vidéo pour utiliser une URL relative si elle pointe vers le même domaine
 * 
 * @param url - URL de la vidéo (peut être absolue ou relative)
 * @returns URL normalisée (relative si possible)
 */
function normalizeVideoUrl(url: string | null): string | null {
  if (!url) return null;
  
  // Si c'est une URL absolue pointant vers slimabida.fr, convertir en relative
  if (url.startsWith("https://slimabida.fr/") || url.startsWith("http://slimabida.fr/")) {
    return url.replace(/^https?:\/\/slimabida\.fr/, "");
  }
  
  // Si c'est déjà une URL relative, la retourner telle quelle
  if (url.startsWith("/")) {
    return url;
  }
  
  // Si c'est une autre URL absolue (ex: YouTube), la retourner telle quelle
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  
  // Sinon, ajouter un / au début pour en faire une URL relative
  return `/${url}`;
}

export default async function Home() {
  const backgroundVideo = await getBackgroundVideo();
  
  // Normaliser l'URL de la vidéo
  const normalizedUrl = normalizeVideoUrl(backgroundVideo?.videoUrl || null);

  return (
    <HomeClient
      backgroundVideoUrl={normalizedUrl}
      backgroundVideoType={backgroundVideo?.videoType || null}
    />
  );
}
