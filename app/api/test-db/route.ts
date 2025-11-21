import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("🔍 Test de connexion PostgreSQL...");
    console.log("DATABASE_URL présente:", !!process.env.DATABASE_URL);
    
    // Extraire le port de la connection string pour diagnostic
    const dbUrl = process.env.DATABASE_URL || "";
    let portInfo = "Non disponible";
    if (dbUrl) {
      const portMatch = dbUrl.match(/:(\d+)\//);
      if (portMatch) {
        portInfo = `Port ${portMatch[1]}`;
        console.log("Port utilisé dans DATABASE_URL:", portMatch[1]);
        if (portMatch[1] === "5432") {
          console.warn("⚠️ ATTENTION: Port 5432 détecté (Session pooler). Pour Vercel, utilisez le port 6543 (Transaction pooler)");
        }
      }
    }
    
    console.log(
      "DATABASE_URL (masquée):",
      dbUrl ? `${dbUrl.substring(0, 50)}...` : "NON DÉFINIE"
    );
    console.log("Info port:", portInfo);

    // Test de connexion
    await prisma.$connect();
    console.log("✅ Connexion établie");

    // Test de requête simple
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Requête SQL réussie:", result);

    // Test de requête sur une table
    const productCount = await prisma.product.count();
    console.log(`✅ Nombre de produits: ${productCount}`);

    // Extraire le port pour l'afficher dans la réponse (réutiliser dbUrl déjà défini)
    let portUsed = "unknown";
    if (dbUrl) {
      const portMatch = dbUrl.match(/:(\d+)\//);
      if (portMatch) {
        portUsed = portMatch[1];
      }
    }

    return Response.json({
      success: true,
      message: "Connexion PostgreSQL réussie",
      productCount,
      portUsed,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Erreur de connexion PostgreSQL:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Extraire le port pour le diagnostic (réutiliser dbUrl déjà défini)
    let portUsed = "unknown";
    if (dbUrl) {
      const portMatch = dbUrl.match(/:(\d+)\//);
      if (portMatch) {
        portUsed = portMatch[1];
      }
    }

    return Response.json(
      {
        success: false,
        error: errorMessage,
        stack: errorStack,
        databaseUrlPresent: !!process.env.DATABASE_URL,
        portUsed,
        recommendation: portUsed === "5432" 
          ? "Utilisez le port 6543 (Transaction pooler) pour Vercel. Allez dans Supabase → Database → Connection String → Transaction pooler"
          : "Vérifiez que DATABASE_URL est correctement configurée dans Vercel avec votre mot de passe Supabase",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
