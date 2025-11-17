import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import Image from "next/image";
import styles from "./checkout.module.css";

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

function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceCents / 100);
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId: productIdParam } = await params;
  const productId = parseInt(productIdParam);

  if (isNaN(productId)) {
    redirect("/discographie");
  }

  const product = await getProduct(productId);

  if (!product) {
    redirect("/discographie");
  }

  return (
    <div className={styles.checkoutContainer}>
      <section className={styles.checkoutSection}>
        <h1 className={styles.title}>Récapitulatif de votre commande</h1>

        <div className={styles.checkoutContent}>
          {/* Récapitulatif produit */}
          <div className={styles.productSummary}>
            <h2 className={styles.sectionTitle}>Album sélectionné</h2>
            <div className={styles.productCard}>
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

          {/* Formulaire de commande */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Informations de commande</h2>
            <CheckoutForm productId={product.id} />
          </div>
        </div>
      </section>
    </div>
  );
}

