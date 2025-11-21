"use client";

import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import styles from "./videos.module.css";

interface Video {
  id: number;
  title: string;
  description: string | null;
  duration: number | null;
  videoUrl: string;
  videoType: string | null;
  thumbnailUrl: string | null;
  createdAt: Date;
}

interface VideosClientProps {
  videos: Video[];
  formatDuration: (seconds: number | null | undefined) => string;
}

export default function VideosClient({
  videos,
  formatDuration,
}: VideosClientProps) {
  if (videos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Aucune vidéo disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className={styles.videosGrid}>
      {videos.map((video) => (
        <div className={styles.videoCard} key={video.id}>
          <div className={styles.videoFrame}>
            <VideoPlayer
              videoUrl={video.videoUrl}
              videoType={video.videoType}
              thumbnailUrl={video.thumbnailUrl}
              className={styles.video}
              controls
              preload="metadata"
            />
          </div>
          <div className={styles.videoInfo}>
            <h3 className={styles.videoTitle}>{video.title}</h3>
            {video.description && (
              <p className={styles.videoDescription}>{video.description}</p>
            )}
            {video.duration && (
              <span className={styles.videoDuration}>
                Durée: {formatDuration(video.duration)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

