// ============================================
// Types TypeScript pour les rendez-vous (Appointments)
// ============================================
// Ces types définissent la structure des documents dans la collection MongoDB "appointments"

export type AppointmentType = "basse" | "composition" | "harmonie";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

// Interface pour un document Appointment dans MongoDB
export interface Appointment {
  _id: string; // ObjectId converti en string
  userId: string; // ID de l'utilisateur
  type: AppointmentType; // Type de cours
  date: Date; // Date et heure du rendez-vous
  duration: number; // Durée en minutes
  status: AppointmentStatus; // Statut du rendez-vous
  notes: string | null; // Notes optionnelles de l'utilisateur
  adminNotes: string | null; // Notes internes (admin uniquement)
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour créer un nouveau rendez-vous (sans _id, createdAt, updatedAt)
export interface CreateAppointmentInput {
  type: AppointmentType;
  date: string; // ISO string pour la date
  duration: number;
  notes?: string | null;
}

// Interface pour la réponse API (sans les champs MongoDB internes)
export interface AppointmentResponse {
  id: string;
  userId: string;
  type: AppointmentType;
  date: string; // ISO string
  duration: number;
  status: AppointmentStatus;
  notes: string | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
