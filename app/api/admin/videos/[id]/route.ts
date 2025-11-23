/**
 * Route API pour la gestion d'une vidéo spécifique (par ID)
 *
 * Ce fichier gère les opérations sur une vidéo unique identifiée par son ID :
 * - PUT : Modifier une vidéo existante
 * - DELETE : Supprimer une vidéo
 *
 * Chemin : /api/admin/videos/[id]
 *
 * Exemples d'URL :
 * - PUT /api/admin/videos/1 → Modifie la vidéo avec l'ID 1
 * - DELETE /api/admin/videos/1 → Supprime la vidéo avec l'ID 1
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * PUT - Modifier une vidéo existante
 *
 * Cette fonction est appelée quand on fait une requête PUT vers /api/admin/videos/[id]
 * Elle met à jour les données d'une vidéo existante dans la base de données.
 *
 * @param {NextRequest} request - L'objet de requête contenant les nouvelles données de la vidéo
 * @param {Object} context - Le contexte de la route contenant les paramètres dynamiques
 * @param {Promise<{ id: string }>} context.params - Les paramètres de l'URL (ici, l'ID de la vidéo)
 * @returns {Promise<NextResponse>} La vidéo modifiée ou un message d'erreur
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Récupère l'ID de la vidéo depuis les paramètres de l'URL
    // Exemple : si l'URL est /api/admin/videos/5, alors id = "5"
    const { id } = await params;

    // Récupère le corps de la requête (les nouvelles données de la vidéo)
    const body = await request.json();

    // Extrait tous les champs de la vidéo depuis le body
    // Ces champs correspondent aux inputs du formulaire dans le CMS
    const {
      title, // Titre de la vidéo (requis)
      description, // Description de la vidéo (optionnel)
      videoUrl, // URL ou chemin vers le fichier vidéo (requis)
      videoType, // Type MIME de la vidéo (requis)
      thumbnailUrl, // URL de la miniature (optionnel)
      duration, // Durée en secondes (optionnel)
    } = body;

    // ===== VALIDATION DES DONNÉES =====
    // Vérifie que les champs obligatoires sont présents
    if (!title || !videoUrl || !videoType) {
      return NextResponse.json(
        { error: "Titre, URL vidéo et type vidéo sont requis" },
        { status: 400 } // 400 = Bad Request (données invalides)
      );
    }

    // ===== MISE À JOUR DE LA VIDÉO DANS LA BASE DE DONNÉES =====
    // Utilise Prisma pour mettre à jour la vidéo
    // where: { id: parseInt(id) } = trouve la vidéo avec cet ID
    // parseInt(id) convertit la string "5" en nombre 5
    const video = await prisma.video.update({
      where: { id: parseInt(id) },
      data: {
        title, // Titre (requis)
        videoUrl, // URL de la vidéo (requis)
        videoType, // Type MIME (requis)

        // Champs optionnels : si vide, on met null
        description: description || null,
        thumbnailUrl: thumbnailUrl || null,
        duration: duration ? parseInt(duration.toString()) : null, // Convertit en nombre si fourni
      },
    });

    // Retourne la vidéo modifiée
    // Le statut par défaut est 200 (OK)
    return NextResponse.json(video);
  } catch (error) {
    // En cas d'erreur (ex: vidéo introuvable, problème de connexion)
    console.error("Erreur PUT video:", error);

    // Retourne une erreur 500 (Internal Server Error)
    return NextResponse.json(
      { error: "Erreur lors de la modification" },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Supprimer une vidéo
 *
 * Cette fonction est appelée quand on fait une requête DELETE vers /api/admin/videos/[id]
 * Elle supprime définitivement une vidéo de la base de données.
 *
 * ⚠️ ATTENTION : Cette opération est irréversible !
 *
 * @param {NextRequest} request - L'objet de requête (non utilisé ici, mais requis par Next.js)
 * @param {Object} context - Le contexte de la route contenant les paramètres dynamiques
 * @param {Promise<{ id: string }>} context.params - Les paramètres de l'URL (ici, l'ID de la vidéo)
 * @returns {Promise<NextResponse>} Un message de succès ou un message d'erreur
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Récupère l'ID de la vidéo depuis les paramètres de l'URL
    const { id } = await params;

    // ===== SUPPRESSION DE LA VIDÉO DANS LA BASE DE DONNÉES =====
    // Utilise Prisma pour supprimer la vidéo
    // where: { id: parseInt(id) } = trouve et supprime la vidéo avec cet ID
    await prisma.video.delete({
      where: { id: parseInt(id) },
    });

    // Retourne un message de succès
    // On ne retourne pas l'objet supprimé car il n'existe plus
    return NextResponse.json({ success: true });
  } catch (error) {
    // En cas d'erreur (ex: vidéo introuvable, problème de connexion)
    console.error("Erreur DELETE video:", error);

    // Retourne une erreur 500 (Internal Server Error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
