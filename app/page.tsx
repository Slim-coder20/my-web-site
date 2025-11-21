import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

// Forcer le rendu dynamique (SSR) pour éviter les erreurs de connexion pendant le build
export const dynamic = "force-dynamic";

// Récupération de la vidéo d'arrière-plan depuis la base de données
async function getBackgroundVideo() {
  try {
    const video = await prisma.video.findFirst({
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

    return video;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de la vidéo d'arrière-plan:", error);
    return null;
  }
}

export default async function Home() {
  const backgroundVideo = await getBackgroundVideo();

  return (
    <HomeClient
      backgroundVideoUrl={backgroundVideo?.videoUrl || null}
      backgroundVideoType={backgroundVideo?.videoType || null}
    />
  );
}
