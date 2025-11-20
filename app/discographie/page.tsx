import styles from "./music.module.css";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import BuyButton from "@/components/BuyButton/BuyButton";
import PaymentVerifier from "@/components/PaymentVerifier/PaymentVerifier";
import { Suspense } from "react";

// Forcer le rendu dynamique (SSR) pour éviter les erreurs de connexion MySQL pendant le build
export const dynamic = "force-dynamic";
// récupération de tous les produits de la base de données // 
async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        priceCents: true,
        coverUrl: true,
      },
      orderBy: {
        id: "desc", // Utilise id au lieu de createdAt pour éviter le problème de date
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
// Création de la fonction pour formater le prix en euros// 
function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceCents / 100);
}

export default async function Discographie() {
  const products = await getProducts();

  return (
    <div className={styles.discographieContainer}>
      <section className={styles.discographieSection}>
        <h1 className={styles.title}>Discographie</h1>
        <p className={styles.description}>
          Découvrez les albums de Slim Abida et soutenez l&apos;artiste en
          achetant ses œuvres.
        </p>
        {/* Vérification automatique du paiement après redirection depuis Stripe */}
        <Suspense fallback={null}>
          <PaymentVerifier />
        </Suspense>

        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Aucun album disponible pour le moment.</p>
          </div>
        ) : (
          <div className={styles.albumsGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.albumCard}>
                <div className={styles.albumCover}>
                  {product.coverUrl ? (
                    <Image
                      src={product.coverUrl}
                      alt={product.title}
                      width={400}
                      height={400}
                      className={styles.coverImage}
                      priority
                    />
                  ) : (
                    <div className={styles.coverPlaceholder}>
                      <span>Pas de pochette</span>
                    </div>
                  )}
                </div>
                <div className={styles.albumInfo}>
                  <h3 className={styles.albumTitle}>{product.title}</h3>
                  {product.description && (
                    <p className={styles.albumDescription}>
                      {product.description}
                    </p>
                  )}
                  <div className={styles.albumFooter}>
                    <span className={styles.albumPrice}>
                      {formatPrice(product.priceCents)}
                    </span>
                    <BuyButton productId={product.id} productTitle={product.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* Réseaux sociaux */}
      <div className={styles.socialLinks}>
        <h2 className={styles.socialTitle}>Suivez-moi</h2>
        <div className={styles.socialIcons}>
          <a
            href="https://www.instagram.com/slimabidaproject/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4 2.209 0 4 1.791 4 4 0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                fill="currentColor"
              />
            </svg>
            <span>Instagram</span>
          </a>

          <a
            href="https://www.facebook.com/slimabidaproject/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Facebook"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                fill="currentColor"
              />
            </svg>
            <span>Facebook</span>
          </a>

          <a
            href="https://www.youtube.com/@slimabida6045"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="YouTube"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                fill="currentColor"
              />
            </svg>
            <span>YouTube</span>
          </a>

          <a
            href="https://open.spotify.com/intl-fr/artist/5VGx7T3WkMIB5stG6jBi6h"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Spotify"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"
                fill="currentColor"
              />
            </svg>
            <span>Spotify</span>
          </a>
        </div>
      </div>
      
    </div>
  );
}
