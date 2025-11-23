"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../admin.module.css";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification
    const auth = sessionStorage.getItem("admin_authenticated");
    if (auth !== "true") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return null; // Ou un loader
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Tableau de bord</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Déconnexion
        </button>
      </div>

      <div className={styles.dashboardGrid}>
        {/* Carte Albums */}
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Albums</h2>
          <p className={styles.cardDescription}>
            Gérez vos albums : ajoutez, modifiez ou supprimez des albums de
            votre discographie.
          </p>
          <Link href="/admin/albums" className={styles.cardButton}>
            Gérer les albums →
          </Link>
        </div>

        {/* Carte Vidéos */}
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Vidéos</h2>
          <p className={styles.cardDescription}>
            Gérez vos vidéos : ajoutez de nouvelles vidéos ou modifiez les
            existantes.
          </p>
          <Link href="/admin/videos" className={styles.cardButton}>
            Gérer les vidéos →
          </Link>
        </div>

        {/* Carte Concerts */}
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Concerts</h2>
          <p className={styles.cardDescription}>
            Gérez vos concerts : ajoutez de nouveaux événements ou modifiez les
            dates existantes.
          </p>
          <Link href="/admin/concerts" className={styles.cardButton}>
            Gérer les concerts →
          </Link>
        </div>
      </div>
    </div>
  );
}
