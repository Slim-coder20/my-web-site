// les imports necessaire à la création de la route d'inscription //
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    // On récupère les données du body //
    const body = await request.json();
    const { name, email, password } = body;

    // Vérifie que tous les champs sont fournis //
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }
    // Vérfie le format de l'email //
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }
    // On vérifie la longueur du mot de passe ( minimum 8 caractères )
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      );
    }
    // Se connecter à Mongodb //
    const client = await clientPromise;
    const db = client.db("slimabida-auth");
    const usersCollection = db.collection("users");

    // Chercher un utilisateur avec cet email //
    const existingUser = await usersCollection.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 409 } // 409 = conflict
      );
    }

    // hasher le mot de passe avec bcrypt //
    // le nombre 10 est le "salt rounds"
    const hashedPassword = await hash(password, 10);

    // Création du nouvel utilisateur //
    const newUser = {
      name: name.trim(), // enlever les espaces au debut/fin
      email: email.toLowerCase().trim(),
      password: hashedPassword, // Stocker le mot de passe hashé dans MongoDB jamais en clair
      role: "user",
      image: null, // pas de photo de profil au départ
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // insérer dans MongoDB //
    await usersCollection.insertOne(newUser);

    // Retourner une réponse de succès
    return NextResponse.json(
      { message: "Compte créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'inscription" },
      { status: 500 }
    );
  }
}
