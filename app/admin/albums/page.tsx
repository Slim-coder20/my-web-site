"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import styles from "./albums.module.css";
// création d'une interface pour les albums / 
interface Album {
  id: number;
  slug: string;
  title: string;
  description: string | null; 
  priceCents: number;
  coverUrl: string | null;
}
// création d'une interface pour les donnéess du formulaire //

export default function AdminAlbums() {
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    priceCents: "",
    coverUrl: "",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (auth !== "true") {
      router.push("/admin");
      return;
    }
    fetchAlbums();
  }, [router]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch("/api/admin/albums");
      if (response.ok) {
        const data = await response.json();
        setAlbums(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des albums:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingAlbum
        ? `/api/admin/albums/${editingAlbum.id}`
        : "/api/admin/albums";
      const method = editingAlbum ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          priceCents: parseInt(formData.priceCents),
          description: formData.description || null,
        }),
      });

      if (response.ok) {
        fetchAlbums();
        resetForm();
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde");
    }
  };

  const handleEdit = (album: Album) => {
    setEditingAlbum(album);
    setFormData({
      slug: album.slug,
      title: album.title,
      description: album.description || "",
      priceCents: album.priceCents.toString(),
      coverUrl: album.coverUrl || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet album ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/albums/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAlbums();
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
      slug: "",
      title: "",
      description: "",
      priceCents: "",
      coverUrl: "",
    });
    setEditingAlbum(null);
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
          <h1 className={styles.title}>Gestion des Albums</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={styles.addButton}
          >
            {showForm ? "Annuler" : "+ Ajouter un album"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>
              {editingAlbum ? "Modifier l'album" : "Nouvel album"}
            </h2>

            <div className={styles.formGrid}>
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

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
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

        <div className={styles.albumsList}>
          {albums.length === 0 ? (
            <p className={styles.empty}>Aucun album pour le moment.</p>
          ) : (
            albums.map((album) => (
              <div key={album.id} className={styles.albumCard}>
                <div className={styles.albumInfo}>
                  <h3 className={styles.albumTitle}>{album.title}</h3>
                  <p className={styles.albumSlug}>Slug: {album.slug}</p>
                  <p className={styles.albumPrice}>
                    Prix: {(album.priceCents / 100).toFixed(2)} €
                  </p>
                  {album.description && (
                    <p className={styles.albumDescription}>
                      {album.description.substring(0, 100)}...
                    </p>
                  )}
                </div>
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

