// les imports necessaires pour la page de connexion //
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link"
import styles from "./login.module.css";

export default function Login() {
// Initialisation du router // 
const router = useRouter();
  // États des champs du formulaire //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // États pour la gestion du formulaire //
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction handleSubmit pour soumettre le formulaire de connexion //
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      //Appler NextAuth pour se connecter
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // vérifie si la connexion a réussi // 
      if(result?.error) {
        setError("Email ou mot de passe incorrect"); 
        setLoading(false);
        return; 
      }

      // en cas de succès de connexion .. // 
      router.push("/user/dashboard");
      router.refresh(); 
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de la connexion "
      );
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormWrapper}>
        <h1 className={styles.title}>Se connecter</h1>
        
        <form className={styles.loginForm} onSubmit={handleSubmit}>
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
              disabled={loading}
            />
          </div>
  
          {/* Message d'erreur */}
          {error && <div className={styles.errorMessage}>{error}</div>}
  
          {/* Bouton de soumission */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
  
          {/* Lien vers la page d'inscription */}
          <p className={styles.loginLink}>
            Pas encore de compte ? <Link href="/register">S&apos;inscrire</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
