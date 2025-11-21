/**
 * Script pour mettre à jour les URLs des vidéos dans la base de données
 * 
 * Ce script met à jour les URLs dans la table Video pour pointer vers Supabase Storage
 * au lieu de /videos/...
 * 
 * Prérequis :
 * 1. Avoir uploadé les vidéos vers Supabase Storage
 * 2. Avoir DATABASE_URL configurée dans .env.local
 * 
 * Usage :
 * npx tsx scripts/update-video-urls-in-db.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mapping des noms de fichiers vers les nouvelles URLs Supabase
// Remplacez [PROJECT_ID] par votre ID de projet Supabase
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

// Mapping des anciennes URLs vers les nouvelles URLs Supabase
const URL_MAPPING: Record<string, string> = {
  "/videos/butterfly-video.mp4": `${SUPABASE_STORAGE_BASE_URL}/butterfly-video.mp4`,
  "/videos/father-solo-bass.mp4": `${SUPABASE_STORAGE_BASE_URL}/father-solo-bass.mp4`,
  "/videos/contrast-live-session.mp4": `${SUPABASE_STORAGE_BASE_URL}/contrast-live-session.mp4`,
  "/videos/road-live-session.mp4": `${SUPABASE_STORAGE_BASE_URL}/road-live-session.mp4`,
  "/videos/InMediaRes-live-hammamet.mp4": `${SUPABASE_STORAGE_BASE_URL}/InMediaRes-live-hammamet.mp4`,
  "/videos/medina-live-session-jazzoil.mp4": `${SUPABASE_STORAGE_BASE_URL}/medina-live-session-jazzoil.mp4`,
  "/videos/vers-ou-jazzoil.mp4": `${SUPABASE_STORAGE_BASE_URL}/vers-ou-jazzoil.mp4`,
  "/videos/enheb-entir-arrangement.mp4": `${SUPABASE_STORAGE_BASE_URL}/enheb-entir-arrangement.mp4`,
  "/videos/yadayki-live-sesion.mp4": `${SUPABASE_STORAGE_BASE_URL}/yadayki-live-sesion.mp4`,
  "/videos/video-album.mp4": `${SUPABASE_STORAGE_BASE_URL}/video-album.mp4`,
  // Gérer aussi les URLs sans le / au début
  "videos/vers-ou-jazzoil.mp4": `${SUPABASE_STORAGE_BASE_URL}/vers-ou-jazzoil.mp4`,
};

async function updateVideoUrls() {
  console.log("🔄 Mise à jour des URLs des vidéos dans la base de données\n");

  try {
    // Récupérer toutes les vidéos
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        videoUrl: true,
      },
    });

    console.log(`📹 ${videos.length} vidéo(s) trouvée(s) dans la base de données\n`);

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const video of videos) {
      const oldUrl = video.videoUrl;
      const newUrl = URL_MAPPING[oldUrl];

      if (!newUrl) {
        // Vérifier si l'URL commence déjà par https:// (déjà migrée)
        if (oldUrl.startsWith("https://")) {
          console.log(`⏭️  ${video.title} (ID: ${video.id}) - Déjà migrée`);
          skipped++;
          continue;
        }

        // Extraire le nom du fichier et construire l'URL Supabase
        const fileName = oldUrl.replace(/^\/?videos\//, "");
        const constructedUrl = `${SUPABASE_STORAGE_BASE_URL}/${fileName}`;

        console.log(`🔄 ${video.title} (ID: ${video.id})`);
        console.log(`   Ancienne URL: ${oldUrl}`);
        console.log(`   Nouvelle URL: ${constructedUrl}`);

        try {
          await prisma.video.update({
            where: { id: video.id },
            data: { videoUrl: constructedUrl },
          });
          console.log(`   ✅ Mise à jour réussie\n`);
          updated++;
        } catch (error) {
          console.error(`   ❌ Erreur: ${error instanceof Error ? error.message : String(error)}\n`);
          errors++;
        }
      } else {
        console.log(`🔄 ${video.title} (ID: ${video.id})`);
        console.log(`   Ancienne URL: ${oldUrl}`);
        console.log(`   Nouvelle URL: ${newUrl}`);

        try {
          await prisma.video.update({
            where: { id: video.id },
            data: { videoUrl: newUrl },
          });
          console.log(`   ✅ Mise à jour réussie\n`);
          updated++;
        } catch (error) {
          console.error(`   ❌ Erreur: ${error instanceof Error ? error.message : String(error)}\n`);
          errors++;
        }
      }
    }

    // Résumé
    console.log("=".repeat(60));
    console.log("📊 Résumé de la mise à jour");
    console.log("=".repeat(60));
    console.log(`✅ Mises à jour: ${updated}`);
    console.log(`⏭️  Ignorées: ${skipped}`);
    console.log(`❌ Erreurs: ${errors}`);
    console.log("\n✅ Migration terminée !");
  } catch (error) {
    console.error("❌ Erreur fatale:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateVideoUrls();

