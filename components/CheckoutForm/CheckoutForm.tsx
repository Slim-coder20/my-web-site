/**
 * Composant : CheckoutForm
 * 
 * Ce composant gère le formulaire de saisie de l'email et la création
 * de la session Stripe Checkout.
 * 
 * FLUX DE TRAVAIL :
 * 1. L'utilisateur saisit son email
 * 2. Validation de l'email (format basique)
 * 3. Appel à l'API /api/checkout avec productId et email
 * 4. L'API crée l'Order en base et la session Stripe
 * 5. Redirection automatique vers la page de paiement Stripe
 * 
 * NOTE : Ce composant est un Client Component car il gère :
 * - L'état du formulaire (useState)
 * - Les interactions utilisateur (onSubmit, onChange)
 * - La navigation (useRouter)
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CheckoutForm.module.css";

interface CheckoutFormProps {
  productId: number; // ID de l'album à commander
}

export default function CheckoutForm({ productId }: CheckoutFormProps) {
  // État du formulaire
  const [email, setEmail] = useState(""); // Email saisi par l'utilisateur
  const [loading, setLoading] = useState(false); // État de chargement pendant la requête
  const [error, setError] = useState<string | null>(null); // Message d'erreur éventuel
  const router = useRouter();

  /**
   * Gestion de la soumission du formulaire
   * 
   * Cette fonction est appelée quand l'utilisateur clique sur "Procéder au paiement"
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true); // Active l'état de chargement
    setError(null); // Réinitialise les erreurs

    // Validation basique de l'email (vérifie la présence d'un @)
    if (!email || !email.includes("@")) {
      setError("Veuillez entrer une adresse email valide");
      setLoading(false);
      return;
    }

    try {
      /**
       * APPEL À L'API /api/checkout
       * 
       * Cette API va :
       * - Récupérer le produit depuis la base de données
       * - Créer une Order en statut "pending"
       * - Créer un OrderItem associé
       * - Créer une session Stripe Checkout
       * - Retourner l'URL de la session Stripe
       */
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          email,
        }),
      });

      const data = await response.json();

      // Vérification de la réponse de l'API
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création de la commande");
      }

      /**
       * REDIRECTION VERS STRIPE CHECKOUT
       * 
       * Si tout s'est bien passé, on redirige l'utilisateur vers
       * la page de paiement Stripe hébergée par Stripe.
       * Après le paiement, Stripe redirigera vers success_url ou cancel_url
       * configurées dans l'API checkout.
       */
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout non disponible");
      }
    } catch (err) {
      // Gestion des erreurs : affichage du message d'erreur à l'utilisateur
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setLoading(false); // Désactive l'état de chargement pour permettre une nouvelle tentative
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      {/* Champ de saisie de l'email */}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Adresse email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état à chaque saisie
          className={styles.input}
          placeholder="votre.email@exemple.com"
          required
          disabled={loading} // Désactivé pendant le chargement
        />
        <p className={styles.helpText}>
          Vous recevrez la confirmation de commande à cette adresse
        </p>
      </div>

      {/* Affichage des erreurs si présentes */}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* Boutons d'action */}
      <div className={styles.formActions}>
        {/* Bouton Retour : retourne à la page précédente */}
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.cancelButton}
          disabled={loading}
        >
          Retour
        </button>
        {/* Bouton de soumission : lance le processus de checkout */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading || !email} // Désactivé si chargement en cours ou email vide
        >
          {loading ? "Traitement..." : "Procéder au paiement"}
        </button>
      </div>
    </form>
  );
}
