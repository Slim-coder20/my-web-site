"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserLayout from "@/components/UserLayout/UserLayout";
import styles from "./appointments.module.css";
import { AppointmentResponse, AppointmentType } from "@/types/appointments";

export default function Appointments() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Les états pour les rendez-vous //
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Les états pour le formulaire de création de rendez-vous //
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "basse" as AppointmentType,
    date: "",
    duration: 60,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fonctions pour charger les rendez-vous depuis API //
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      // on récupère la réponse depuis l'API appointments //
      const response = await fetch("/api/user/appointments");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors du chargement des rendez-vous"
        );
      }

      setAppointments(data.appointments || []);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors du chargement"
      );
    } finally {
      setLoading(false);
    }
  };
  // Charger les rendez-vous au montage du composant
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchAppointments();
    }
  }, [status, router]);

  // Fonction pour créer un nouveau Rendez-vous //
  const handleCreateAppointment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/user/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: formData.type,
          date: formData.date,
          duration: formData.duration,
          notes: formData.notes || null,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la création du rendez-vous"
        );
      }
      // Récupérer la liste des rendez-vous //
      await fetchAppointments();

      // réinitialisation du formulaire et le masquer //
      setFormData({
        type: "basse",
        date: "",
        duration: 60,
        notes: "",
      });
      setShowForm(false);

      // Afficher un message de succès
      alert(
        "Rendez-vous créé avec succès ! Un email a été envoyé à l'administrateur."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du rendez-vous"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Fonction pour annuler une rendez-vous //
  const handleCancelAppointment = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ? ")) {
      return;
    }
    try {
      setError(null);
      const response = await fetch(`/api/user/appointments/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'annulation");
      }

      // Recharger la liste des rendez-vous //
      await fetchAppointments();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'annulation du rendez-vous"
      );
    }
  };
  // Fonction pour formater une date en français
  const formatDate = (dateString: string | Date) => {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Fonction pour obtenir le label du type de cours
  const getTypeLabel = (type: AppointmentType) => {
    const labels: Record<AppointmentType, string> = {
      basse: "Basse",
      composition: "Composition",
      harmonie: "Harmonie",
    };
    return labels[type];
  };

  // Fonction pour obtenir le label du statut
  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "En attente",
      confirmed: "Confirmé",
      cancelled: "Annulé",
      completed: "Terminé",
    };
    return labels[status] || status;
  };

  if (!session || status !== "authenticated") {
    return null;
  }

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mes Rendez-vous</h1>
          <button
            className={styles.addButton}
            onClick={() => setShowForm(!showForm)}
            disabled={loading}
          >
            {showForm ? "− Masquer le formulaire" : "+ Réserver un rendez-vous"}
          </button>
        </div>

        {/* Formulaire de création de rendez-vous */}
        {showForm && (
          <form onSubmit={handleCreateAppointment} className={styles.form}>
            <h2 className={styles.formTitle}>Nouveau rendez-vous</h2>

            {/* Type de cours */}
            <div className={styles.formGroup}>
              <label htmlFor="type">Type de cours *</label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as AppointmentType,
                  })
                }
                required
                disabled={submitting}
              >
                <option value="basse">Basse</option>
                <option value="composition">Composition</option>
                <option value="harmonie">Harmonie</option>
              </select>
            </div>

            {/* Date et heure */}
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
                disabled={submitting}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            {/* Durée */}
            <div className={styles.formGroup}>
              <label htmlFor="duration">Durée (minutes) *</label>
              <input
                type="number"
                id="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value),
                  })
                }
                min="30"
                max="120"
                step="30"
                required
                disabled={submitting}
              />
            </div>

            {/* Notes */}
            <div className={styles.formGroup}>
              <label htmlFor="notes">Notes (optionnel)</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
                disabled={submitting}
                placeholder="Ajoutez des informations supplémentaires..."
              />
            </div>

            {/* Message d'erreur */}
            {error && <div className={styles.errorMessage}>{error}</div>}

            {/* Boutons */}
            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={submitting}
              >
                {submitting ? "Création..." : "Créer le rendez-vous"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setError(null);
                }}
                className={styles.cancelButton}
                disabled={submitting}
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        <div className={styles.content}>
          {/* Message d'erreur global */}
          {error && !showForm && (
            <div className={styles.errorMessage}>{error}</div>
          )}

          {/* État de chargement */}
          {loading ? (
            <div className={styles.loadingState}>
              <p>Chargement de vos rendez-vous...</p>
            </div>
          ) : appointments.length === 0 ? (
            /* État vide */
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>
                Vous n&apos;avez pas encore de rendez-vous.
              </p>
              <p className={styles.emptyStateSubtext}>
                Utilisez le bouton ci-dessus pour réserver un créneau.
              </p>
            </div>
          ) : (
            /* Liste des rendez-vous */
            <div className={styles.appointmentsList}>
              {appointments.map((appointment) => (
                <div key={appointment.id} className={styles.appointmentCard}>
                  <div className={styles.appointmentHeader}>
                    <h3 className={styles.appointmentType}>
                      {getTypeLabel(appointment.type)}
                    </h3>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[
                          `status${
                            appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)
                          }`
                        ]
                      }`}
                    >
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>

                  <div className={styles.appointmentDetails}>
                    <p className={styles.appointmentDate}>
                      <strong>Date :</strong> {formatDate(appointment.date)}
                    </p>
                    <p className={styles.appointmentDuration}>
                      <strong>Durée :</strong> {appointment.duration} minutes
                    </p>
                    {appointment.notes && (
                      <p className={styles.appointmentNotes}>
                        <strong>Notes :</strong> {appointment.notes}
                      </p>
                    )}
                  </div>

                  {/* Bouton d'annulation (seulement si pending ou confirmed) */}
                  {(appointment.status === "pending" ||
                    appointment.status === "confirmed") && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className={styles.cancelAppointmentButton}
                    >
                      Annuler ce rendez-vous
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
