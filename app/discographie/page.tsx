import styles from "./music.module.css";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
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
                    <button className={styles.buyButton}>Acheter</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
