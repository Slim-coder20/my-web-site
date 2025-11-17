"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CheckoutForm.module.css";

interface CheckoutFormProps {
  productId: number;
}

export default function CheckoutForm({ productId }: CheckoutFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation email
    if (!email || !email.includes("@")) {
      setError("Veuillez entrer une adresse email valide");
      setLoading(false);
      return;
    }

    try {
      // Appeler l'API checkout
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

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création de la commande");
      }

      // Rediriger vers Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout non disponible");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Adresse email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="votre.email@exemple.com"
          required
          disabled={loading}
        />
        <p className={styles.helpText}>
          Vous recevrez la confirmation de commande à cette adresse
        </p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.formActions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.cancelButton}
          disabled={loading}
        >
          Retour
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading || !email}
        >
          {loading ? "Traitement..." : "Procéder au paiement"}
        </button>
      </div>
    </form>
  );
}

