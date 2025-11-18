// Page de formation pour les bassistes
import Link from "next/link";
import styles from "./pedago.module.css";

export default function Pedago() {
  const courses = [
    {
      id: 1,
      title: "Basse Instrument",
      description:
        "Apprenez la basse électrique avec Slim Abida. Cours personnalisés adaptés à votre niveau, de débutant à avancé. Technique, groove, harmonie et improvisation.",
      icon: "🎸",
    },
    {
      id: 2,
      title: "Arrangement",
      description:
        "Maîtrisez l'art de l'arrangement musical. Apprenez à orchestrer vos compositions, créer des textures sonores et développer votre identité musicale.",
      icon: "🎼",
    },
    {
      id: 3,
      title: "Composition",
      description:
        "Développez vos compétences en composition. De l'idée initiale à la réalisation complète, explorez les techniques de création musicale et d'écriture.",
      icon: "✍️",
    },
  ];

  return (
    <div className={styles.pedagoContainer}>
      <section className={styles.pedagoSection}>
        <h1 className={styles.title}>Formation</h1>
        <p className={styles.description}>
          Découvrez les cours de formation de Slim Abida. Des cours
          personnalisés pour développer vos compétences musicales.
        </p>
        <div className={styles.coursesGrid}>
          {courses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseIcon}>{course.icon}</div>
              <div className={styles.courseInfo}>
                <h2 className={styles.courseTitle}>{course.title}</h2>
                <p className={styles.courseDescription}>{course.description}</p>
                <Link href="/contact" className={styles.contactButton}>
                  Me contacter
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
