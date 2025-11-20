import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import BuyButton from "@/components/BuyButton/BuyButton";
import styles from "../music.module.css";

/**
 * Fonction pour récupérer un produit par son slug
 */
async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        priceCents: true,
        coverUrl: true,
      },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/**
 * Fonction pour formater le prix en euros
 */
function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceCents / 100);
}

/**
 * Page de détail d'un album
 */
export default async function AlbumDetail({
  params,
}: {
  params: { albumId: string };
}) {
  // Récupération du albumId depuis les params
  const albumId = params.albumId;

  // Récupération du produit par slug
  const product = await getProductBySlug(albumId);

  // Si le produit n'existe pas, redirection vers discographie
  if (!product) {
    redirect("/discographie");
  }

  return (
    <div className={styles.discographieContainer}>
      <section className={styles.discographieSection}>
        <div className={styles.albumDetailContainer}>
          <div className={styles.albumCover}>
            {product.coverUrl ? (
              <Image
                src={product.coverUrl}
                alt={product.title}
                width={600}
                height={600}
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
            <h1 className={styles.albumTitle}>{product.title}</h1>
            {product.description && (
              <p className={styles.albumDescription}>{product.description}</p>
            )}
            <div className={styles.albumFooter}>
              <span className={styles.albumPrice}>
                {formatPrice(product.priceCents)}
              </span>
              <BuyButton productId={product.id} productTitle={product.title} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
