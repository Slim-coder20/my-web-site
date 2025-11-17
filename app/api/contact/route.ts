// Cette route est utilisée pour envoyer un email depuis le formulaire de contact

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Vérification de la clé API Resend
if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY n'est pas définie dans les variables d'environnement");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Vérification de la clé API
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquante");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    // Récupération des données du formulaire
    const { name, email, subject, message } = await request.json();

    // Validation des champs requis
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // En mode test, Resend ne permet d'envoyer qu'à l'adresse email du compte
    // Pour la production, il faut vérifier un domaine sur resend.com/domains
    const contactEmail = process.env.CONTACT_EMAIL || "slimabidaproject@gmail.com";
    
    // En développement/test, utiliser l'adresse email du compte Resend
    // (Remplacez par votre adresse email associée au compte Resend)
    const recipientEmail = 
      process.env.NODE_ENV === "development" 
        ? process.env.RESEND_TEST_EMAIL || "slimdev20@gmail.com" // Email du compte Resend pour les tests
        : contactEmail; // Email de production

    // Envoi de l'email via Resend
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // Email d'envoi (à changer si vous avez un domaine vérifié)
      to: recipientEmail, // Email de réception (adapté selon l'environnement)
      subject: subject || "Nouveau message depuis le formulaire de contact",
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject || "Non spécifié"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        ${process.env.NODE_ENV === "development" 
          ? `<p><em>Note: Email envoyé en mode test. Le destinataire réel serait: ${contactEmail}</em></p>` 
          : ""}
      `,
    });

    // Vérification de la réponse
    if (response.error) {
      console.error("Erreur Resend:", response.error);
      
      // Message d'erreur plus explicite pour les erreurs de validation Resend
      if (response.error.statusCode === 403) {
        return NextResponse.json(
          { 
            error: "Limitation Resend: En mode test, vous ne pouvez envoyer qu'à votre adresse email de compte. Pour envoyer à d'autres adresses, vérifiez un domaine sur resend.com/domains"
          },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    // Retourner une réponse de succès
    return NextResponse.json(
      { message: "Email envoyé avec succès", id: response.data?.id },
      { status: 200 }
    );
  } catch (error) {
    // Logger l'erreur pour le débogage
    console.error("Erreur lors de l'envoi de l'email:", error);
    
    // Retourner un message d'erreur plus détaillé en développement
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.message
          : "Erreur serveur lors de l'envoi de l'email"
        : "Erreur serveur lors de l'envoi de l'email";
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
