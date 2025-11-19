/**
 * Page : /checkout/[productId]
 * 
 * Cette page affiche le récapitulatif de la commande avant le paiement.
 * 
 * FONCTIONNALITÉS :
 * - Affiche les détails de l'album sélectionné (image, titre, description, prix)
 * - Affiche un formulaire pour saisir l'email du client
 * - Redirige vers Stripe Checkout après validation du formulaire
 * 
 * FLUX UTILISATEUR :
 * 1. L'utilisateur clique sur "Acheter" depuis la page discographie
 * 2. Redirection vers cette page avec l'ID du produit
 * 3. Affichage du récapitulatif et du formulaire
 * 4. Saisie de l'email et validation
 * 5. Redirection vers Stripe Checkout (géré par CheckoutForm)
 * 
 * NOTE : Cette page est un Server Component car elle récupère les données
 * du produit directement depuis la base de données via Prisma.
 */

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import Image from "next/image";
import styles from "./checkout.module.css";

/**
 * Fonction pour récupérer un produit depuis la base de données
 * 
 * @param productId - ID du produit à récupérer
 * @returns Le produit ou null si non trouvé
 */
async function getProduct(productId: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
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
 * 
 * @param priceCents - Prix en centimes (ex: 1500)
 * @returns Prix formaté en euros (ex: "15,00 €")
 */
function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceCents / 100);
}

/**
 * Composant de la page de checkout
 * 
 * IMPORTANT : Dans Next.js 15, les params sont des Promises
 * et doivent être await avant d'accéder à leurs propriétés.
 */
export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  // Récupération et parsing du productId depuis l'URL
  const { productId: productIdParam } = await params;
  const productId = parseInt(productIdParam);

  // Validation : si l'ID n'est pas un nombre valide, redirection vers discographie
  if (isNaN(productId)) {
    redirect("/discographie");
  }

  // Récupération du produit depuis la base de données
  const product = await getProduct(productId);

  // Si le produit n'existe pas, redirection vers discographie
  if (!product) {
    redirect("/discographie");
  }

  return (
    <div className={styles.checkoutContainer}>
      <section className={styles.checkoutSection}>
        <h1 className={styles.title}>Récapitulatif de votre commande</h1>

        <div className={styles.checkoutContent}>
          {/* Section récapitulatif : affiche les détails de l'album */}
          <div className={styles.productSummary}>
            <h2 className={styles.sectionTitle}>Album sélectionné</h2>
            <div className={styles.productCard}>
              {/* Affichage de la pochette de l'album */}
              {product.coverUrl ? (
                <Image
                  src={product.coverUrl}
                  alt={product.title}
                  width={200}
                  height={200}
                  className={styles.productImage}
                />
              ) : (
                <div className={styles.productPlaceholder}>
                  <span>Pas de pochette</span>
                </div>
              )}
              {/* Informations de l'album */}
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                {product.description && (
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                )}
                <div className={styles.productPrice}>
                  {formatPrice(product.priceCents)}
                </div>
              </div>
            </div>
          </div>

          {/* Section formulaire : saisie de l'email et validation */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Informations de commande</h2>
            {/* Composant CheckoutForm qui gère la logique de checkout */}
            <CheckoutForm productId={product.id} />
          </div>
        </div>
      </section>
    </div>
  );
}
