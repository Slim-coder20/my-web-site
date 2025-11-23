"use client";

import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  videoType?: string | null;
  thumbnailUrl?: string | null;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
}

/**
 * Extrait l'ID d'une vidéo YouTube depuis différentes formats d'URL
 *
 * Formats supportés :
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Vérifie si l'URL est une vidéo YouTube
 */
function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/.test(url);
}

/**
 * Convertit une URL YouTube en URL embed
 */
function getYouTubeEmbedUrl(
  url: string,
  autoPlay: boolean,
  loop: boolean,
  muted: boolean
): string {
  const videoId = extractYouTubeId(url);
  if (!videoId) return url;

  // Construire l'URL embed avec les paramètres optionnels
  const params = new URLSearchParams();
  if (autoPlay) params.append("autoplay", "1");
  if (loop) params.append("loop", "1");
  if (muted) params.append("mute", "1");

  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${
    queryString ? `?${queryString}` : ""
  }`;
}

export default function VideoPlayer({
  videoUrl,
  videoType,
  thumbnailUrl,
  className,
  controls = false,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Si c'est YouTube, on n'a pas besoin des event listeners pour la balise video
    if (isYouTubeUrl(videoUrl)) return;

    const video = videoRef.current;
    if (!video) return;

    console.log(`🎥 Tentative de chargement de la vidéo: ${videoUrl}`);

    let loadTimeout: NodeJS.Timeout | null = null;

    const handleLoadStart = () => {
      console.log(`✅ Début du chargement: ${videoUrl}`);
      // Timeout de 30 secondes pour détecter si la vidéo ne se charge pas
      loadTimeout = setTimeout(() => {
        if (video.readyState < 2) {
          console.warn(
            `⏱️ Timeout: La vidéo ${videoUrl} ne se charge pas après 30 secondes`
          );
        }
      }, 30000);
    };

    const handleLoadedMetadata = () => {
      console.log(`✅ Métadonnées chargées: ${videoUrl}`, {
        duration: video.duration,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      });
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
      }
    };

    const handleCanPlay = () => {
      console.log(`✅ Vidéo prête à être lue: ${videoUrl}`);
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
      }
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          const percentLoaded = (bufferedEnd / duration) * 100;
          console.log(
            `📊 Progression: ${percentLoaded.toFixed(
              1
            )}% chargé pour ${videoUrl}`
          );
        }
      }
    };

    const handleError = () => {
      const error = video.error;
      console.error(`❌ Erreur lors du chargement de la vidéo: ${videoUrl}`, {
        errorCode: error?.code,
        errorMessage: error?.message,
        networkState: video.networkState,
        readyState: video.readyState,
      });
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
      }
      // Afficher un message d'erreur visuel si nécessaire
      if (video.parentElement) {
        video.parentElement.style.backgroundColor = "#1a1a1a";
      }
    };

    const handleStalled = () => {
      console.warn(`⚠️ Chargement bloqué: ${videoUrl}`);
    };

    const handleWaiting = () => {
      console.warn(`⚠️ En attente de données: ${videoUrl}`);
    };

    // Ajouter tous les event listeners
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("error", handleError);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("waiting", handleWaiting);

    return () => {
      if (loadTimeout) {
        clearTimeout(loadTimeout);
      }
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("error", handleError);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("waiting", handleWaiting);
    };
  }, [videoUrl, autoPlay, loop, muted]);

  // Si c'est une URL YouTube, utiliser un iframe
  if (isYouTubeUrl(videoUrl)) {
    const embedUrl = getYouTubeEmbedUrl(videoUrl, autoPlay, loop, muted);
    return (
      <div
        className={className}
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
        }}
      >
        <iframe
          src={embedUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        />
      </div>
    );
  }

  // Sinon, utiliser la balise video HTML5 pour les vidéos hébergées
  // Normaliser l'URL : si c'est une URL absolue (http/https), l'utiliser telle quelle
  // Sinon, si c'est une URL relative, s'assurer qu'elle commence par /
  const normalizedUrl =
    videoUrl.startsWith("http://") || videoUrl.startsWith("https://")
      ? videoUrl
      : videoUrl.startsWith("/")
      ? videoUrl
      : `/${videoUrl}`;

  return (
    <video
      ref={videoRef}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      className={className}
      preload="none"
      poster={thumbnailUrl || undefined}
    >
      <source src={normalizedUrl} type={videoType || "video/mp4"} />
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  );
}
