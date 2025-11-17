/**
 * Composant : BuyButton
 *
 * Ce composant affiche le bouton "Acheter" sur chaque carte d'album
 * dans la page discographie.
 *
 * FONCTIONNALITÉ :
 * - Au clic, redirige l'utilisateur vers la page de récapitulatif de commande
 * - La page de checkout gérera ensuite la saisie de l'email et le paiement
 *
 * NOTE : Ce composant est un Client Component ("use client") car il utilise
 * le hook useRouter de Next.js pour la navigation.
 */

"use client";

import { useRouter } from "next/navigation";
import styles from "./BuyButton.module.css";

interface BuyButtonProps {
  productId: number; // ID de l'album à acheter
  productTitle: string; // Titre de l'album (non utilisé pour l'instant mais peut servir pour l'accessibilité)
}

export default function BuyButton({ productId }: BuyButtonProps) {
  const router = useRouter();

  /**
   * Gestion du clic sur le bouton "Acheter"
   *
   * Redirige vers la page de checkout avec l'ID du produit.
   * Exemple : /checkout/1 pour l'album avec l'ID 1
   */
  const handleClick = () => {
    router.push(`/checkout/${productId}`);
  };

  return (
    <button className={styles.buyButton} onClick={handleClick}>
      Acheter
    </button>
  );
}
