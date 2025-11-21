/**
 * Composant : PaymentVerifier
 *
 * Ce composant vérifie le statut d'un paiement Stripe après la redirection
 * depuis Stripe Checkout et met à jour la commande si nécessaire.
 *
 * UTILISATION :
 * Ajouté à la page discographie pour vérifier automatiquement le paiement
 * quand success=true est dans l'URL.
 */

"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentVerifier() {
  const searchParams = useSearchParams();
  // Extraire le sessionId une seule fois pour éviter les re-rendus
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"checking" | "success" | "error" | null>(
    null
  );
  const [message, setMessage] = useState<string>("");
  // Utiliser un ref pour tracker les session_id déjà vérifiés et éviter les vérifications multiples
  const verifiedSessionIdsRef = useRef<Set<string>>(new Set());
  const isVerifyingRef = useRef<boolean>(false);

  useEffect(() => {
    // Si pas de session_id dans l'URL, ne rien faire
    if (!sessionId) {
      return;
    }

    // Éviter de vérifier plusieurs fois le même session_id
    if (
      verifiedSessionIdsRef.current.has(sessionId) ||
      isVerifyingRef.current
    ) {
      return;
    }

    // Marquer comme en cours de vérification
    isVerifyingRef.current = true;
    verifiedSessionIdsRef.current.add(sessionId);

    // Vérifier le statut du paiement
    const verifyPayment = async () => {
      setStatus("checking");
      setMessage("Vérification du paiement...");

      try {
        const response = await fetch("/api/stripe/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (response.ok && data.status === "paid") {
          setStatus("success");
          setMessage(
            "Paiement confirmé ! Vous recevrez un email de confirmation."
          );
        } else {
          setStatus("error");
          setMessage(
            data.message || "Erreur lors de la vérification du paiement"
          );
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du paiement:", error);
        setStatus("error");
        setMessage("Erreur lors de la vérification du paiement");
      } finally {
        // Marquer comme terminé
        isVerifyingRef.current = false;
      }
    };

    verifyPayment();
  }, [sessionId]); // Dépendre uniquement du sessionId, pas de searchParams

  // Masquer automatiquement le message de succès après 3 secondes
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus(null);
        setMessage("");
      }, 3000); // 3000ms = 3 secondes

      // Nettoyer le timer si le composant est démonté avant la fin du délai
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!status) {
    return null;
  }

  return (
    <div
      style={{
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "4px",
        backgroundColor:
          status === "success"
            ? "#d4edda"
            : status === "error"
            ? "#f8d7da"
            : "#d1ecf1",
        color:
          status === "success"
            ? "#155724"
            : status === "error"
            ? "#721c24"
            : "#0c5460",
        border: `1px solid ${
          status === "success"
            ? "#c3e6cb"
            : status === "error"
            ? "#f5c6cb"
            : "#bee5eb"
        }`,
      }}
    >
      {status === "checking" && "⏳ "}
      {status === "success" && "✅ "}
      {status === "error" && "❌ "}
      {message}
    </div>
  );
}
