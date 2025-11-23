/**
 * Route API pour la gestion des vidéos (CRUD)
 * 
 * Ce fichier gère les opérations sur la collection de vidéos :
 * - GET : Récupérer toutes les vidéos
 * - POST : Créer une nouvelle vidéo
 * 
 * Chemin : /api/admin/videos
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET - Récupérer toutes les vidéos
 * 
 * Cette fonction est appelée quand on fait une requête GET vers /api/admin/videos
 * Elle retourne toutes les vidéos de la base de données, triées par ID décroissant
 * (les plus récentes en premier).
 * 
 * @returns {Promise<NextResponse>} Liste JSON de toutes les vidéos
 */
export async function GET() {
  try {
    // Utilise Prisma pour récupérer toutes les vidéos depuis la base de données
    // orderBy: { id: "desc" } = tri par ID décroissant (plus récent en premier)
    const videos = await prisma.video.findMany({
      orderBy: { id: "desc" },
    });

    // Retourne la liste des vidéos en format JSON
    // NextResponse.json() convertit automatiquement en JSON et ajoute les headers appropriés
    return NextResponse.json(videos);
  } catch (error) {
    // En cas d'erreur (ex: problème de connexion à la base de données)
    console.error("Erreur GET videos:", error);
    
    // Retourne une erreur 500 (Internal Server Error) avec un message d'erreur
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}

/**
 * POST - Créer une nouvelle vidéo
 * 
 * Cette fonction est appelée quand on fait une requête POST vers /api/admin/videos
 * Elle crée une nouvelle vidéo dans la base de données avec les données fournies.
 * 
 * @param {NextRequest} request - L'objet de requête contenant les données de la vidéo
 * @returns {Promise<NextResponse>} La vidéo créée ou un message d'erreur
 */
export async function POST(request: NextRequest) {
  try {
    // Récupère le corps de la requête (les données JSON envoyées par le frontend)
    const body = await request.json();
    
    // Extrait tous les champs de la vidéo depuis le body
    // Ces champs correspondent aux inputs du formulaire dans le CMS
    const { 
      title,        // Titre de la vidéo (requis)
      description,  // Description de la vidéo (optionnel)
      videoUrl,     // URL ou chemin vers le fichier vidéo (requis, ex: "/videos/video.mp4")
      videoType,    // Type MIME de la vidéo (requis, ex: "video/mp4", "video/webm")
      thumbnailUrl, // URL de la miniature/aperçu (optionnel)
      duration,     // Durée en secondes (optionnel)
    } = body;

    // ===== VALIDATION DES DONNÉES =====
    // Vérifie que les champs obligatoires sont présents
    // Si un champ requis est manquant, on retourne une erreur 400 (Bad Request)
    if (!title || !videoUrl || !videoType) {
      return NextResponse.json(
        { error: "Titre, URL vidéo et type vidéo sont requis" },
        { status: 400 } // 400 = Bad Request (données invalides)
      );
    }

    // ===== CRÉATION DE LA VIDÉO DANS LA BASE DE DONNÉES =====
    // Utilise Prisma pour créer une nouvelle vidéo
    const video = await prisma.video.create({
      data: {
        title,                    // Titre (requis)
        videoUrl,                  // URL de la vidéo (requis)
        videoType,                 // Type MIME (requis)
        
        // Champs optionnels : si vide, on met null (au lieu de chaîne vide)
        // Cela permet de distinguer "pas de valeur" de "chaîne vide"
        description: description || null,
        thumbnailUrl: thumbnailUrl || null,
        duration: duration ? parseInt(duration.toString()) : null, // Convertit en nombre si fourni
      },
    });

    // Retourne la vidéo créée avec le statut 201 (Created)
    // Le statut 201 indique qu'une nouvelle ressource a été créée avec succès
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    // En cas d'erreur (ex: problème de connexion, violation de contraintes DB)
    console.error("Erreur POST video:", error);
    
    // Retourne une erreur 500 (Internal Server Error)
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}

