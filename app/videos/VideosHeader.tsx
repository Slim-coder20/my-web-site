"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./videos.module.css";

export default function VideosHeader() {
  const { t } = useLanguage();

  return (
    <>
      <h1 className={styles.title}>{t.videos.title}</h1>
      <p className={styles.description}>{t.videos.description}</p>
    </>
  );
}

