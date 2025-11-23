"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./music.module.css";

export default function DiscographieHeader() {
  const { t } = useLanguage();

  return (
    <>
      <h1 className={styles.title}>{t.discographie.title}</h1>
      <p className={styles.description}>{t.discographie.description}</p>
    </>
  );
}
