/**
 * Page Admin - Tableau de bord (Dashboard)
 * 
 * Cette page sert de point d'entrée principal pour le CMS admin.
 * Elle affiche un menu avec des cartes pour accéder aux différentes sections :
 * - Albums : Gestion de la discographie
 * - Vidéos : Gestion des vidéos
 * - Concerts : Gestion des événements
 * 
 * Route : /admin/dashboard
 * 
 * Fonctionnalités :
 * - Authentification requise (vérifiée via sessionStorage)
 * - Navigation vers les différentes sections du CMS
 * - Bouton de déconnexion
 * - Interface en grille avec cartes cliquables
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../admin.module.css";

/**
 * Composant principal du tableau de bord admin
 * 
 * Gère l'état de l'application :
 * - isAuthenticated : État d'authentification de l'utilisateur
 * 
 * Affiche un loader pendant la vérification de l'authentification,
 * puis affiche le dashboard avec les cartes de navigation.
 */
export default function AdminDashboard() {
  const router = useRouter();
  
  // ===== ÉTAT DE L'APPLICATION =====
  
  /**
   * État d'authentification de l'utilisateur
   * false par défaut, devient true après vérification
   * Permet d'afficher un loader pendant la vérification
   */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ===== EFFET AU MONTAGE DU COMPOSANT =====
  
  /**
   * useEffect : Vérifie l'authentification au montage
   * 
   * S'exécute une seule fois au chargement de la page :
   * 1. Vérifie si l'utilisateur est authentifié (sessionStorage)
   * 2. Si non authentifié → redirige vers /admin (page de login)
   * 3. Si authentifié → définit isAuthenticated à true pour afficher le dashboard
   */
  useEffect(() => {
    // Vérifie l'authentification dans sessionStorage
    // La valeur "admin_authenticated" est définie lors du login
    const auth = sessionStorage.getItem("admin_authenticated");
    if (auth !== "true") {
      // Redirige vers la page de login si non authentifié
      router.push("/admin");
      return;
    }
    // Définit l'état d'authentification à true pour afficher le dashboard
    setIsAuthenticated(true);
  }, [router]);

  // ===== FONCTIONS DE GESTION =====
  
  /**
   * Gère la déconnexion de l'utilisateur
   * 
   * 1. Supprime le token d'authentification de sessionStorage
   * 2. Redirige vers la page de login
   * 
   * Appelée lors du clic sur le bouton "Déconnexion"
   */
  const handleLogout = () => {
    // Supprime le token d'authentification
    sessionStorage.removeItem("admin_authenticated");
    // Redirige vers la page de login
    router.push("/admin");
  };

  // ===== RENDU CONDITIONNEL =====
  
  /**
   * Affiche rien (ou un loader) pendant la vérification de l'authentification
   * Évite d'afficher le dashboard avant la vérification
   */
  if (!isAuthenticated) {
    return null; // Ou un loader si vous préférez
  }

  // ===== RENDU PRINCIPAL =====
  
  return (
    <div className={styles.dashboardContainer}>
      {/* En-tête du dashboard avec titre et bouton de déconnexion */}
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Tableau de bord</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Déconnexion
        </button>
      </div>

      {/* Grille de cartes pour naviguer vers les différentes sections */}
      <div className={styles.dashboardGrid}>
        {/* Carte Albums */}
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Albums</h2>
          <p className={styles.cardDescription}>
            Gérez vos albums : ajoutez, modifiez ou supprimez des albums de
            votre discographie.
          </p>
          {/* Lien vers la page de gestion des albums */}
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
          {/* Lien vers la page de gestion des vidéos */}
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
          {/* Lien vers la page de gestion des concerts */}
          <Link href="/admin/concerts" className={styles.cardButton}>
            Gérer les concerts →
          </Link>
        </div>
      </div>
    </div>
  );
}
