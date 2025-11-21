import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("🔍 Test de connexion MySQL...");
    console.log("DATABASE_URL présente:", !!process.env.DATABASE_URL);
    console.log(
      "DATABASE_URL (masquée):",
      process.env.DATABASE_URL
        ? `${process.env.DATABASE_URL.substring(0, 20)}...`
        : "NON DÉFINIE"
    );

    // Test de connexion
    await prisma.$connect();
    console.log("✅ Connexion établie");

    // Test de requête simple
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Requête SQL réussie:", result);

    // Test de requête sur une table
    const productCount = await prisma.product.count();
    console.log(`✅ Nombre de produits: ${productCount}`);

    return Response.json({
      success: true,
      message: "Connexion MySQL réussie",
      productCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Erreur de connexion MySQL:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    return Response.json(
      {
        success: false,
        error: errorMessage,
        stack: errorStack,
        databaseUrlPresent: !!process.env.DATABASE_URL,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
