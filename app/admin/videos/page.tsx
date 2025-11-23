"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import styles from "./videos.module.css";

interface Video {
  id: number;
  title: string;
  description: string | null;
  videoUrl: string;
  videoType: string;
  thumbnailUrl: string | null;
  duration: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminVideos() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    videoType: "video/mp4",
    thumbnailUrl: "",
    duration: "",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (auth !== "true") {
      router.push("/admin");
      return;
    }
    fetchVideos();
  }, [router]);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/admin/videos");
      if (response.ok) {
        const data = await response.json();
        // Convertir les dates string en objets Date pour le frontend
        const formattedData = data.map(
          (v: {
            id: number;
            title: string;
            description: string | null;
            videoUrl: string;
            videoType: string;
            thumbnailUrl: string | null;
            duration: number | null;
            createdAt: string;
            updatedAt: string;
          }) => ({
            ...v,
            createdAt: new Date(v.createdAt),
            updatedAt: new Date(v.updatedAt),
          })
        );
        setVideos(formattedData);
      } else {
        alert("Erreur lors du chargement des vidéos");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des vidéos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingVideo
        ? `/api/admin/videos/${editingVideo.id}`
        : "/api/admin/videos";
      const method = editingVideo ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          description: formData.description || null,
          thumbnailUrl: formData.thumbnailUrl || null,
          duration: formData.duration ? parseInt(formData.duration) : null,
        }),
      });

      if (response.ok) {
        fetchVideos();
        resetForm();
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde");
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || "",
      videoUrl: video.videoUrl,
      videoType: video.videoType,
      thumbnailUrl: video.thumbnailUrl || "",
      duration: video.duration ? video.duration.toString() : "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette vidéo ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchVideos();
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
      description: "",
      videoUrl: "",
      videoType: "video/mp4",
      thumbnailUrl: "",
      duration: "",
    });
    setEditingVideo(null);
    setShowForm(false);
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
          <h1 className={styles.title}>Gestion des Vidéos</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={styles.addButton}
          >
            {showForm ? "Annuler" : "+ Ajouter une vidéo"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>
              {editingVideo ? "Modifier la vidéo" : "Nouvelle vidéo"}
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

        <div className={styles.videosList}>
          {videos.length === 0 ? (
            <p className={styles.empty}>Aucune vidéo pour le moment.</p>
          ) : (
            videos.map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <p className={styles.videoUrl}>URL: {video.videoUrl}</p>
                  <p className={styles.videoType}>Type: {video.videoType}</p>
                  {video.duration && (
                    <p className={styles.videoDuration}>
                      Durée: {formatDuration(video.duration)}
                    </p>
                  )}
                  {video.description && (
                    <p className={styles.videoDescription}>
                      {video.description.substring(0, 100)}...
                    </p>
                  )}
                </div>
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
