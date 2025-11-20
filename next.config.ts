import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour o2switch (évite les erreurs de build)
  distDir: "build",
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  images: {
    // Désactiver l'optimisation d'images pour les fichiers locaux en production
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
      },
      {
        protocol: "https",
        hostname: "www.paniermusique.fr",
      },
      {
        protocol: "https",
        hostname: "static.fnac-static.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
