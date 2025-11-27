"use client";

// les imports necessaires pour la création de la page d'inscription //
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./register.module.css";
// import { useLanguage } from "@/contexts/LanguageContext"; // Pour les traductions (à utiliser plus tard)

export default function Register() {
  const router = useRouter();

  // États pour les champs du formulaire //
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // États pour la gestion du formulaire
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // La fonction de soumission du fomulaire //
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Vérifier que les mots de passe correspondent
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        setLoading(false);
        return;
      }
      // Appeler l'api de l'inscription //
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      // Vérfie si l'inscription est réussi //
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription ");
      }

      // succès : afficher un message et redireger vers la page de connexion //
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de l'inscription "
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerFormWrapper}>
        <h1 className={styles.title}>Créer un compte</h1>

        <form className={styles.registerForm} onSubmit={handleSubmit}>
          {/* Champ Nom */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Champ Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Champ Mot de passe */}
          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </div>

          {/* Champ Confirmation mot de passe */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </div>

          {/* Message d'erreur */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Message de succès */}
          {success && (
            <div className={styles.successMessage}>
              Compte créé avec succès ! Redirection...
            </div>
          )}

          {/* Bouton de soumission */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>

          {/* Lien vers la page de connexion */}
          <p className={styles.loginLink}>
            Déjà un compte ? <Link href="/login">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
