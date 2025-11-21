/**
 * Script pour ajouter video-album.mp4 à la base de données
 *
 * Usage :
 * npx tsx scripts/add-video-album-to-db.ts
 */

// Charger les variables d'environnement
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Récupérer le Project ID Supabase depuis l'URL
const SUPABASE_PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(
  /https:\/\/([^.]+)\.supabase\.co/
)?.[1];

if (!SUPABASE_PROJECT_ID) {
  console.error(
    "❌ Erreur : NEXT_PUBLIC_SUPABASE_URL doit être défini dans .env.local"
  );
  process.exit(1);
}

const SUPABASE_STORAGE_BASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/videos`;

async function addVideoAlbum() {
  console.log("🔄 Ajout de video-album.mp4 à la base de données\n");

  try {
    // Vérifier d'abord si une vidéo avec cette URL existe
    const existingVideo = await prisma.video.findFirst({
      where: {
        OR: [
          { videoUrl: `${SUPABASE_STORAGE_BASE_URL}/video-album.mp4` },
          { videoUrl: "/videos/video-album.mp4" },
          { videoUrl: { contains: "video-album" } },
        ],
      },
    });

    let video;
    if (existingVideo) {
      console.log("⚠️  La vidéo existe déjà, mise à jour...");
      // Mettre à jour la vidéo existante
      video = await prisma.video.update({
        where: { id: existingVideo.id },
        data: {
          title: "Contrast - Nouvel Album",
          description: "Vidéo de présentation de l'album Contrast",
          videoUrl: `${SUPABASE_STORAGE_BASE_URL}/video-album.mp4`,
          videoType: "video/mp4",
        },
      });
      console.log("✅ Vidéo mise à jour");
    } else {
      // Réinitialiser la séquence PostgreSQL si nécessaire
      try {
        const maxIdResult = await prisma.$queryRaw<
          Array<{ max: bigint | null }>
        >`
          SELECT MAX(id) as max FROM "Video"
        `;
        const maxId = maxIdResult[0]?.max ? Number(maxIdResult[0].max) : 0;

        // Réinitialiser la séquence pour éviter les conflits d'ID
        await prisma.$executeRawUnsafe(
          `SELECT setval(pg_get_serial_sequence('"Video"', 'id'), ${
            maxId + 1
          }, false)`
        );
        console.log(`📊 Séquence réinitialisée (prochain ID: ${maxId + 1})`);
      } catch (seqError) {
        console.warn(
          "⚠️  Impossible de réinitialiser la séquence, continuation..."
        );
      }

      // Créer une nouvelle vidéo
      video = await prisma.video.create({
        data: {
          title: "Contrast - Nouvel Album",
          description: "Vidéo de présentation de l'album Contrast",
          videoUrl: `${SUPABASE_STORAGE_BASE_URL}/video-album.mp4`,
          videoType: "video/mp4",
          thumbnailUrl: null,
          duration: null,
        },
      });
      console.log("✅ Vidéo créée");
    }

    console.log("✅ Vidéo ajoutée avec succès !");
    console.log(`   ID: ${video.id}`);
    console.log(`   Titre: ${video.title}`);
    console.log(`   URL: ${video.videoUrl}`);
    console.log(
      "\n💡 Vous pouvez maintenant utiliser cette vidéo dans la page d'accueil"
    );
  } catch (error) {
    console.error(
      "❌ Erreur:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

addVideoAlbum();
