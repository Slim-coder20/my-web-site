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
    if (!video) {
      console.warn("⚠️ Référence vidéo non disponible");
      return;
    }

    // Ne configurer les event listeners qu'une seule fois
    const handleError = (e: Event) => {
      const videoElement = e.target as HTMLVideoElement;
      const error = videoElement.error;
      const source = videoElement.querySelector("source");
      console.error("❌ Erreur vidéo d'arrière-plan:", {
        errorCode: error?.code,
        errorMessage: error?.message,
        networkState: videoElement.networkState,
        readyState: videoElement.readyState,
        src: source?.src,
        type: source?.type,
        currentSrc: videoElement.currentSrc,
      });

      // Afficher les codes d'erreur possibles
      if (error) {
        const errorMessages: { [key: number]: string } = {
          1: "MEDIA_ERR_ABORTED - Le chargement a été interrompu",
          2: "MEDIA_ERR_NETWORK - Erreur réseau",
          3: "MEDIA_ERR_DECODE - Erreur de décodage",
          4: "MEDIA_ERR_SRC_NOT_SUPPORTED - Format non supporté",
        };
        console.error(
          "Code d'erreur:",
          error.code,
          "-",
          errorMessages[error.code] || "Erreur inconnue"
        );
      }

      // Masquer la vidéo en cas d'erreur
      if (video.parentElement) {
        video.parentElement.style.display = "none";
      }
    };

    const handleLoadStart = () => {
      const source = video.querySelector("source");
      console.log("🎬 Début du chargement de la vidéo d'arrière-plan", {
        src: source?.src,
        type: source?.type,
      });
    };

    const handleLoadedMetadata = () => {
      console.log("✅ Métadonnées de la vidéo d'arrière-plan chargées", {
        duration: video.duration,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        currentSrc: video.currentSrc,
      });
    };

    const handleLoadedData = () => {
      console.log("✅ Données de la vidéo chargées", {
        duration: video.duration,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      });

      // Essayer de démarrer la lecture dès que les données sont chargées
      if (video.paused) {
        video.play().catch((error) => {
          console.warn(
            "⚠️ Impossible de démarrer la lecture automatiquement:",
            error
          );
        });
      }
    };

    const handleCanPlay = () => {
      console.log("✅ Vidéo d'arrière-plan prête à être lue", {
        readyState: video.readyState,
        networkState: video.networkState,
        paused: video.paused,
        currentTime: video.currentTime,
      });

      // Forcer la lecture - essayer plusieurs fois si nécessaire
      const tryPlay = async () => {
        try {
          // S'assurer que la vidéo est bien muette pour l'autoplay
          video.muted = true;
          video.volume = 0;

          await video.play();
          console.log(
            "▶️ Lecture de la vidéo d'arrière-plan démarrée avec succès"
          );

          // Vérifier que la vidéo joue bien
          if (video.paused) {
            console.warn("⚠️ La vidéo est toujours en pause après play()");
          } else {
            console.log("✅ Vidéo en cours de lecture");
          }
        } catch (error) {
          console.error("❌ Erreur lors de la lecture de la vidéo:", error);
          console.error("Détails de l'erreur:", {
            name: (error as Error).name,
            message: (error as Error).message,
          });

          // Ne pas masquer la vidéo, juste logger l'erreur
          // Certains navigateurs bloquent l'autoplay mais la vidéo peut être visible
        }
      };

      tryPlay();
    };

    const handleWaiting = () => {
      console.warn("⏳ Vidéo en attente de données");
    };

    const handleStalled = () => {
      console.warn("⚠️ Chargement de la vidéo bloqué");
    };

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("stalled", handleStalled);

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("stalled", handleStalled);
    };
  }, []); // Ne se déclenche qu'une seule fois au montage

  // Effet séparé pour mettre à jour la source de la vidéo
  useEffect(() => {
    const video = videoRef.current;

    if (!backgroundVideoUrl) {
      console.warn("⚠️ Aucune URL de vidéo d'arrière-plan fournie");
      return;
    }

    if (!video) {
      console.warn("⚠️ Référence vidéo non disponible");
      return;
    }

    // Éviter les rechargements inutiles si l'URL n'a pas changé
    if (currentUrlRef.current === backgroundVideoUrl) {
      console.log("ℹ️ URL de vidéo inchangée, pas de rechargement");
      return;
    }

    console.log("🔄 Mise à jour de la source vidéo:", {
      url: backgroundVideoUrl,
      type: backgroundVideoType,
    });

    const source = video.querySelector("source");
    if (source) {
      // Vérifier que l'URL est accessible avant de la définir
      console.log("🔗 Définition de la source:", {
        oldSrc: source.src,
        newSrc: backgroundVideoUrl,
        type: backgroundVideoType,
      });

      source.src = backgroundVideoUrl;
      if (backgroundVideoType) {
        source.type = backgroundVideoType;
      }

      // Marquer l'URL actuelle pour éviter les rechargements en boucle
      currentUrlRef.current = backgroundVideoUrl;

      // Note: On ne fait pas de fetch HEAD pour vérifier l'accessibilité car :
      // 1. Cela cause des erreurs CORS avec Supabase Storage en développement
      // 2. Le navigateur gère déjà les erreurs de chargement de vidéo via les event listeners
      // 3. Les event listeners (handleError, handleLoadStart, etc.) fournissent déjà les informations nécessaires

      // Utiliser un timeout pour éviter les boucles de re-rendu
      const timeoutId = setTimeout(() => {
        console.log("🔄 Rechargement de la vidéo avec la nouvelle source");
        video.load();

        // Vérifier l'état après le chargement
        setTimeout(() => {
          const source = video.querySelector("source");
          const container = video.parentElement;

          console.log("📊 État de la vidéo après chargement:", {
            networkState: video.networkState,
            readyState: video.readyState,
            currentSrc: video.currentSrc,
            paused: video.paused,
            muted: video.muted,
            volume: video.volume,
            duration: video.duration,
            currentTime: video.currentTime,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            sourceSrc: source?.src,
            sourceType: source?.type,
            containerDisplay: container
              ? window.getComputedStyle(container).display
              : "N/A",
            containerVisibility: container
              ? window.getComputedStyle(container).visibility
              : "N/A",
            videoDisplay: window.getComputedStyle(video).display,
            videoVisibility: window.getComputedStyle(video).visibility,
            error: video.error
              ? {
                  code: video.error.code,
                  message: video.error.message,
                }
              : null,
          });

          // Si la vidéo est en pause, essayer de la démarrer
          if (video.paused && video.readyState >= 2) {
            console.log(
              "🔄 Tentative de démarrage de la vidéo (elle est en pause)"
            );
            video.play().catch((error) => {
              console.error("❌ Impossible de démarrer la vidéo:", error);
            });
          }
        }, 1000);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      console.error("❌ Élément <source> non trouvé dans la vidéo");
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
          <h3 className={styles.heroSubtitle2}>{t.home.subtitle}</h3>
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
              crossOrigin={
                backgroundVideoUrl.includes("supabase.co")
                  ? "anonymous"
                  : undefined
              }
            >
              <source
                src={backgroundVideoUrl}
                type={backgroundVideoType || "video/mp4"}
              />
              {/* Message de fallback si la vidéo ne peut pas être chargée */}
              Votre navigateur ne supporte pas la lecture de vidéos.
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
          <p className={styles.sectionText}>{t.home.news.description}</p>
          <div className={styles.heroButtons}>
            <Link href="/news" className={styles.primaryButton}>
              {t.home.news.seeNews}
            </Link>
            <Link
              href="https://distrokid.com/hyperfollow/slimabida/the-beginnings?ref=release"
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
          <p className={styles.sectionText}>{t.home.about.description}</p>
          <Link href="/about" className={styles.linkButton}>
            {t.home.about.learnMore}
          </Link>
        </div>
      </section>

      {/* Section Music Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.music.title}</h2>
          <p className={styles.sectionText}>{t.home.music.description}</p>
          <Link href="/discographie" className={styles.linkButton}>
            {t.home.music.listenNow}
          </Link>
        </div>
      </section>
      {/* Section vidéos Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.videos.title}</h2>
          <p className={styles.sectionText}>{t.home.videos.description}</p>
          <Link href="/videos" className={styles.linkButton}>
            {t.home.videos.seeVideos}
          </Link>
        </div>
      </section>

      {/* Section Concerts Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.concerts.title}</h2>
          <p className={styles.sectionText}>{t.home.concerts.description}</p>
          <Link href="/concerts" className={styles.linkButton}>
            {t.home.concerts.seeDates}
          </Link>
        </div>
      </section>
      {/* Section Formation Preview */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{t.home.formation.title}</h2>
          <p className={styles.sectionText}>{t.home.formation.description}</p>
          <Link href="/pedago" className={styles.linkButton}>
            {t.home.formation.seeCourses}
          </Link>
        </div>
      </section>
    </div>
  );
}
