/**
 * Route API pour la gestion des concerts (CRUD)
 *
 * Ce fichier gère les opérations sur la collection de concerts :
 * - GET : Récupérer tous les concerts
 * - POST : Créer un nouveau concert
 *
 * Chemin : /api/admin/concerts
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET - Récupérer tous les concerts
 *
 * Cette fonction est appelée quand on fait une requête GET vers /api/admin/concerts
 * Elle retourne tous les concerts de la base de données, triés par date décroissante
 * (les plus récents en premier).
 *
 * @returns {Promise<NextResponse>} Liste JSON de tous les concerts
 */
export async function GET() {
  try {
    // Utilise Prisma pour récupérer tous les concerts depuis la base de données
    // orderBy: { date: "desc" } = tri par date décroissante (plus récent en premier)
    const concerts = await prisma.concert.findMany({
      orderBy: { date: "desc" },
    });

    // Retourne la liste des concerts en format JSON
    // NextResponse.json() convertit automatiquement en JSON et ajoute les headers appropriés
    return NextResponse.json(concerts);
  } catch (error) {
    // En cas d'erreur (ex: problème de connexion à la base de données)
    console.error("Erreur GET concerts:", error);

    // Retourne une erreur 500 (Internal Server Error) avec un message d'erreur
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}

/**
 * POST - Créer un nouveau concert
 *
 * Cette fonction est appelée quand on fait une requête POST vers /api/admin/concerts
 * Elle crée un nouveau concert dans la base de données avec les données fournies.
 *
 * @param {NextRequest} request - L'objet de requête contenant les données du concert
 * @returns {Promise<NextResponse>} Le concert créé ou un message d'erreur
 */
export async function POST(request: NextRequest) {
  try {
    // Récupère le corps de la requête (les données JSON envoyées par le frontend)
    const body = await request.json();

    // Extrait tous les champs du concert depuis le body
    // Ces champs correspondent aux inputs du formulaire dans le CMS
    const {
      title, // Titre du concert (requis)
      date, // Date et heure du concert (requis, format ISO string)
      location, // Lieu du concert (requis, ex: "Paris, France")
      description, // Description détaillée (optionnel)
      imageUrl, // URL de l'image du concert (optionnel)
      imageAlt, // Texte alternatif pour l'image (optionnel, pour l'accessibilité)
      venue, // Nom de la salle (optionnel, ex: "La Cigale")
      ticketUrl, // URL pour acheter les billets (optionnel)
    } = body;

    // ===== VALIDATION DES DONNÉES =====
    // Vérifie que les champs obligatoires sont présents
    // Si un champ requis est manquant, on retourne une erreur 400 (Bad Request)
    if (!title || !date || !location) {
      return NextResponse.json(
        { error: "Titre, date et lieu sont requis" },
        { status: 400 } // 400 = Bad Request (données invalides)
      );
    }

    // Convertit la date string en objet Date JavaScript
    // Le frontend envoie la date au format ISO string (ex: "2024-12-25T20:00:00")
    const concertDate = new Date(date);

    // Vérifie que la date est valide (pas NaN)
    // Si la date est invalide, on retourne une erreur 400
    if (isNaN(concertDate.getTime())) {
      return NextResponse.json({ error: "Date invalide" }, { status: 400 });
    }

    // ===== CRÉATION DU CONCERT DANS LA BASE DE DONNÉES =====
    // Utilise Prisma pour créer un nouveau concert
    const concert = await prisma.concert.create({
      data: {
        title, // Titre (requis)
        date: concertDate, // Date convertie en objet Date (requis)
        location, // Lieu (requis)

        // Champs optionnels : si vide, on met null (au lieu de chaîne vide)
        // Cela permet de distinguer "pas de valeur" de "chaîne vide"
        description: description || null,
        imageUrl: imageUrl || null,
        imageAlt: imageAlt || null,
        venue: venue || null,
        ticketUrl: ticketUrl || null,
      },
    });

    // Retourne le concert créé avec le statut 201 (Created)
    // Le statut 201 indique qu'une nouvelle ressource a été créée avec succès
    return NextResponse.json(concert, { status: 201 });
  } catch (error) {
    // En cas d'erreur (ex: problème de connexion, violation de contraintes DB)
    console.error("Erreur POST concert:", error);

    // Retourne une erreur 500 (Internal Server Error)
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}
