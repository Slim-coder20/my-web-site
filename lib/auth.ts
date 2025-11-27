// ============================================
// Helper pour récupérer la session côté serveur
// ============================================
// Ce fichier permet de récupérer la session dans les API routes
// en utilisant la même configuration NextAuth que dans route.ts

import { auth } from "@/app/api/auth/[...nextauth]/route";

// Fonction helper pour récupérer la session
// Utilisez cette fonction dans vos API routes pour vérifier l'authentification
export async function getServerSession() {
  return await auth();
}

