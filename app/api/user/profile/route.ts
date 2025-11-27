import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT : Mettre à jour le profil
export async function PUT(request: NextRequest) {
  try {
    // 1. Vérifier l'authentification
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // 2. Récupérer les données du body
    const body = await request.json();
    const { name, email } = body;

    // 3. Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Le nom et l'email sont requis" },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // 4. Connexion MongoDB
    const client = await clientPromise;
    const db = client.db("slimabida-auth");
    const usersCollection = db.collection("users");

    // 5. Vérifier si l'email est déjà utilisé par un autre utilisateur
    const existingUser = await usersCollection.findOne({
      email: email.toLowerCase().trim(),
      _id: { $ne: new ObjectId(session.user.id) }, // Exclure l'utilisateur actuel
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 409 }
      );
    }

    // 6. Mettre à jour l'utilisateur
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // 7. Retourner le succès
    return NextResponse.json(
      { message: "Profil mis à jour avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

