import styles from "./concerts.module.css";
import ConcertCard from "@/components/ConcertCard/ConcertCard";
import { prisma } from "@/lib/prisma";
import ConcertsHeader from "./ConcertsHeader";
import ConcertsEmptyState from "./ConcertsEmptyState";

// Forcer le rendu dynamique (SSR) pour éviter les erreurs de connexion MySQL pendant le build
export const dynamic = "force-dynamic";

// Récupération des concerts depuis la base de données
async function getConcerts() {
  try {
    console.log("🔍 Tentative de connexion à MySQL pour concerts...");
    console.log(
      "DATABASE_URL:",
      process.env.DATABASE_URL ? "✅ Définie" : "❌ Non définie"
    );

    const concerts = await prisma.concert.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        location: true,
        imageUrl: true,
        imageAlt: true,
      },
      orderBy: {
        date: "desc", // Tri par date décroissante (les plus récents en premier)
      },
    });

    console.log(`✅ ${concerts.length} concerts récupérés`);
    return concerts;
  } catch (error) {
    console.error("❌ Error fetching concerts:", error);
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }
    return [];
  }
}

// Fonction pour formater la date en français
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Page des concerts (Server Component)
export default async function Concerts() {
  const concerts = await getConcerts();

  return (
    <div className={styles.concertsContainer}>
      <section className={styles.concertsSection}>
        <ConcertsHeader />
        {concerts.length === 0 ? (
          <ConcertsEmptyState />
        ) : (
          <div className={styles.concertsGrid}>
            {concerts.map(
              (concert: {
                id: number;
                title: string;
                date: Date;
                location: string;
                imageUrl: string | null;
                imageAlt: string | null;
              }) => (
                <ConcertCard
                  key={concert.id}
                  title={concert.title}
                  date={formatDate(concert.date)}
                  location={concert.location}
                  imageUrl={concert.imageUrl || "/images/placeholder.jpg"}
                  imageAlt={concert.imageAlt || concert.title}
                />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}
