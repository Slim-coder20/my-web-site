import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration optimisée pour Vercel
  // Note: Les configurations o2switch (distDir: "build", workerThreads: false, cpus: 1)
  // ont été retirées car Vercel gère automatiquement le build et n'a pas ces limitations

  images: {
    // Vercel optimise automatiquement les images, mais on garde unoptimized: true
    // pour les images locales qui ne peuvent pas être optimisées
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
