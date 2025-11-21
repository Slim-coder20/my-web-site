import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configuration Prisma optimisée pour Supabase pooler (Vercel/serverless)
// Singleton pattern pour éviter les problèmes de connexion multiples
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// Toujours réutiliser la même instance pour éviter les problèmes de connexion
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

