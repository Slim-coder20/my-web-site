/**
 * Script de diagnostic pour vérifier la configuration Supabase Storage
 * 
 * Usage :
 * npx tsx scripts/verify-supabase-videos.ts
 */

// Charger les variables d'environnement
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("🔍 Diagnostic de la configuration Supabase Storage\n");
console.log("=".repeat(60));

// Vérifier les variables d'environnement
console.log("\n📋 Variables d'environnement :");
console.log(`   NEXT_PUBLIC_SUPABASE_URL: ${SUPABASE_URL ? "✅ Définie" : "❌ Manquante"}`);
if (SUPABASE_URL) {
  console.log(`   URL: ${SUPABASE_URL.substring(0, 50)}...`);
}
console.log(`   SUPABASE_SERVICE_ROLE_KEY: ${SUPABASE_SERVICE_ROLE_KEY ? "✅ Définie" : "❌ Manquante"}`);

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("\n❌ Variables d'environnement manquantes !");
  process.exit(1);
}

// Vérifier le bucket
console.log("\n🪣 Vérification du bucket Supabase :");
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function verifyBucket() {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error(`   ❌ Erreur: ${error.message}`);
      return;
    }

    const videosBucket = buckets?.find((b) => b.name === "videos");
    if (!videosBucket) {
      console.error("   ❌ Le bucket 'videos' n'existe pas !");
      return;
    }

    console.log(`   ✅ Bucket 'videos' trouvé`);
    console.log(`   Public: ${videosBucket.public ? "✅ Oui" : "❌ Non (doit être public !)"}`);

    // Lister les fichiers dans le bucket
    const { data: files, error: listError } = await supabase.storage
      .from("videos")
      .list();

    if (listError) {
      console.error(`   ❌ Erreur lors de la liste: ${listError.message}`);
      return;
    }

    console.log(`   ✅ ${files?.length || 0} fichier(s) dans le bucket`);
    if (files && files.length > 0) {
      console.log("\n   Fichiers trouvés :");
      files.slice(0, 5).forEach((file) => {
        console.log(`      - ${file.name} (${(file.metadata?.size || 0 / (1024 * 1024)).toFixed(2)} MB)`);
      });
      if (files.length > 5) {
        console.log(`      ... et ${files.length - 5} autre(s)`);
      }
    }
  } catch (error) {
    console.error(`   ❌ Erreur: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function verifyDatabaseUrls() {
  console.log("\n📊 Vérification des URLs dans la base de données :");
  try {
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        videoUrl: true,
      },
    });

    console.log(`   ✅ ${videos.length} vidéo(s) trouvée(s)\n`);

    let supabaseUrls = 0;
    let localUrls = 0;
    let errors = 0;

    for (const video of videos) {
      if (video.videoUrl.startsWith("https://") && video.videoUrl.includes("supabase.co")) {
        supabaseUrls++;
        console.log(`   ✅ ${video.title.substring(0, 40)}...`);
        console.log(`      URL Supabase: ${video.videoUrl.substring(0, 80)}...`);
      } else if (video.videoUrl.startsWith("/videos/") || video.videoUrl.startsWith("videos/")) {
        localUrls++;
        console.log(`   ⚠️  ${video.title.substring(0, 40)}...`);
        console.log(`      URL locale: ${video.videoUrl} (doit être migrée)`);
      } else {
        errors++;
        console.log(`   ❌ ${video.title.substring(0, 40)}...`);
        console.log(`      URL invalide: ${video.videoUrl}`);
      }
    }

    console.log("\n   Résumé :");
    console.log(`   ✅ URLs Supabase: ${supabaseUrls}`);
    console.log(`   ⚠️  URLs locales: ${localUrls} (à migrer)`);
    console.log(`   ❌ URLs invalides: ${errors}`);
  } catch (error) {
    console.error(`   ❌ Erreur: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function testVideoAccess() {
  console.log("\n🎥 Test d'accès aux vidéos :");
  try {
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        videoUrl: true,
      },
      take: 3, // Tester seulement les 3 premières
    });

    for (const video of videos) {
      if (video.videoUrl.startsWith("https://") && video.videoUrl.includes("supabase.co")) {
        console.log(`\n   Test: ${video.title.substring(0, 30)}...`);
        try {
          const response = await fetch(video.videoUrl, { method: "HEAD" });
          if (response.ok) {
            console.log(`   ✅ Accessible (Status: ${response.status})`);
            console.log(`   Content-Type: ${response.headers.get("content-type")}`);
            console.log(`   Content-Length: ${(parseInt(response.headers.get("content-length") || "0") / (1024 * 1024)).toFixed(2)} MB`);
          } else {
            console.log(`   ❌ Non accessible (Status: ${response.status})`);
          }
        } catch (error) {
          console.log(`   ❌ Erreur: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }
  } catch (error) {
    console.error(`   ❌ Erreur: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function main() {
  await verifyBucket();
  await verifyDatabaseUrls();
  await testVideoAccess();

  console.log("\n" + "=".repeat(60));
  console.log("✅ Diagnostic terminé");
  console.log("=".repeat(60));

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("❌ Erreur fatale:", error);
  process.exit(1);
});

