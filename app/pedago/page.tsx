"use client";

// Page de formation pour les bassistes
import Link from "next/link";
import styles from "./pedago.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Pedago() {
  const { t } = useLanguage();
  
  const courses = [
    {
      id: 1,
      title: t.pedago.courses.bass.title,
      description: t.pedago.courses.bass.description,
      icon: "🎸",
    },
    {
      id: 2,
      title: t.pedago.courses.arrangement.title,
      description: t.pedago.courses.arrangement.description,
      icon: "🎼",
    },
    {
      id: 3,
      title: t.pedago.courses.composition.title,
      description: t.pedago.courses.composition.description,
      icon: "✍️",
    },
  ];

  return (
    <div className={styles.pedagoContainer}>
      <section className={styles.pedagoSection}>
        <h1 className={styles.title}>{t.pedago.title}</h1>
        <p className={styles.description}>
          {t.pedago.description}
        </p>
        <div className={styles.coursesGrid}>
          {courses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseIcon}>{course.icon}</div>
              <div className={styles.courseInfo}>
                <h2 className={styles.courseTitle}>{course.title}</h2>
                <p className={styles.courseDescription}>{course.description}</p>
                <Link href="/contact" className={styles.contactButton}>
                  {t.pedago.contactMe}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
