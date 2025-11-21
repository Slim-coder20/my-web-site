/**
 * Script de migration des données depuis MySQL (o2switch) vers PostgreSQL (Supabase)
 *
 * Usage:
 * 1. Configurez DATABASE_URL (PostgreSQL Supabase) dans .env.local
 * 2. Exécutez: npx tsx scripts/migrate-data-to-supabase.ts
 */

import mysql from "mysql2/promise";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Configuration MySQL (o2switch)
const mysqlConfig = {
  host: "amorpha.o2switch.net",
  port: 3306,
  user: "absl3386_absl3386",
  password: "F5f4-BS5w-n7C?",
  database: "absl3386_my_web_site",
};

// Fonction pour convertir les dates MySQL invalides en null
function parseDate(dateValue: unknown): Date | null {
  if (!dateValue) return null;
  if (dateValue === "0000-00-00" || dateValue === "0000-00-00 00:00:00")
    return null;
  const date = new Date(dateValue as string);
  return isNaN(date.getTime()) ? null : date;
}

// Fonction helper pour convertir unknown en string
function toString(value: unknown): string {
  return value ? String(value) : "";
}

// Fonction helper pour convertir unknown en number
function toNumber(value: unknown): number {
  return value ? Number(value) : 0;
}

async function migrateProducts(mysqlConn: mysql.Connection) {
  console.log("\n📦 Migration de la table: Product");

  try {
    const [rows] = await mysqlConn.execute("SELECT * FROM Product");
    const data = rows as Array<Record<string, unknown>>;

    if (data.length === 0) {
      console.log("   ⚠️  Aucune donnée à migrer pour Product");
      return;
    }

    console.log(`   ✅ ${data.length} enregistrements trouvés`);

    for (const row of data) {
      try {
        await prisma.product.create({
          data: {
            id: toNumber(row.id),
            slug: toString(row.slug),
            title: toString(row.title),
            description: row.description ? toString(row.description) : null,
            priceCents: toNumber(row.priceCents),
            coverUrl: row.coverUrl ? toString(row.coverUrl) : null,
            createdAt: parseDate(row.createdAt) || new Date(),
            updatedAt: parseDate(row.updatedAt) || new Date(),
          },
        });
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "P2002"
        ) {
          console.log(`   ⚠️  Product ${row.id} déjà existant, ignoré`);
        } else {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error(`   ❌ Erreur Product ${row.id}:`, errorMessage);
        }
      }
    }

    console.log("   ✅ Migration de Product terminée");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      "   ❌ Erreur lors de la migration de Product:",
      errorMessage
    );
  }
}

async function migrateConcerts(mysqlConn: mysql.Connection) {
  console.log("\n📦 Migration de la table: Concert");

  try {
    const [rows] = await mysqlConn.execute("SELECT * FROM Concert");
    const data = rows as Array<Record<string, unknown>>;

    if (data.length === 0) {
      console.log("   ⚠️  Aucune donnée à migrer pour Concert");
      return;
    }

    console.log(`   ✅ ${data.length} enregistrements trouvés`);

    for (const row of data) {
      try {
        await prisma.concert.create({
          data: {
            id: toNumber(row.id),
            title: toString(row.title),
            date: parseDate(row.date) || new Date(),
            location: toString(row.location),
            imageUrl: row.imageUrl ? toString(row.imageUrl) : null,
            imageAlt: row.imageAlt ? toString(row.imageAlt) : null,
            description: row.description ? toString(row.description) : null,
            venue: row.venue ? toString(row.venue) : null,
            ticketUrl: row.ticketUrl ? toString(row.ticketUrl) : null,
            createdAt: parseDate(row.createdAt) || new Date(),
            updatedAt: parseDate(row.updatedAt) || new Date(),
          },
        });
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "P2002"
        ) {
          console.log(`   ⚠️  Concert ${row.id} déjà existant, ignoré`);
        } else {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error(`   ❌ Erreur Concert ${row.id}:`, errorMessage);
        }
      }
    }

    console.log("   ✅ Migration de Concert terminée");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      "   ❌ Erreur lors de la migration de Concert:",
      errorMessage
    );
  }
}

async function migrateVideos(mysqlConn: mysql.Connection) {
  console.log("\n📦 Migration de la table: Video");

  try {
    const [rows] = await mysqlConn.execute("SELECT * FROM Video");
    const data = rows as Array<Record<string, unknown>>;

    if (data.length === 0) {
      console.log("   ⚠️  Aucune donnée à migrer pour Video");
      return;
    }

    console.log(`   ✅ ${data.length} enregistrements trouvés`);

    for (const row of data) {
      try {
        await prisma.video.create({
          data: {
            id: toNumber(row.id),
            title: toString(row.title),
            description: row.description ? toString(row.description) : null,
            videoUrl: toString(row.videoUrl),
            videoType: toString(row.videoType),
            thumbnailUrl: row.thumbnailUrl ? toString(row.thumbnailUrl) : null,
            duration: row.duration ? toNumber(row.duration) : null,
            createdAt: parseDate(row.createdAt) || new Date(),
            updatedAt: parseDate(row.updatedAt) || undefined,
          },
        });
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "P2002"
        ) {
          console.log(`   ⚠️  Video ${row.id} déjà existant, ignoré`);
        } else {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error(`   ❌ Erreur Video ${row.id}:`, errorMessage);
        }
      }
    }

    console.log("   ✅ Migration de Video terminée");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("   ❌ Erreur lors de la migration de Video:", errorMessage);
  }
}

async function migrateOrders(mysqlConn: mysql.Connection) {
  console.log("\n📦 Migration de la table: Order");

  try {
    const [rows] = await mysqlConn.execute("SELECT * FROM `Order`");
    const data = rows as Array<Record<string, unknown>>;

    if (data.length === 0) {
      console.log("   ⚠️  Aucune donnée à migrer pour Order");
      return;
    }

    console.log(`   ✅ ${data.length} enregistrements trouvés`);

    for (const row of data) {
      try {
        const createdAtValue = parseDate(row.createdAt);
        const updatedAtValue = parseDate(row.updatedAt);

        await prisma.order.create({
          data: {
            id: toNumber(row.id),
            email: toString(row.email),
            stripeSessionId: row.stripeSessionId
              ? toString(row.stripeSessionId)
              : null,
            amountTotal: toNumber(row.amountTotal),
            status: toString(row.status),
            createdAt: createdAtValue ?? new Date(),
            updatedAt: updatedAtValue ?? new Date(),
          },
        });
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "P2002"
        ) {
          console.log(`   ⚠️  Order ${row.id} déjà existant, ignoré`);
        } else {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error(`   ❌ Erreur Order ${row.id}:`, errorMessage);
        }
      }
    }

    console.log("   ✅ Migration de Order terminée");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("   ❌ Erreur lors de la migration de Order:", errorMessage);
  }
}

async function migrateOrderItems(mysqlConn: mysql.Connection) {
  console.log("\n📦 Migration de la table: OrderItem");

  try {
    const [rows] = await mysqlConn.execute("SELECT * FROM OrderItem");
    const data = rows as Array<Record<string, unknown>>;

    if (data.length === 0) {
      console.log("   ⚠️  Aucune donnée à migrer pour OrderItem");
      return;
    }

    console.log(`   ✅ ${data.length} enregistrements trouvés`);

    for (const row of data) {
      try {
        await prisma.orderItem.create({
          data: {
            id: toNumber(row.id),
            orderId: toNumber(row.orderId),
            productId: toNumber(row.productId),
            quantity: row.quantity ? toNumber(row.quantity) : 1,
            unitPrice: toNumber(row.unitPrice),
          },
        });
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "P2002"
        ) {
          console.log(`   ⚠️  OrderItem ${row.id} déjà existant, ignoré`);
        } else {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error(`   ❌ Erreur OrderItem ${row.id}:`, errorMessage);
        }
      }
    }

    console.log("   ✅ Migration de OrderItem terminée");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      "   ❌ Erreur lors de la migration de OrderItem:",
      errorMessage
    );
  }
}

async function main() {
  console.log("🚀 Début de la migration des données MySQL → PostgreSQL\n");

  let mysqlConn: mysql.Connection | null = null;

  try {
    // Connexion à MySQL
    console.log("📡 Connexion à MySQL (o2switch)...");
    mysqlConn = await mysql.createConnection(mysqlConfig);
    console.log("✅ Connecté à MySQL\n");

    // Migrer les tables dans l'ordre (pour respecter les foreign keys)
    await migrateProducts(mysqlConn);
    await migrateConcerts(mysqlConn);
    await migrateVideos(mysqlConn);
    await migrateOrders(mysqlConn);
    await migrateOrderItems(mysqlConn);

    console.log("\n✅ Migration terminée avec succès !");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("\n❌ Erreur lors de la migration:", errorMessage);
    process.exit(1);
  } finally {
    // Fermer les connexions
    if (mysqlConn) {
      await mysqlConn.end();
    }
    await prisma.$disconnect();
  }
}

main();
