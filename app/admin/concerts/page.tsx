"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import styles from "./concerts.module.css";

interface Concert {
  id: number;
  title: string;
  date: Date;
  location: string;
  imageUrl: string | null;
  imageAlt: string | null;
  description: string | null;
  venue: string | null;
  ticketUrl: string | null;
}

export default function AdminConcerts() {
  const router = useRouter();
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingConcert, setEditingConcert] = useState<Concert | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    imageUrl: "",
    imageAlt: "",
    venue: "",
    ticketUrl: "",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (auth !== "true") {
      router.push("/admin");
      return;
    }
    fetchConcerts();
  }, [router]);

  const fetchConcerts = async () => {
    try {
      const response = await fetch("/api/admin/concerts");
      if (response.ok) {
        const data = await response.json();
        setConcerts(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des concerts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingConcert
        ? `/api/admin/concerts/${editingConcert.id}`
        : "/api/admin/concerts";
      const method = editingConcert ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date), // Convertit string → Date
          description: formData.description || null,
          imageUrl: formData.imageUrl || null,
          imageAlt: formData.imageAlt || null,
          venue: formData.venue || null,
          ticketUrl: formData.ticketUrl || null,
        }),
      });

      if (response.ok) {
        fetchConcerts();
        resetForm();
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde");
    }
  };

  const handleEdit = (concert: Concert) => {
    setEditingConcert(concert);
    // Convertir la date en format datetime-local (YYYY-MM-DDTHH:mm)
    const dateStr = new Date(concert.date).toISOString().slice(0, 16);
    setFormData({
      title: concert.title,
      date: dateStr,
      location: concert.location,
      description: concert.description || "",
      imageUrl: concert.imageUrl || "",
      imageAlt: concert.imageAlt || "",
      venue: concert.venue || "",
      ticketUrl: concert.ticketUrl || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce concert ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/concerts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchConcerts();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression");
    }
  };

  const resetForm = () => {
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
    setEditingConcert(null);
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Chargement...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Gestion des Concerts</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={styles.addButton}
          >
            {showForm ? "Annuler" : "+ Ajouter un concert"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>
              {editingConcert ? "Modifier le concert" : "Nouveau concert"}
            </h2>

            <div className={styles.formGrid}>
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

        <div className={styles.concertsList}>
          {concerts.length === 0 ? (
            <p className={styles.empty}>Aucun concert pour le moment.</p>
          ) : (
            concerts.map((concert) => {
              const concertDate = new Date(concert.date);
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
                    {concert.venue && (
                      <p className={styles.concertLocation}>
                        Salle: {concert.venue}
                      </p>
                    )}
                    {concert.description && (
                      <p className={styles.concertDescription}>
                        {concert.description.substring(0, 100)}...
                      </p>
                    )}
                  </div>
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
