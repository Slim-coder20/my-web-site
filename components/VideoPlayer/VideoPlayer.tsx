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
  preload = "metadata",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log(`🎥 Tentative de chargement de la vidéo: ${videoUrl}`);

    const handleLoadStart = () => {
      console.log(`✅ Début du chargement: ${videoUrl}`);
    };

    const handleLoadedMetadata = () => {
      console.log(`✅ Métadonnées chargées: ${videoUrl}`, {
        duration: video.duration,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      });
    };

    const handleCanPlay = () => {
      console.log(`✅ Vidéo prête à être lue: ${videoUrl}`);
    };

    const handleError = (e: Event) => {
      const error = video.error;
      console.error(`❌ Erreur lors du chargement de la vidéo: ${videoUrl}`, {
        errorCode: error?.code,
        errorMessage: error?.message,
        networkState: video.networkState,
        readyState: video.readyState,
      });
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
    video.addEventListener("error", handleError);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("waiting", handleWaiting);

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("waiting", handleWaiting);
    };
  }, [videoUrl]);

  // Normaliser l'URL pour s'assurer qu'elle commence par /
  const normalizedUrl = videoUrl.startsWith("/") ? videoUrl : `/${videoUrl}`;

  return (
    <video
      ref={videoRef}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      className={className}
      preload={preload}
      poster={thumbnailUrl || undefined}
      crossOrigin="anonymous"
    >
      <source src={normalizedUrl} type={videoType || "video/mp4"} />
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  );
}
