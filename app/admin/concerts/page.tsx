/**
 * Page Admin - Gestion des Concerts
 * 
 * Cette page permet de gérer les concerts via une interface CRUD complète :
 * - CREATE : Créer un nouveau concert
 * - READ : Afficher la liste des concerts
 * - UPDATE : Modifier un concert existant
 * - DELETE : Supprimer un concert
 * 
 * Route : /admin/concerts
 * 
 * Fonctionnalités :
 * - Authentification requise (vérifiée via sessionStorage)
 * - Formulaire dynamique pour créer/modifier
 * - Gestion des dates et heures (datetime-local)
 * - Liste des concerts avec formatage de date
 * - Actions (modifier/supprimer) pour chaque concert
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import styles from "./concerts.module.css";

/**
 * Interface TypeScript pour un concert
 * Correspond au modèle Concert dans Prisma
 */
interface Concert {
  id: number;                // Identifiant unique du concert
  title: string;              // Titre du concert
  date: Date;                 // Date et heure du concert
  location: string;           // Lieu du concert (ex: "Paris, France")
  imageUrl: string | null;   // URL de l'image du concert (optionnel)
  imageAlt: string | null;   // Texte alternatif pour l'image (optionnel)
  description: string | null; // Description détaillée (optionnel)
  venue: string | null;       // Nom de la salle (optionnel, ex: "La Cigale")
  ticketUrl: string | null;   // URL pour acheter les billets (optionnel)
}

/**
 * Composant principal pour la gestion des concerts
 * 
 * Gère l'état de l'application :
 * - concerts : Liste des concerts chargés depuis l'API
 * - isLoading : État de chargement initial
 * - showForm : Affichage/masquage du formulaire
 * - editingConcert : Concert en cours d'édition (null si création)
 * - formData : Données du formulaire
 */
export default function AdminConcerts() {
  const router = useRouter();
  
  // ===== ÉTATS DE L'APPLICATION =====
  
  /**
   * Liste des concerts récupérés depuis l'API
   */
  const [concerts, setConcerts] = useState<Concert[]>([]);
  
  /**
   * État de chargement initial (affiche un loader pendant le fetch)
   */
  const [isLoading, setIsLoading] = useState(true);
  
  /**
   * Contrôle l'affichage du formulaire (true = visible, false = masqué)
   */
  const [showForm, setShowForm] = useState(false);
  
  /**
   * Concert en cours d'édition (null si on crée un nouveau concert)
   * Permet de savoir si on est en mode "création" ou "modification"
   */
  const [editingConcert, setEditingConcert] = useState<Concert | null>(null);
  
  /**
   * Données du formulaire
   * date est une string au format "YYYY-MM-DDTHH:mm" pour l'input datetime-local
   */
  const [formData, setFormData] = useState({
    title: "",        // Titre du concert
    date: "",         // Date et heure au format datetime-local (YYYY-MM-DDTHH:mm)
    location: "",     // Lieu du concert
    description: "",   // Description (optionnel)
    imageUrl: "",     // URL de l'image (optionnel)
    imageAlt: "",     // Texte alternatif de l'image (optionnel)
    venue: "",        // Nom de la salle (optionnel)
    ticketUrl: "",    // URL des billets (optionnel)
  });

  // ===== EFFET AU MONTAGE DU COMPOSANT =====
  
  /**
   * useEffect : Vérifie l'authentification et charge les concerts au montage
   * 
   * S'exécute une seule fois au chargement de la page :
   * 1. Vérifie si l'utilisateur est authentifié (sessionStorage)
   * 2. Si non authentifié → redirige vers /admin (page de login)
   * 3. Si authentifié → charge la liste des concerts
   */
  useEffect(() => {
    // Vérifie l'authentification dans sessionStorage
    const auth = sessionStorage.getItem("admin_authenticated");
    if (auth !== "true") {
      // Redirige vers la page de login si non authentifié
      router.push("/admin");
      return;
    }
    // Charge les concerts si authentifié
    fetchConcerts();
  }, [router]);

  // ===== FONCTIONS DE GESTION DES DONNÉES =====
  
  /**
   * Récupère la liste des concerts depuis l'API
   * 
   * Appelle l'endpoint GET /api/admin/concerts
   * Met à jour l'état concerts avec les données reçues
   * Gère l'état de chargement (isLoading)
   */
  const fetchConcerts = async () => {
    try {
      // Appel à l'API pour récupérer tous les concerts
      const response = await fetch("/api/admin/concerts");
      if (response.ok) {
        // Parse la réponse JSON
        const data = await response.json();
        // Met à jour l'état avec les concerts récupérés
        setConcerts(data);
      }
    } catch (error) {
      // Affiche l'erreur dans la console en cas de problème
      console.error("Erreur lors du chargement des concerts:", error);
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
   * 3. Convertit la date string en objet Date pour l'API
   * 4. Convertit les chaînes vides en null pour les champs optionnels
   * 5. Envoie la requête à l'API
   * 6. Rafraîchit la liste et réinitialise le formulaire en cas de succès
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    try {
      // Détermine l'URL et la méthode selon le mode
      const url = editingConcert
        ? `/api/admin/concerts/${editingConcert.id}`
        : "/api/admin/concerts";
      const method = editingConcert ? "PUT" : "POST";

      // Envoie la requête à l'API
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // Convertit la date string en objet Date pour l'API
          // L'input datetime-local retourne une string au format "YYYY-MM-DDTHH:mm"
          date: new Date(formData.date),
          // Convertit les chaînes vides en null pour les champs optionnels
          description: formData.description || null,
          imageUrl: formData.imageUrl || null,
          imageAlt: formData.imageAlt || null,
          venue: formData.venue || null,
          ticketUrl: formData.ticketUrl || null,
        }),
      });

      if (response.ok) {
        // Succès : rafraîchit la liste et réinitialise le formulaire
        fetchConcerts();
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
   * @param {Concert} concert - Le concert à modifier
   * 
   * Remplit le formulaire avec les données du concert sélectionné
   * Convertit la date Date en string au format datetime-local pour l'input
   */
  const handleEdit = (concert: Concert) => {
    // Définit le concert en cours d'édition
    setEditingConcert(concert);
    
    // Convertit la date Date en format datetime-local (YYYY-MM-DDTHH:mm)
    // toISOString() retourne "YYYY-MM-DDTHH:mm:ss.sssZ"
    // slice(0, 16) garde seulement "YYYY-MM-DDTHH:mm"
    const dateStr = new Date(concert.date).toISOString().slice(0, 16);
    
    // Remplit le formulaire avec les données du concert
    setFormData({
      title: concert.title,
      date: dateStr, // Date formatée pour l'input datetime-local
      location: concert.location,
      // Convertit null en chaîne vide pour les inputs
      description: concert.description || "",
      imageUrl: concert.imageUrl || "",
      imageAlt: concert.imageAlt || "",
      venue: concert.venue || "",
      ticketUrl: concert.ticketUrl || "",
    });
    
    // Affiche le formulaire
    setShowForm(true);
  };

  /**
   * Supprime un concert après confirmation
   * 
   * @param {number} id - L'identifiant du concert à supprimer
   * 
   * 1. Demande confirmation à l'utilisateur
   * 2. Envoie une requête DELETE à l'API
   * 3. Rafraîchit la liste en cas de succès
   */
  const handleDelete = async (id: number) => {
    // Demande confirmation avant suppression
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce concert ?")) {
      return; // Annule si l'utilisateur refuse
    }

    try {
      // Envoie la requête DELETE à l'API
      const response = await fetch(`/api/admin/concerts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Rafraîchit la liste pour refléter la suppression
        fetchConcerts();
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
      date: "",
      location: "",
      description: "",
      imageUrl: "",
      imageAlt: "",
      venue: "",
      ticketUrl: "",
    });
    // Sort du mode édition
    setEditingConcert(null);
    // Cache le formulaire
    setShowForm(false);
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
          <h1 className={styles.title}>Gestion des Concerts</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={styles.addButton}
          >
            {showForm ? "Annuler" : "+ Ajouter un concert"}
          </button>
        </div>

        {/* Formulaire conditionnel */}
        {showForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>
              {editingConcert ? "Modifier le concert" : "Nouveau concert"}
            </h2>

            {/* Grille de champs du formulaire */}
            <div className={styles.formGrid}>
              {/* Titre du concert */}
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

              {/* Date et heure (input datetime-local) */}
              <div className={styles.formGroup}>
                <label htmlFor="date">Date et heure *</label>
                <input
                  type="datetime-local"
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>

              {/* Lieu du concert */}
              <div className={styles.formGroup}>
                <label htmlFor="location">Lieu *</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                  placeholder="ex: Paris, France"
                />
              </div>

              {/* Nom de la salle (optionnel) */}
              <div className={styles.formGroup}>
                <label htmlFor="venue">Salle / Venue</label>
                <input
                  type="text"
                  id="venue"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  placeholder="ex: Olympia"
                />
              </div>

              {/* URL de l'image (optionnel) */}
              <div className={styles.formGroup}>
                <label htmlFor="imageUrl">URL de l&apos;image</label>
                <input
                  type="url"
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              {/* Texte alternatif de l'image (optionnel) */}
              <div className={styles.formGroup}>
                <label htmlFor="imageAlt">
                  Texte alternatif de l&apos;image
                </label>
                <input
                  type="text"
                  id="imageAlt"
                  value={formData.imageAlt}
                  onChange={(e) =>
                    setFormData({ ...formData, imageAlt: e.target.value })
                  }
                  placeholder="Description de l'image"
                />
              </div>

              {/* URL des billets (optionnel) */}
              <div className={styles.formGroup}>
                <label htmlFor="ticketUrl">URL des billets</label>
                <input
                  type="url"
                  id="ticketUrl"
                  value={formData.ticketUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, ticketUrl: e.target.value })
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
                  placeholder="Description du concert..."
                />
              </div>
            </div>

            {/* Boutons d'action du formulaire */}
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                {editingConcert ? "Modifier" : "Créer"}
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

        {/* Liste des concerts */}
        <div className={styles.concertsList}>
          {concerts.length === 0 ? (
            // Message si aucun concert
            <p className={styles.empty}>Aucun concert pour le moment.</p>
          ) : (
            // Affichage de chaque concert avec formatage de la date
            concerts.map((concert) => {
              // Convertit la date en objet Date (au cas où elle serait une string)
              const concertDate = new Date(concert.date);
              
              // Formate la date en français (ex: "25 décembre 2024, 20:00")
              const formattedDate = concertDate.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={concert.id} className={styles.concertCard}>
                  <div className={styles.concertInfo}>
                    <h3 className={styles.concertTitle}>{concert.title}</h3>
                    <p className={styles.concertDate}>{formattedDate}</p>
                    <p className={styles.concertLocation}>{concert.location}</p>
                    {/* Affiche la salle si elle existe */}
                    {concert.venue && (
                      <p className={styles.concertLocation}>
                        Salle: {concert.venue}
                      </p>
                    )}
                    {/* Affiche la description tronquée si elle existe */}
                    {concert.description && (
                      <p className={styles.concertDescription}>
                        {concert.description.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                  {/* Boutons d'action pour chaque concert */}
                  <div className={styles.concertActions}>
                    <button
                      onClick={() => handleEdit(concert)}
                      className={styles.editButton}
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(concert.id)}
                      className={styles.deleteButton}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
