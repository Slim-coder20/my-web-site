"use client";

// Page de formation pour les bassistes
import Link from "next/link";
import styles from "./pedago.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Pedago() {
  const { t } = useLanguage();

  return (
    <div className={styles.pedagoContainer}>
      <section className={styles.pedagoSection}>
        <h1 className={styles.title}>{t.pedago.title}</h1>
        <p className={styles.description}>
          {t.pedago.description}
        </p>
        <div className={styles.coursesGrid}>
          <div className={styles.courseCard}>
            <div className={styles.courseIcon}>🎸</div>
            <div className={styles.courseInfo}>
              <h2 className={styles.courseTitle}>{t.pedago.courses.bass.title}</h2>
              <p className={styles.courseDescription}>
                {t.pedago.courses.bass.description}
              </p>
              <Link href="/register" className={styles.contactButton}>
                {t.pedago.contactMe}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
