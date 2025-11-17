"use client";
import styles from "./ConcertCard.module.css";
import Image from "next/image";

interface ConcertCardProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
}

export default function ConcertCard({
  title,
  date,
  location,
  imageUrl,
  imageAlt,
}: ConcertCardProps) {
  return (
    <div className={styles.concertCard}>
      <div className={styles.concertCardImageContainer}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={300}
          height={200}
          className={styles.concertCardImage}
        />
      </div>
      <div className={styles.concertCardInfo}>
        <h2 className={styles.concertCardTitle}>{title}</h2>
        <p className={styles.concertCardDate}>{date}</p>
        <p className={styles.concertCardLocation}>{location}</p>
      </div>
    </div>
  );
}
