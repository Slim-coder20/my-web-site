"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./music.module.css";

export default function DiscographieEmptyState() {
  const { t } = useLanguage();

  return (
    <div className={styles.emptyState}>
      <p>{t.discographie.noAlbums}</p>
    </div>
  );
}
