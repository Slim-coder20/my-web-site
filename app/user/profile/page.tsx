"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserLayout from "@/components/UserLayout/UserLayout";
import styles from "./profile.module.css";

export default function Profile() {
  // Gestion des états : états pour la session et le router //
  const { data: session, status } = useSession();
  const router = useRouter();

  // états pour les champs du formulaire //
  // Initialiser directement avec les valeurs de la session pour éviter setState dans useEffect
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [image, setImage] = useState<string | null>(
    session?.user?.image || null
  );

  // états pour la gestion //
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Vérification d'authentification uniquement
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
  }, [status, router]);

  // fonction de soumission //
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Appeler l'API pour mettre à jour le profil
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la mise à jour ");
      }
      setSuccess(true);
      // Rafraichir la page pour mettre à jour les infos //
      window.location.reload();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de la mise à jour"
      );
    } finally {
      setLoading(false);
    }
  };

  // Si non connecté, ne rien afficher (redirection en cours)
  if (!session || status !== "authenticated") {
    return null;
  }

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mon Profil</h1>
        </div>

        <div className={styles.form}>
          <form className={styles.profileForm} onSubmit={handleSubmit}>
            {/* Photo de profil */}
            <div className={styles.imageSection}>
              <div className={styles.imagePlaceholder}>
                {image ? (
                  <img src={image} alt="Photo de profil" />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <p className={styles.imageNote}>
                Upload de photo (fonctionnalité à venir)
              </p>
            </div>

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

            {/* Message d'erreur */}
            {error && <div className={styles.errorMessage}>{error}</div>}

            {/* Message de succès */}
            {success && (
              <div className={styles.successMessage}>
                Profil mis à jour avec succès !
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Mise à jour..." : "Enregistrer les modifications"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
