"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./contact.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactForm() {
  // Initialisation du router pour la navigation
  const router = useRouter();
  const { t } = useLanguage();

  // États pour gérer le formulaire
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(t.contact.subjectOptions.contact);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Appel à l'API route pour envoyer l'email
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.contact.messages.error);
      }

      // Succès : réinitialiser le formulaire et afficher un message et ajout d'un settimeout pour rediriger vers la page d'accueil après 3 secondes
      setStatus({
        type: "success",
        message: t.contact.messages.success,
      });
      setTimeout(() => {
        // redirection vers la page d'accueil
        router.push("/");
      }, 3000);
      // réinitialisation du formulaire
      setName("");
      setEmail("");
      setSubject(t.contact.subjectOptions.contact); // réinitialisation du sujet par défaut
      setMessage(""); // réinitialisation du message
    } catch (error) {
      // Erreur : afficher un message d'erreur
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : t.contact.messages.errorGeneric,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.contactFormGroup}>
          <label htmlFor="name">{t.contact.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.contactFormInput}
            required
            disabled={loading}
          />
        </div>
        <div className={styles.contactFormGroup}>
          <label htmlFor="email">{t.contact.email}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.contactFormInput}
            required
            disabled={loading}
          />
        </div>
        <div className={styles.contactFormGroup}>
          <label htmlFor="subject">{t.contact.subject}</label>
          <select
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={styles.contactFormInput}
            disabled={loading}
          >
            <option value={t.contact.subjectOptions.contact}>
              {t.contact.subjectOptions.contact}
            </option>
            <option value={t.contact.subjectOptions.collaboration}>
              {t.contact.subjectOptions.collaboration}
            </option>
            <option value={t.contact.subjectOptions.concert}>
              {t.contact.subjectOptions.concert}
            </option>
            <option value={t.contact.subjectOptions.press}>
              {t.contact.subjectOptions.press}
            </option>
            <option value={t.contact.subjectOptions.training}>
              {t.contact.subjectOptions.training}
            </option>
            <option value={t.contact.subjectOptions.other}>
              {t.contact.subjectOptions.other}
            </option>
          </select>
        </div>
        <div className={styles.contactFormGroup}>
          <label htmlFor="message">{t.contact.message}</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.contactTextarea}
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={styles.contactFormButton}
          disabled={loading}
        >
          {loading ? t.contact.sending : t.contact.send}
        </button>
        {status && (
          <div
            className={
              status.type === "success"
                ? styles.statusMessageSuccess
                : styles.statusMessageError
            }
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
