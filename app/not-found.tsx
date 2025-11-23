"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./not-found.module.css";

/**
 * Page 404 - Page non trouvée
 * 
 * Cette page s'affiche automatiquement quand Next.js ne trouve pas la route demandée.
 * Dans Next.js 13+ App Router, le fichier doit s'appeler "not-found.tsx" et être
 * directement dans le dossier "app/".
 * 
 * Pour déclencher cette page manuellement dans un composant :
 *   import { notFound } from 'next/navigation';
 *   notFound();
 */
export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>{t.notFound.title}</h1>
      <p className={styles.notFoundDescription}>{t.notFound.description}</p>
      <Link href="/" className={styles.homeButton}>
        {t.notFound.homeButton}
      </Link>
    </div>
  );
}
