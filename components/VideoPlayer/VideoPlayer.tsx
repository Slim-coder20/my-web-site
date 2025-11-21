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

    const handleError = (e: Event | string) => {
      const errorEvent = typeof e === "string" ? new Event(e) : e;
      console.error(
        `Erreur lors du chargement de la vidéo: ${videoUrl}`,
        errorEvent
      );
      // Afficher un message d'erreur visuel si nécessaire
      if (video.parentElement) {
        video.parentElement.style.backgroundColor = "#1a1a1a";
      }
    };

    // Utiliser addEventListener au lieu de onerror pour éviter les problèmes de sérialisation
    video.addEventListener("error", handleError as EventListener);

    return () => {
      video.removeEventListener("error", handleError as EventListener);
    };
  }, [videoUrl]);

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
    >
      <source src={videoUrl} type={videoType || "video/mp4"} />
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  );
}
