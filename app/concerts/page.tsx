import styles from "./concerts.module.css";
import ConcertCard from "@/components/ConcertCard/ConcertCard";

// Données des concerts
const concerts = [
  {
    id: 1,
    title: "Asymétrie Alexandrie 2025 Egypt Tour",
    date: "25 avril 2025",
    location: "Alexandrie, Egypte",
    imageUrl: "/images/lives/concert-slim-egypt.jpg",
    imageAlt: "Concert Asymétrie Alexandrie",
  },
  {
    id: 2,
    title: "Asymétrie Caire 2025 Egypt Tour",
    date: "27 avril 2025",
    location: "Caire, Egypte",
    imageUrl: "/images/lives/concert-slim-egypt2.jpeg",
    imageAlt: "Concert Asymétrie Caire",
  },
  {
    id: 3,
    title: "Asymétrie les Zinzins Tunis",
    date: "24 octobre 2025",
    location: "Tunis, Tunisie",
    imageUrl: "/images/lives/concert-slim-live4.jpg",
    imageAlt: "Concert Asymétrie Tunis",
  },
  {
    id: 4,
    title: "Asymétrie Gérard Philpe live à Bonneuil sur Marne",
    date: "5 octobre 2024",
    location: "Bonneuil sur Marne, France",
    imageUrl: "/images/lives/concert-slim-live3.jpg",
    imageAlt: "Concert Gérard Philpe",
  },
  {
    id: 5,
    title: "Asymétrie Live au son de la terre",
    date: "4 avril 2024",
    location: "Paris, France",
    imageUrl: "/images/lives/concert-slim-live5.jpg",
    imageAlt: "Concert Asymétrie Live au son de la terre",
  },
];

export default function Concerts() {
  return (
    <div className={styles.concertsContainer}>
      <section className={styles.concertsSection}>
        <h1 className={styles.concertsTitle}>Les concerts de Slim Abida</h1>
        <p className={styles.concertsDescription}>
          Tous les Concerts de Slim Abida
        </p>
        <div className={styles.concertsGrid}>
          {concerts.map((concert) => (
            <ConcertCard
              key={concert.id}
              title={concert.title}
              date={concert.date}
              location={concert.location}
              imageUrl={concert.imageUrl}
              imageAlt={concert.imageAlt}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
