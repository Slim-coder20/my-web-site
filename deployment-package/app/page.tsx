"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Section Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Slim Abida</h1>
          <h3 className={styles.heroSubtitle2}>
            Bassiste / Compositeur / Arrangeur
          </h3>
          <p className={styles.heroSubtitle}>Contrast Nouvel album </p>
          <div className={styles.heroButtons}>
            <Link href="/discographie" className={styles.primaryButton}>
              Découvrir la Musique
            </Link>
            <Link href="/concerts" className={styles.secondaryButton}>
              Prochains Concerts
            </Link>
          </div>
        </div>
        {/* Vidéo en arrière-plan si disponible */}
        <div className={styles.videoContainer}>
          <video autoPlay loop muted playsInline className={styles.heroVideo}>
            <source src="/videos/video-album.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay}></div>
        </div>
      </section>

      {/* Section News */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>News </h2>
          <p className={styles.sectionText}>
            Découvrez les dernières nouvelles de Slim Abida. Contrast nouvel
            album N&apos;hésitez pas à nous suivre sur les réseaux sociaux et à
            nous soutenir en contibuant à notre Crowdfunding.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/news" className={styles.primaryButton}>
              Voir les news →
            </Link>
            <Link
              href="https://fr.ulule.com/contrast-crowfunding/coming-soon "
              className={styles.secondaryButton}
              target="_blank"
            >
              Soutenir le projet →
            </Link>
          </div>
        </div>
      </section>
      {/* Section About Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>À Propos</h2>
          <p className={styles.sectionText}>
            Découvrez l&apos;univers musical unique de Slim Abida, où le jazz
            rencontre la fusion dans une expérience sonore captivante. Une
            exploration artistique qui transcende les genres et les frontières.
          </p>
          <Link href="/about" className={styles.linkButton}>
            En savoir plus →
          </Link>
        </div>
      </section>

      {/* Section Music Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Musique</h2>
          <p className={styles.sectionText}>
            Plongez dans la discographie de Slim Abida et explorez des
            compositions originales qui mêlent harmonieusement les influences
            jazz et fusion.
          </p>
          <Link href="/discographie" className={styles.linkButton}>
            Écouter maintenant →
          </Link>
        </div>
      </section>
      {/* Section vidéos Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Vidéos</h2>
          <p className={styles.sectionText}>
            Découvrez les vidéos de Slim Abida et profitez de ses performances
            live.
          </p>
          <Link href="/videos" className={styles.linkButton}>
            Voir les vidéos →
          </Link>
        </div>
      </section>

      {/* Section Concerts Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Concerts</h2>
          <p className={styles.sectionText}>
            Ne manquez pas les prochaines dates de concert et vivez
            l&apos;expérience live de Slim Abida Project.
          </p>
          <Link href="/concerts" className={styles.linkButton}>
            Voir les dates →
          </Link>
        </div>
      </section>
      {/* Section Formation Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Formation</h2>
          <p className={styles.sectionText}>
            Découvrez les cours de formation de Slim Abida.
          </p>
          <Link href="/pedago" className={styles.linkButton}>
            Voir les cours →
          </Link>
        </div>
      </section>
    </div>
  );
}
