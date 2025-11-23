"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./concerts.module.css";

export default function ConcertsEmptyState() {
  const { t } = useLanguage();

  return (
    <div className={styles.emptyState}>
      <p>{t.concerts.noConcerts}</p>
    </div>
  );
}
