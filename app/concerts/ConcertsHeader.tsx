"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./concerts.module.css";

export default function ConcertsHeader() {
  const { t } = useLanguage();

  return (
    <>
      <h1 className={styles.concertsTitle}>{t.concerts.title}</h1>
      <p className={styles.concertsDescription}>{t.concerts.description}</p>
    </>
  );
}

