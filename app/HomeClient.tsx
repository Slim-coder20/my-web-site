"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomeClientProps {
  backgroundVideoUrl: string | null;
  backgroundVideoType: string | null;
}

export default function HomeClient({
  backgroundVideoUrl,
  backgroundVideoType,
}: HomeClientProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentUrlRef = useRef<string | null>(null);
  const nextSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ne configurer les event listeners qu'une seule fois
    const handleError = (e: Event) => {
      console.warn("La vidéo en arrière-plan n'a pas pu être chargée:", e);
      // Masquer la vidéo en cas d'erreur
      if (video.parentElement) {
        video.parentElement.style.display = "none";
      }
    };

    const handleCanPlay = () => {
      // La vidéo est prête à être lue
      video.play().catch((error) => {
        console.warn("Erreur lors de la lecture de la vidéo:", error);
        // Si la lecture échoue, masquer la vidéo
        if (video.parentElement) {
          video.parentElement.style.display = "none";
        }
      });
    };

    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []); // Ne se déclenche qu'une seule fois au montage

  // Effet séparé pour mettre à jour la source de la vidéo
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !backgroundVideoUrl) return;

    // Éviter les rechargements inutiles si l'URL n'a pas changé
    if (currentUrlRef.current === backgroundVideoUrl) {
      return;
    }

    const source = video.querySelector("source");
    if (source) {
      source.src = backgroundVideoUrl;
      if (backgroundVideoType) {
        source.type = backgroundVideoType;
      }
      // Marquer l'URL actuelle pour éviter les rechargements en boucle
      currentUrlRef.current = backgroundVideoUrl;

      // Utiliser un timeout pour éviter les boucles de re-rendu
      const timeoutId = setTimeout(() => {
        video.load();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [backgroundVideoUrl, backgroundVideoType]);

  // Fonction pour scroller vers la section suivante
  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback : scroller de la hauteur de la fenêtre
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* Section Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t.home.title}</h1>
          <h3 className={styles.heroSubtitle2}>
            {t.home.subtitle}
          </h3>
          <p className={styles.heroSubtitle}>{t.home.subtitle2}</p>
          <div className={styles.heroButtons}>
            <Link href="/discographie" className={styles.primaryButton}>
              {t.home.discoverMusic}
            </Link>
            <Link href="/concerts" className={styles.secondaryButton}>
              {t.home.upcomingConcerts}
            </Link>
          </div>
        </div>
        {/* Vidéo en arrière-plan si disponible */}
        {backgroundVideoUrl && (
          <div className={styles.videoContainer}>
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className={styles.heroVideo}
              preload="auto"
            >
              <source
                src={backgroundVideoUrl}
                type={backgroundVideoType || "video/mp4"}
              />
            </video>
            <div className={styles.videoOverlay}></div>
          </div>
        )}
        {/* Icône de flèche pour indiquer de scroller */}
        <button
          onClick={scrollToNextSection}
          className={styles.scrollArrow}
          aria-label="Scroller vers le contenu"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>

      {/* Section News */}
      <section ref={nextSectionRef} className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.news.title}</h2>
          <p className={styles.sectionText}>
            {t.home.news.description}
          </p>
          <div className={styles.heroButtons}>
            <Link href="/news" className={styles.primaryButton}>
              {t.home.news.seeNews}
            </Link>
            <Link
              href="https://fr.ulule.com/contrast-crowfunding/coming-soon "
              className={styles.secondaryButton}
              target="_blank"
            >
              {t.home.news.supportProject}
            </Link>
          </div>
        </div>
      </section>
      {/* Section About Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.about.title}</h2>
          <p className={styles.sectionText}>
            {t.home.about.description}
          </p>
          <Link href="/about" className={styles.linkButton}>
            {t.home.about.learnMore}
          </Link>
        </div>
      </section>

      {/* Section Music Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.music.title}</h2>
          <p className={styles.sectionText}>
            {t.home.music.description}
          </p>
          <Link href="/discographie" className={styles.linkButton}>
            {t.home.music.listenNow}
          </Link>
        </div>
      </section>
      {/* Section vidéos Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.videos.title}</h2>
          <p className={styles.sectionText}>
            {t.home.videos.description}
          </p>
          <Link href="/videos" className={styles.linkButton}>
            {t.home.videos.seeVideos}
          </Link>
        </div>
      </section>

      {/* Section Concerts Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.concerts.title}</h2>
          <p className={styles.sectionText}>
            {t.home.concerts.description}
          </p>
          <Link href="/concerts" className={styles.linkButton}>
            {t.home.concerts.seeDates}
          </Link>
        </div>
      </section>
      {/* Section Formation Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.formation.title}</h2>
          <p className={styles.sectionText}>
            {t.home.formation.description}
          </p>
          <Link href="/pedago" className={styles.linkButton}>
            {t.home.formation.seeCourses}
          </Link>
        </div>
      </section>
    </div>
  );
}
