/**
 * Page Admin - Gestion des Albums
 *
 * Cette page permet de gérer les albums de la discographie via une interface CRUD complète :
 * - CREATE : Créer un nouvel album
 * - READ : Afficher la liste des albums
 * - UPDATE : Modifier un album existant
 * - DELETE : Supprimer un album
 *
 * Route : /admin/albums
 *
 * Fonctionnalités :
 * - Authentification requise (vérifiée via sessionStorage)
 * - Formulaire dynamique pour créer/modifier
 * - Liste des albums avec actions (modifier/supprimer)
 * - Gestion des prix en centimes (ex: 1500 = 15,00€)
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import styles from "./albums.module.css";

/**
 * Interface TypeScript pour un album
 * Correspond au modèle Product dans Prisma
 */
interface Album {
  id: number; // Identifiant unique de l'album
  slug: string; // Identifiant URL-friendly (ex: "asymetrie-2022")
  title: string; // Titre de l'album
  description: string | null; // Description détaillée (optionnel)
  priceCents: number; // Prix en centimes (ex: 1500 = 15,00€)
  coverUrl: string | null; // URL de la pochette (optionnel)
}

/**
 * Composant principal pour la gestion des albums
 *
 * Gère l'état de l'application :
 * - albums : Liste des albums chargés depuis l'API
 * - isLoading : État de chargement initial
 * - showForm : Affichage/masquage du formulaire
 * - editingAlbum : Album en cours d'édition (null si création)
 * - formData : Données du formulaire
 */
export default function AdminAlbums() {
  const router = useRouter();

  // ===== ÉTATS DE L'APPLICATION =====

  /**
   * Liste des albums récupérés depuis l'API
   */
  const [albums, setAlbums] = useState<Album[]>([]);

  /**
   * État de chargement initial (affiche un loader pendant le fetch)
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Contrôle l'affichage du formulaire (true = visible, false = masqué)
   */
  const [showForm, setShowForm] = useState(false);

  /**
   * Album en cours d'édition (null si on crée un nouvel album)
   * Permet de savoir si on est en mode "création" ou "modification"
   */
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);

  /**
   * Données du formulaire (tous les champs sont des strings pour les inputs)
   * priceCents est une string car l'input type="number" retourne une string
   */
  const [formData, setFormData] = useState({
    slug: "", // Identifiant unique (ex: "asymetrie-2022")
    title: "", // Titre de l'album
    description: "", // Description (optionnel)
    priceCents: "", // Prix en centimes (string pour l'input)
    coverUrl: "", // URL de la pochette (optionnel)
  });

  // ===== EFFET AU MONTAGE DU COMPOSANT =====

  /**
   * useEffect : Vérifie l'authentification et charge les albums au montage
   *
   * S'exécute une seule fois au chargement de la page :
   * 1. Vérifie si l'utilisateur est authentifié (sessionStorage)
   * 2. Si non authentifié → redirige vers /admin (page de login)
   * 3. Si authentifié → charge la liste des albums
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
    // Charge les albums si authentifié
    fetchAlbums();
  }, [router]);

  // ===== FONCTIONS DE GESTION DES DONNÉES =====

  /**
   * Récupère la liste des albums depuis l'API
   *
   * Appelle l'endpoint GET /api/admin/albums
   * Met à jour l'état albums avec les données reçues
   * Gère l'état de chargement (isLoading)
   */
  const fetchAlbums = async () => {
    try {
      // Appel à l'API pour récupérer tous les albums
      const response = await fetch("/api/admin/albums");
      if (response.ok) {
        // Parse la réponse JSON
        const data = await response.json();
        // Met à jour l'état avec les albums récupérés
        setAlbums(data);
      }
    } catch (error) {
      // Affiche l'erreur dans la console en cas de problème
      console.error("Erreur lors du chargement des albums:", error);
    } finally {
      // Désactive le loader une fois le chargement terminé (succès ou erreur)
      setIsLoading(false);
    }
  };

  /**
   * Gère la soumission du formulaire (création ou modification)
   *
   * @param {React.FormEvent} e - Événement de soumission du formulaire
   *
   * Logique :
   * 1. Empêche le rechargement de la page (e.preventDefault())
   * 2. Détermine l'URL et la méthode HTTP selon le mode (création/modification)
   * 3. Convertit les données du formulaire au bon format
   * 4. Envoie la requête à l'API
   * 5. Rafraîchit la liste et réinitialise le formulaire en cas de succès
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Détermine l'URL et la méthode selon le mode
      // Si editingAlbum existe → modification (PUT) sur /api/admin/albums/{id}
      // Sinon → création (POST) sur /api/admin/albums
      const url = editingAlbum
        ? `/api/admin/albums/${editingAlbum.id}`
        : "/api/admin/albums";
      const method = editingAlbum ? "PUT" : "POST";

      // Envoie la requête à l'API
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // Convertit priceCents de string à number
          priceCents: parseInt(formData.priceCents),
          // Convertit les chaînes vides en null pour les champs optionnels
          description: formData.description || null,
        }),
      });

      if (response.ok) {
        // Succès : rafraîchit la liste et réinitialise le formulaire
        fetchAlbums();
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
   * @param {Album} album - L'album à modifier
   *
   * Remplit le formulaire avec les données de l'album sélectionné
   * Convertit les valeurs au format attendu par les inputs :
   * - priceCents (number) → string pour l'input type="number"
   * - description (string | null) → string (ou "" si null)
   */
  const handleEdit = (album: Album) => {
    // Définit l'album en cours d'édition
    setEditingAlbum(album);

    // Remplit le formulaire avec les données de l'album
    setFormData({
      slug: album.slug,
      title: album.title,
      // Convertit null en chaîne vide pour l'input
      description: album.description || "",
      // Convertit le nombre en string pour l'input type="number"
      priceCents: album.priceCents.toString(),
      coverUrl: album.coverUrl || "",
    });

    // Affiche le formulaire
    setShowForm(true);
  };

  /**
   * Supprime un album après confirmation
   *
   * @param {number} id - L'identifiant de l'album à supprimer
   *
   * 1. Demande confirmation à l'utilisateur
   * 2. Envoie une requête DELETE à l'API
   * 3. Rafraîchit la liste en cas de succès
   */
  const handleDelete = async (id: number) => {
    // Demande confirmation avant suppression (opération irréversible)
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet album ?")) {
      return; // Annule si l'utilisateur refuse
    }

    try {
      // Envoie la requête DELETE à l'API
      const response = await fetch(`/api/admin/albums/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Rafraîchit la liste pour refléter la suppression
        fetchAlbums();
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
   * Utilisé après une création/modification réussie ou lors de l'annulation
   */
  const resetForm = () => {
    // Remet tous les champs à leur valeur par défaut
    setFormData({
      slug: "",
      title: "",
      description: "",
      priceCents: "",
      coverUrl: "",
    });
    // Sort du mode édition
    setEditingAlbum(null);
    // Cache le formulaire
    setShowForm(false);
  };

  // ===== RENDU CONDITIONNEL =====

  /**
   * Affiche un loader pendant le chargement initial
   * Évite d'afficher une liste vide pendant le fetch
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
          <h1 className={styles.title}>Gestion des Albums</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={styles.addButton}
          >
            {/* Le bouton change de texte selon l'état du formulaire */}
            {showForm ? "Annuler" : "+ Ajouter un album"}
          </button>
        </div>

        {/* Formulaire conditionnel (affiché si showForm === true) */}
        {showForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>
              {/* Le titre change selon le mode (création/modification) */}
              {editingAlbum ? "Modifier l'album" : "Nouvel album"}
            </h2>

            {/* Grille de champs du formulaire */}
            <div className={styles.formGrid}>
              {/* Slug : identifiant unique pour l'URL */}
              <div className={styles.formGroup}>
                <label htmlFor="slug">Slug (identifiant unique) *</label>
                <input
                  type="text"
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                  placeholder="ex: asymetrie-2022"
                />
              </div>

              {/* Titre de l'album */}
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

              {/* Prix en centimes (ex: 1500 = 15,00€) */}
              <div className={styles.formGroup}>
                <label htmlFor="priceCents">Prix (en centimes) *</label>
                <input
                  type="number"
                  id="priceCents"
                  value={formData.priceCents}
                  onChange={(e) =>
                    setFormData({ ...formData, priceCents: e.target.value })
                  }
                  required
                  placeholder="ex: 1500 pour 15,00€"
                />
              </div>

              {/* URL de la pochette (optionnel) */}
              <div className={styles.formGroup}>
                <label htmlFor="coverUrl">URL de la pochette</label>
                <input
                  type="url"
                  id="coverUrl"
                  value={formData.coverUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, coverUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              {/* Description (optionnel, prend toute la largeur) */}
              <div className={styles.formGroupFull}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  placeholder="Description de l'album..."
                />
              </div>
            </div>

            {/* Boutons d'action du formulaire */}
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                {/* Le texte change selon le mode */}
                {editingAlbum ? "Modifier" : "Créer"}
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

        {/* Liste des albums */}
        <div className={styles.albumsList}>
          {albums.length === 0 ? (
            // Message si aucun album
            <p className={styles.empty}>Aucun album pour le moment.</p>
          ) : (
            // Affichage de chaque album avec ses actions
            albums.map((album) => (
              <div key={album.id} className={styles.albumCard}>
                <div className={styles.albumInfo}>
                  <h3 className={styles.albumTitle}>{album.title}</h3>
                  <p className={styles.albumSlug}>Slug: {album.slug}</p>
                  {/* Conversion des centimes en euros pour l'affichage */}
                  <p className={styles.albumPrice}>
                    Prix: {(album.priceCents / 100).toFixed(2)} €
                  </p>
                  {/* Affiche la description tronquée si elle existe */}
                  {album.description && (
                    <p className={styles.albumDescription}>
                      {album.description.substring(0, 100)}...
                    </p>
                  )}
                </div>
                {/* Boutons d'action pour chaque album */}
                <div className={styles.albumActions}>
                  <button
                    onClick={() => handleEdit(album)}
                    className={styles.editButton}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(album.id)}
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
