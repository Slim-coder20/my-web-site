import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// DELETE : Annuler un rendez-vous
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Vérifier l'authentification
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // 2. Récupérer l'ID du rendez-vous
    const appointmentId = params.id;

    // Validation de l'ID
    if (!ObjectId.isValid(appointmentId)) {
      return NextResponse.json(
        { error: "ID de rendez-vous invalide" },
        { status: 400 }
      );
    }

    // 3. Connexion MongoDB
    const client = await clientPromise;
    const db = client.db("slimabida-auth");
    const appointmentsCollection = db.collection("appointments");

    // 4. Vérifier que le rendez-vous existe et appartient à l'utilisateur
    const appointment = await appointmentsCollection.findOne({
      _id: new ObjectId(appointmentId),
      userId: session.user.id,
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Rendez-vous non trouvé" },
        { status: 404 }
      );
    }

    // 5. Vérifier que le rendez-vous peut être annulé
    if (appointment.status === "cancelled") {
      return NextResponse.json(
        { error: "Ce rendez-vous est déjà annulé" },
        { status: 400 }
      );
    }

    if (appointment.status === "completed") {
      return NextResponse.json(
        { error: "Impossible d'annuler un rendez-vous terminé" },
        { status: 400 }
      );
    }

    // 6. Mettre à jour le statut à "cancelled"
    const result = await appointmentsCollection.updateOne(
      { _id: new ObjectId(appointmentId) },
      {
        $set: {
          status: "cancelled",
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Rendez-vous non trouvé" },
        { status: 404 }
      );
    }

    // 7. Retourner le succès
    return NextResponse.json(
      { message: "Rendez-vous annulé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'annulation du rendez-vous:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

