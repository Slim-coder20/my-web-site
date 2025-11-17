"use client";
import { useState } from "react";
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
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(imageUrl);

  // Vérifier si l'URL est une URL locale (commence par /)
  const isLocalImage = imageUrl.startsWith("/");

  // Gérer les erreurs de chargement d'image
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Utiliser une image placeholder si l'image externe échoue
      if (!isLocalImage) {
        setImageSrc("/images/placeholder.jpg");
      }
    }
  };

  return (
    <div className={styles.concertCard}>
      <div className={styles.concertCardImageContainer}>
        {imageError && !isLocalImage ? (
          <div className={styles.imagePlaceholder}>
            <span>Image non disponible</span>
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={300}
            height={200}
            className={styles.concertCardImage}
            onError={handleImageError}
            unoptimized={!isLocalImage} // Désactiver l'optimisation pour les images externes problématiques
          />
        )}
      </div>
      <div className={styles.concertCardInfo}>
        <h2 className={styles.concertCardTitle}>{title}</h2>
        <p className={styles.concertCardDate}>{date}</p>
        <p className={styles.concertCardLocation}>{location}</p>
      </div>
    </div>
  );
}
