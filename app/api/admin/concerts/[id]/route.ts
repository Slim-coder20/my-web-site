/**
 * Route API pour la gestion d'un concert spécifique (par ID)
 *
 * Ce fichier gère les opérations sur un concert unique identifié par son ID :
 * - PUT : Modifier un concert existant
 * - DELETE : Supprimer un concert
 *
 * Chemin : /api/admin/concerts/[id]
 *
 * Exemples d'URL :
 * - PUT /api/admin/concerts/1 → Modifie le concert avec l'ID 1
 * - DELETE /api/admin/concerts/1 → Supprime le concert avec l'ID 1
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * PUT - Modifier un concert existant
 *
 * Cette fonction est appelée quand on fait une requête PUT vers /api/admin/concerts/[id]
 * Elle met à jour les données d'un concert existant dans la base de données.
 *
 * @param {NextRequest} request - L'objet de requête contenant les nouvelles données du concert
 * @param {Object} context - Le contexte de la route contenant les paramètres dynamiques
 * @param {Promise<{ id: string }>} context.params - Les paramètres de l'URL (ici, l'ID du concert)
 * @returns {Promise<NextResponse>} Le concert modifié ou un message d'erreur
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Récupère l'ID du concert depuis les paramètres de l'URL
    // Exemple : si l'URL est /api/admin/concerts/5, alors id = "5"
    const { id } = await params;

    // Récupère le corps de la requête (les nouvelles données du concert)
    const body = await request.json();

    // Extrait tous les champs du concert depuis le body
    // Ces champs correspondent aux inputs du formulaire dans le CMS
    const {
      title, // Titre du concert (requis)
      date, // Date et heure du concert (requis, format ISO string)
      location, // Lieu du concert (requis)
      description, // Description détaillée (optionnel)
      imageUrl, // URL de l'image (optionnel)
      imageAlt, // Texte alternatif pour l'image (optionnel)
      venue, // Nom de la salle (optionnel)
      ticketUrl, // URL pour acheter les billets (optionnel)
    } = body;

    // ===== VALIDATION DES DONNÉES =====
    // Vérifie que les champs obligatoires sont présents
    if (!title || !date || !location) {
      return NextResponse.json(
        { error: "Titre, date et lieu sont requis" },
        { status: 400 } // 400 = Bad Request (données invalides)
      );
    }

    // Convertit la date string en objet Date JavaScript
    const concertDate = new Date(date);

    // Vérifie que la date est valide
    if (isNaN(concertDate.getTime())) {
      return NextResponse.json({ error: "Date invalide" }, { status: 400 });
    }

    // ===== MISE À JOUR DU CONCERT DANS LA BASE DE DONNÉES =====
    // Utilise Prisma pour mettre à jour le concert
    // where: { id: parseInt(id) } = trouve le concert avec cet ID
    // parseInt(id) convertit la string "5" en nombre 5
    const concert = await prisma.concert.update({
      where: { id: parseInt(id) },
      data: {
        title, // Titre (requis)
        date: concertDate, // Date convertie en objet Date (requis)
        location, // Lieu (requis)

        // Champs optionnels : si vide, on met null
        description: description || null,
        imageUrl: imageUrl || null,
        imageAlt: imageAlt || null,
        venue: venue || null,
        ticketUrl: ticketUrl || null,
      },
    });

    // Retourne le concert modifié
    // Le statut par défaut est 200 (OK)
    return NextResponse.json(concert);
  } catch (error) {
    // En cas d'erreur (ex: concert introuvable, problème de connexion)
    console.error("Erreur PUT concert:", error);

    // Retourne une erreur 500 (Internal Server Error)
    return NextResponse.json(
      { error: "Erreur lors de la modification" },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Supprimer un concert
 *
 * Cette fonction est appelée quand on fait une requête DELETE vers /api/admin/concerts/[id]
 * Elle supprime définitivement un concert de la base de données.
 *
 * ⚠️ ATTENTION : Cette opération est irréversible !
 *
 * @param {NextRequest} request - L'objet de requête (non utilisé ici, mais requis par Next.js)
 * @param {Object} context - Le contexte de la route contenant les paramètres dynamiques
 * @param {Promise<{ id: string }>} context.params - Les paramètres de l'URL (ici, l'ID du concert)
 * @returns {Promise<NextResponse>} Un message de succès ou un message d'erreur
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Récupère l'ID du concert depuis les paramètres de l'URL
    const { id } = await params;

    // ===== SUPPRESSION DU CONCERT DANS LA BASE DE DONNÉES =====
    // Utilise Prisma pour supprimer le concert
    // where: { id: parseInt(id) } = trouve et supprime le concert avec cet ID
    await prisma.concert.delete({
      where: { id: parseInt(id) },
    });

    // Retourne un message de succès
    // On ne retourne pas l'objet supprimé car il n'existe plus
    return NextResponse.json({ success: true });
  } catch (error) {
    // En cas d'erreur (ex: concert introuvable, problème de connexion)
    console.error("Erreur DELETE concert:", error);

    // Retourne une erreur 500 (Internal Server Error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
