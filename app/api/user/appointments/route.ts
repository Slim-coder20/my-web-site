import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Resend } from "resend";
import { AppointmentStatus } from "@/types/appointments";

// Vérification de la clé API Resend
if (!process.env.RESEND_API_KEY) {
  console.warn(
    "RESEND_API_KEY n'est pas définie dans les variables d'environnement"
  );
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// GET : Récupérer les rendez-vous de l'utilisateur
export async function GET(request: NextRequest) {
  try {
    // 1. Vérifier l'authentification
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // 2. Récupérer les paramètres de requête (optionnel)
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // Filtrer par statut

    // 3. Connexion MongoDB
    const client = await clientPromise;
    const db = client.db("slimabida-auth");
    const appointmentsCollection = db.collection("appointments");

    // 4. Construire la requête
    const query: Record<string, unknown> = {
      userId: session.user.id,
    };
    if (status) {
      query.status = status as AppointmentStatus;
    }

    // 5. Récupérer les rendez-vous (triés par date décroissante)
    const appointments = await appointmentsCollection
      .find(query)
      .sort({ date: -1 }) // Plus récent en premier
      .toArray();

    // 6. Formater les résultats (convertir ObjectId en string)
    const formattedAppointments = appointments.map((apt) => ({
      id: apt._id.toString(),
      userId: apt.userId,
      type: apt.type,
      date: apt.date,
      duration: apt.duration,
      status: apt.status,
      notes: apt.notes,
      createdAt: apt.createdAt,
      updatedAt: apt.updatedAt,
    }));

    return NextResponse.json(
      { appointments: formattedAppointments },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST : Créer un nouveau rendez-vous
export async function POST(request: NextRequest) {
  try {
    // 1. Vérifier l'authentification
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // 2. Récupérer les données du body
    const body = await request.json();
    const { type, date, duration, notes } = body;

    // 3. Validation
    if (!type || !date || !duration) {
      return NextResponse.json(
        { error: "Le type, la date et la durée sont requis" },
        { status: 400 }
      );
    }

    // Vérifier le type
    if (!["basse", "composition", "harmonie"].includes(type)) {
      return NextResponse.json(
        { error: "Type de cours invalide" },
        { status: 400 }
      );
    }

    // Vérifier que la date est dans le futur
    const appointmentDate = new Date(date);
    if (appointmentDate < new Date()) {
      return NextResponse.json(
        { error: "La date doit être dans le futur" },
        { status: 400 }
      );
    }

    // Vérifier la durée (minimum 30 minutes, maximum 120 minutes)
    if (duration < 30 || duration > 120) {
      return NextResponse.json(
        { error: "La durée doit être entre 30 et 120 minutes" },
        { status: 400 }
      );
    }

    // 4. Connexion MongoDB
    const client = await clientPromise;
    const db = client.db("slimabida-auth");
    const appointmentsCollection = db.collection("appointments");
    const usersCollection = db.collection("users");

    // 5. Récupérer les infos de l'utilisateur pour l'email
    const user = await usersCollection.findOne({
      _id: new ObjectId(session.user.id),
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // 6. Vérifier les conflits de créneaux
    const conflictingAppointment = await appointmentsCollection.findOne({
      userId: session.user.id,
      date: appointmentDate,
      status: { $in: ["pending", "confirmed"] },
    });

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: "Vous avez déjà un rendez-vous à cette date" },
        { status: 409 }
      );
    }

    // 7. Créer le rendez-vous
    const newAppointment = {
      userId: session.user.id,
      type,
      date: appointmentDate,
      duration,
      status: "pending", // Par défaut, en attente de confirmation
      notes: notes || null,
      adminNotes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await appointmentsCollection.insertOne(newAppointment);

    // 8. Envoyer l'email à slimabidaproject@gmail.com
    if (resend) {
      try {
        const fromEmail =
          process.env.RESEND_FROM_EMAIL || "noreply@slimabida.fr";
        const adminEmail = "slimabidaproject@gmail.com"; // Email de réception

        // Formater la date pour l'email
        const formattedDate = new Intl.DateTimeFormat("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(appointmentDate);

        // Types de cours en français
        const typeLabels: Record<string, string> = {
          basse: "Basse",
          composition: "Composition",
          harmonie: "Harmonie",
        };

        await resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          subject: `Nouvelle demande de rendez-vous - ${typeLabels[type]}`,
          html: `
            <h2>Nouvelle demande de rendez-vous</h2>
            <p><strong>Utilisateur :</strong> ${user.name}</p>
            <p><strong>Email :</strong> ${user.email}</p>
            <p><strong>Type de cours :</strong> ${typeLabels[type]}</p>
            <p><strong>Date et heure :</strong> ${formattedDate}</p>
            <p><strong>Durée :</strong> ${duration} minutes</p>
            ${notes ? `<p><strong>Notes :</strong> ${notes}</p>` : ""}
            <p><strong>Statut :</strong> En attente de confirmation</p>
            <hr>
            <p><em>ID du rendez-vous : ${result.insertedId.toString()}</em></p>
          `,
        });

        console.log(
          `✅ Email envoyé à ${adminEmail} pour le rendez-vous ${result.insertedId}`
        );
      } catch (emailError) {
        // Ne pas faire échouer la création du rendez-vous si l'email échoue
        console.error("❌ Erreur lors de l'envoi de l'email:", emailError);
      }
    } else {
      console.warn(
        "⚠️ RESEND_API_KEY non configurée, email non envoyé pour le rendez-vous"
      );
    }

    // 9. Retourner le rendez-vous créé
    return NextResponse.json(
      {
        message: "Rendez-vous créé avec succès",
        appointment: {
          id: result.insertedId.toString(),
          ...newAppointment,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
