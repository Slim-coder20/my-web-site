/**
 * Script pour uploader les vidéos vers Supabase Storage
 * 
 * Prérequis :
 * 1. Créer un bucket "videos" dans Supabase Storage (public)
 * 2. Installer @supabase/supabase-js : npm install @supabase/supabase-js
 * 3. Configurer SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local
 * 
 * Usage :
 * npx tsx scripts/upload-videos-to-supabase.ts
 */

// Charger les variables d'environnement depuis .env.local
import { config } from "dotenv";
import { resolve } from "path";

// Charger .env.local en priorité, puis .env
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Erreur : SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis dans .env.local");
  console.error("   SUPABASE_URL:", SUPABASE_URL ? "✅" : "❌");
  console.error("   SUPABASE_SERVICE_ROLE_KEY:", SUPABASE_SERVICE_ROLE_KEY ? "✅" : "❌");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const VIDEOS_DIR = join(process.cwd(), "public", "videos");
const BUCKET_NAME = "videos";

interface UploadResult {
  fileName: string;
  success: boolean;
  url?: string;
  error?: string;
}

async function uploadVideo(fileName: string): Promise<UploadResult> {
  try {
    const filePath = join(VIDEOS_DIR, fileName);
    const fileBuffer = await readFile(filePath);
    const fileSizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(2);

    console.log(`\n📤 Upload de ${fileName} (${fileSizeMB} MB)...`);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: "video/mp4",
        upsert: true, // Remplacer si le fichier existe déjà
      });

    if (error) {
      console.error(`   ❌ Erreur: ${error.message}`);
      return { fileName, success: false, error: error.message };
    }

    // Obtenir l'URL publique
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

    console.log(`   ✅ Upload réussi: ${publicUrl}`);
    return { fileName, success: true, url: publicUrl };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`   ❌ Erreur: ${errorMessage}`);
    return { fileName, success: false, error: errorMessage };
  }
}

async function main() {
  console.log("🚀 Début de l'upload des vidéos vers Supabase Storage\n");
  console.log(`📁 Dossier: ${VIDEOS_DIR}`);
  console.log(`🪣 Bucket: ${BUCKET_NAME}\n`);

  // Vérifier que le bucket existe
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  if (bucketsError) {
    console.error("❌ Erreur lors de la vérification des buckets:", bucketsError.message);
    process.exit(1);
  }

  const videosBucket = buckets?.find((b) => b.name === BUCKET_NAME);
  if (!videosBucket) {
    console.error(`❌ Le bucket "${BUCKET_NAME}" n'existe pas dans Supabase Storage`);
    console.error("   Veuillez créer le bucket dans l'interface Supabase avant de continuer");
    process.exit(1);
  }

  if (!videosBucket.public) {
    console.warn(`⚠️  Le bucket "${BUCKET_NAME}" n'est pas public`);
    console.warn("   Les vidéos ne seront pas accessibles publiquement");
    console.warn("   Veuillez rendre le bucket public dans l'interface Supabase");
  }

  // Lister tous les fichiers MP4
  const files = await readdir(VIDEOS_DIR);
  const videoFiles = files.filter((file) => file.endsWith(".mp4"));

  if (videoFiles.length === 0) {
    console.error("❌ Aucun fichier vidéo trouvé dans public/videos/");
    process.exit(1);
  }

  console.log(`📹 ${videoFiles.length} vidéo(s) trouvée(s)\n`);

  // Uploader chaque vidéo
  const results: UploadResult[] = [];
  for (const fileName of videoFiles) {
    const result = await uploadVideo(fileName);
    results.push(result);
    // Attendre un peu entre chaque upload pour éviter de surcharger
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Résumé
  console.log("\n" + "=".repeat(60));
  console.log("📊 Résumé de l'upload");
  console.log("=".repeat(60));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`✅ Réussis: ${successful.length}/${results.length}`);
  console.log(`❌ Échecs: ${failed.length}/${results.length}\n`);

  if (successful.length > 0) {
    console.log("📋 URLs publiques des vidéos uploadées :\n");
    successful.forEach((result) => {
      console.log(`${result.fileName}:`);
      console.log(`  ${result.url}\n`);
    });
  }

  if (failed.length > 0) {
    console.log("❌ Vidéos qui ont échoué :\n");
    failed.forEach((result) => {
      console.log(`${result.fileName}: ${result.error}\n`);
    });
  }

  console.log("\n💡 Prochaine étape : Mettre à jour les URLs dans la base de données");
  console.log("   Exécutez : npx tsx scripts/update-video-urls-in-db.ts");
}

main().catch((error) => {
  console.error("❌ Erreur fatale:", error);
  process.exit(1);
});

