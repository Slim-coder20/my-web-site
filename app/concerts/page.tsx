import styles from "./concerts.module.css";
import ConcertCard from "@/components/ConcertCard/ConcertCard";
import { prisma } from "@/lib/prisma";

// Forcer le rendu dynamique (SSR) pour éviter les erreurs de connexion MySQL pendant le build
export const dynamic = "force-dynamic";

// Récupération des concerts depuis la base de données
async function getConcerts() {
  try {
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
    return concerts;
  } catch (error) {
    console.error("Error fetching concerts:", error);
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
        <h1 className={styles.concertsTitle}>Les concerts de Slim Abida</h1>
        <p className={styles.concertsDescription}>
          Tous les Concerts de Slim Abida
        </p>
        {concerts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Aucun concert disponible pour le moment.</p>
          </div>
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
