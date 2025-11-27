// Les imports nécessaires pour la page dashboard user //
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserLayout from "@/components/UserLayout/UserLayout";
import styles from "./dashboard.module.css";

// Les états de vérification d'authentification //
export default function UserDashboard() {
  // initialiation du router //
  const router = useRouter();

  const { data: session, status } = useSession();

  // Vérification de l'authentification //
  useEffect(() => {
    if (status === "loading") {
      // En cours de chargement de la session → attendre
      return;
    }

    if (status === "unauthenticated") {
      // User non connecté → rediriger vers login
      router.push("/login");
      return;
    }
  }, [status, router]);

  // Afficher un loader pendant le chargement
  if (status === "loading") {
    return (
      <div className={styles.loadingContainer}>
        <p>Chargement...</p>
      </div>
    );
  }

  // Si pas de session ou non authentifié, ne rien afficher (redirection en cours)
  if (!session || status !== "authenticated") {
    return null;
  }

  // Rendu du dashboard
  return (
    <UserLayout>
      <div className={styles.container}>
        {/* En-tête du dashboard */}
        <div className={styles.dashboardHeader}>
          <div>
            <h1 className={styles.dashboardTitle}>Bienvenue Chez toi !</h1>
            <p className={styles.welcomeText}>
              Bonjour, {session.user?.name || session.user?.email} !
            </p>
          </div>
        </div>

        {/* Grille de cartes pour les fonctionnalités */}
        <div className={styles.dashboardGrid}>
          {/* Carte Profil */}
          <div className={styles.dashboardCard}>
            <h2 className={styles.cardTitle}>Mon Profil</h2>
            <p className={styles.cardDescription}>
              Gérez vos informations personnelles et votre photo de profil.
            </p>
            <Link href="/user/profile" className={styles.cardButton}>
              Modifier mon profil →
            </Link>
          </div>

          {/* Carte Rendez-vous */}
          <div className={styles.dashboardCard}>
            <h2 className={styles.cardTitle}>Mes Rendez-vous</h2>
            <p className={styles.cardDescription}>
              Consultez, réservez ou annulez vos rendez-vous pour les cours.
            </p>
            <Link href="/user/appointments" className={styles.cardButton}>
              Gérer mes rendez-vous →
            </Link>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
