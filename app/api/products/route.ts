import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// récupération de tous les produits de la base de données // 
export async function GET() {
  // récupération de tous les produits de la base de données // 
  try {
   
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    // retourne la réponse JSON avec les produits // 
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    // retourne la réponse JSON avec l'erreur // 
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
