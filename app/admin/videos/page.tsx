/**
 * Page Admin - Gestion des Vidéos
 *
 * Cette page permet de gérer les vidéos via une interface CRUD complète :
 * - CREATE : Créer une nouvelle vidéo
 * - READ : Afficher la liste des vidéos
 * - UPDATE : Modifier une vidéo existante
 * - DELETE : Supprimer une vidéo
 *
 * Route : /admin/videos
 *
 * Fonctionnalités :
 * - Authentification requise (vérifiée via sessionStorage)
 * - Formulaire dynamique pour créer/modifier
 * - Sélecteur de type MIME pour les vidéos
 * - Gestion de la durée en secondes avec formatage (mm:ss)
 * - Liste des vidéos avec informations détaillées
 * - Actions (modifier/supprimer) pour chaque vidéo
 */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import styles from "./videos.module.css";

/**
 * Interface TypeScript pour une vidéo
 * Correspond au modèle Video dans Prisma
 */
interface Video {
  id: number; // Identifiant unique de la vidéo
  title: string; // Titre de la vidéo
  description: string | null; // Description de la vidéo (optionnel)
  videoUrl: string; // URL ou chemin vers le fichier vidéo (ex: "/videos/video.mp4")
  videoType: string; // Type MIME de la vidéo (ex: "video/mp4", "video/webm")
  thumbnailUrl: string | null; // URL de la miniature/aperçu (optionnel)
  duration: number | null; // Durée en secondes (optionnel)
  createdAt: Date; // Date de création
  updatedAt: Date; // Date de dernière modification
}

/**
 * Composant principal pour la gestion des vidéos
 *
 * Gère l'état de l'application :
 * - videos : Liste des vidéos chargées depuis l'API
 * - isLoading : État de chargement initial
 * - showForm : Affichage/masquage du formulaire
 * - editingVideo : Vidéo en cours d'édition (null si création)
 * - formData : Données du formulaire
 */
export default function AdminVideos() {
  const router = useRouter();

  // ===== ÉTATS DE L'APPLICATION =====

  /**
   * Liste des vidéos récupérées depuis l'API
   */
  const [videos, setVideos] = useState<Video[]>([]);

  /**
   * État de chargement initial (affiche un loader pendant le fetch)
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Contrôle l'affichage du formulaire (true = visible, false = masqué)
   */
  const [showForm, setShowForm] = useState(false);

  /**
   * Vidéo en cours d'édition (null si on crée une nouvelle vidéo)
   * Permet de savoir si on est en mode "création" ou "modification"
   */
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  /**
   * Données du formulaire
   * duration est une string car l'input type="number" retourne une string
   */
  const [formData, setFormData] = useState({
    title: "", // Titre de la vidéo
    description: "", // Description (optionnel)
    videoUrl: "", // URL de la vidéo
    videoType: "video/mp4", // Type MIME (par défaut: MP4)
    thumbnailUrl: "", // URL de la miniature (optionnel)
    duration: "", // Durée en secondes (string pour l'input)
  });

  // ===== EFFET AU MONTAGE DU COMPOSANT =====

  /**
   * useEffect : Vérifie l'authentification et charge les vidéos au montage
   *
   * S'exécute une seule fois au chargement de la page :
   * 1. Vérifie si l'utilisateur est authentifié (sessionStorage)
   * 2. Si non authentifié → redirige vers /admin (page de login)
   * 3. Si authentifié → charge la liste des vidéos
   */
  useEffect(() => {
    // Vérifie l'authentification dans sessionStorage
    const auth = sessionStorage.getItem("admin_authenticated");
    if (auth !== "true") {
      // Redirige vers la page de login si non authentifié
      router.push("/admin");
      return;
    }
    // Charge les vidéos si authentifié
    fetchVideos();
  }, [router]);

  // ===== FONCTIONS DE GESTION DES DONNÉES =====

  /**
   * Récupère la liste des vidéos depuis l'API
   *
   * Appelle l'endpoint GET /api/admin/videos
   * Convertit les dates string en objets Date pour le frontend
   * Met à jour l'état videos avec les données reçues
   * Gère l'état de chargement (isLoading)
   */
  const fetchVideos = async () => {
    try {
      // Appel à l'API pour récupérer toutes les vidéos
      const response = await fetch("/api/admin/videos");
      if (response.ok) {
        // Parse la réponse JSON
        const data = await response.json();

        // Convertit les dates string en objets Date pour le frontend
        // L'API retourne les dates au format ISO string, on les convertit en Date
        const formattedData = data.map(
          (v: {
            id: number;
            title: string;
            description: string | null;
            videoUrl: string;
            videoType: string;
            thumbnailUrl: string | null;
            duration: number | null;
            createdAt: string; // Date au format ISO string depuis l'API
            updatedAt: string; // Date au format ISO string depuis l'API
          }) => ({
            ...v,
            // Convertit les strings en objets Date
            createdAt: new Date(v.createdAt),
            updatedAt: new Date(v.updatedAt),
          })
        );

        // Met à jour l'état avec les vidéos formatées
        setVideos(formattedData);
      } else {
        alert("Erreur lors du chargement des vidéos");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des vidéos:", error);
    } finally {
      // Désactive le loader une fois le chargement terminé
      setIsLoading(false);
    }
  };

  /**
   * Gère la soumission du formulaire (création ou modification)
   *
   * @param {React.FormEvent} e - Événement de soumission du formulaire
   *
   * Logique :
   * 1. Empêche le rechargement de la page
   * 2. Détermine l'URL et la méthode HTTP selon le mode
   * 3. Convertit duration de string à number (ou null si vide)
   * 4. Convertit les chaînes vides en null pour les champs optionnels
   * 5. Envoie la requête à l'API
   * 6. Rafraîchit la liste et réinitialise le formulaire en cas de succès
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Détermine l'URL et la méthode selon le mode
      const url = editingVideo
        ? `/api/admin/videos/${editingVideo.id}`
        : "/api/admin/videos";
      const method = editingVideo ? "PUT" : "POST";

      // Envoie la requête à l'API
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // Convertit les chaînes vides en null pour les champs optionnels
          description: formData.description || null,
          thumbnailUrl: formData.thumbnailUrl || null,
          // Convertit duration de string à number (ou null si vide)
          // parseInt() convertit "180" en 180, ou NaN si vide
          duration: formData.duration ? parseInt(formData.duration) : null,
        }),
      });

      if (response.ok) {
        // Succès : rafraîchit la liste et réinitialise le formulaire
        fetchVideos();
        resetForm();
      } else {
        // Erreur : affiche un message d'alerte
        alert("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde");
    }
  };

  /**
   * Prépare le formulaire en mode édition
   *
   * @param {Video} video - La vidéo à modifier
   *
   * Remplit le formulaire avec les données de la vidéo sélectionnée
   * Convertit les valeurs au format attendu par les inputs :
   * - duration (number | null) → string (ou "" si null)
   */
  const handleEdit = (video: Video) => {
    // Définit la vidéo en cours d'édition
    setEditingVideo(video);

    // Remplit le formulaire avec les données de la vidéo
    setFormData({
      title: video.title,
      // Convertit null en chaîne vide pour l'input
      description: video.description || "",
      videoUrl: video.videoUrl,
      videoType: video.videoType,
      thumbnailUrl: video.thumbnailUrl || "",
      // Convertit le nombre en string pour l'input type="number"
      duration: video.duration ? video.duration.toString() : "",
    });

    // Affiche le formulaire
    setShowForm(true);
  };

  /**
   * Supprime une vidéo après confirmation
   *
   * @param {number} id - L'identifiant de la vidéo à supprimer
   *
   * 1. Demande confirmation à l'utilisateur
   * 2. Envoie une requête DELETE à l'API
   * 3. Rafraîchit la liste en cas de succès
   */
  const handleDelete = async (id: number) => {
    // Demande confirmation avant suppression
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette vidéo ?")) {
      return; // Annule si l'utilisateur refuse
    }

    try {
      // Envoie la requête DELETE à l'API
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Rafraîchit la liste pour refléter la suppression
        fetchVideos();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression");
    }
  };

  /**
   * Réinitialise le formulaire et sort du mode édition
   *
   * Remet tous les champs à vide et cache le formulaire
   */
  const resetForm = () => {
    // Remet tous les champs à leur valeur par défaut
    setFormData({
      title: "",
      description: "",
      videoUrl: "",
      videoType: "video/mp4", // Remet le type par défaut
      thumbnailUrl: "",
      duration: "",
    });
    // Sort du mode édition
    setEditingVideo(null);
    // Cache le formulaire
    setShowForm(false);
  };

  /**
   * Formate la durée en secondes au format mm:ss
   *
   * @param {number | null} seconds - Durée en secondes (ou null)
   * @returns {string} Durée formatée (ex: "3:45" pour 225 secondes) ou "N/A"
   *
   * Exemple :
   * - 180 secondes → "3:00"
   * - 225 secondes → "3:45"
   * - null → "N/A"
   */
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "N/A";

    // Calcule les minutes (division entière)
    const mins = Math.floor(seconds / 60);
    // Calcule les secondes restantes (modulo)
    const secs = seconds % 60;

    // Formate avec padStart pour avoir toujours 2 chiffres pour les secondes
    // Ex: "5" devient "05"
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ===== RENDU CONDITIONNEL =====

  /**
   * Affiche un loader pendant le chargement initial
   */
  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Chargement...</div>
      </AdminLayout>
    );
  }

  // ===== RENDU PRINCIPAL =====

  return (
    <AdminLayout>
      <div className={styles.container}>
        {/* En-tête avec titre et bouton d'ajout */}
        <div className={styles.header}>
          <h1 className={styles.title}>Gestion des Vidéos</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={styles.addButton}
          >
            {showForm ? "Annuler" : "+ Ajouter une vidéo"}
          </button>
        </div>

        {/* Formulaire conditionnel */}
        {showForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>
              {editingVideo ? "Modifier la vidéo" : "Nouvelle vidéo"}
            </h2>

            {/* Grille de champs du formulaire */}
            <div className={styles.formGrid}>
              {/* Titre de la vidéo */}
              <div className={styles.formGroup}>
                <label htmlFor="title">Titre *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              {/* URL de la vidéo */}
              <div className={styles.formGroup}>
                <label htmlFor="videoUrl">URL de la vidéo *</label>
                <input
                  type="url"
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  required
                  placeholder="ex: /videos/video.mp4 ou https://..."
                />
              </div>

              {/* Type MIME de la vidéo (sélecteur) */}
              <div className={styles.formGroup}>
                <label htmlFor="videoType">Type de vidéo *</label>
                <select
                  id="videoType"
                  value={formData.videoType}
                  onChange={(e) =>
                    setFormData({ ...formData, videoType: e.target.value })
                  }
                  required
                >
                  <option value="video/mp4">MP4</option>
                  <option value="video/webm">WebM</option>
                  <option value="video/ogg">OGG</option>
                  <option value="video/quicktime">QuickTime (MOV)</option>
                  <option value="video/x-msvideo">AVI</option>
                </select>
              </div>

              {/* URL de la miniature (optionnel) */}
              <div className={styles.formGroup}>
                <label htmlFor="thumbnailUrl">
                  URL de la miniature (optionnel)
                </label>
                <input
                  type="url"
                  id="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnailUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              {/* Durée en secondes (optionnel) */}
              <div className={styles.formGroup}>
                <label htmlFor="duration">Durée en secondes (optionnel)</label>
                <input
                  type="number"
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="ex: 180 pour 3 minutes"
                  min="0"
                />
              </div>

              {/* Description (optionnel, prend toute la largeur) */}
              <div className={styles.formGroupFull}>
                <label htmlFor="description">Description (optionnel)</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  placeholder="Description de la vidéo..."
                />
              </div>
            </div>

            {/* Boutons d'action du formulaire */}
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                {editingVideo ? "Modifier" : "Créer"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className={styles.cancelButton}
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {/* Liste des vidéos */}
        <div className={styles.videosList}>
          {videos.length === 0 ? (
            // Message si aucune vidéo
            <p className={styles.empty}>Aucune vidéo pour le moment.</p>
          ) : (
            // Affichage de chaque vidéo avec ses informations
            videos.map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <p className={styles.videoUrl}>URL: {video.videoUrl}</p>
                  <p className={styles.videoType}>Type: {video.videoType}</p>
                  {/* Affiche la durée formatée si elle existe */}
                  {video.duration && (
                    <p className={styles.videoDuration}>
                      Durée: {formatDuration(video.duration)}
                    </p>
                  )}
                  {/* Affiche la description tronquée si elle existe */}
                  {video.description && (
                    <p className={styles.videoDescription}>
                      {video.description.substring(0, 100)}...
                    </p>
                  )}
                </div>
                {/* Boutons d'action pour chaque vidéo */}
                <div className={styles.videoActions}>
                  <button
                    onClick={() => handleEdit(video)}
                    className={styles.editButton}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className={styles.deleteButton}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
