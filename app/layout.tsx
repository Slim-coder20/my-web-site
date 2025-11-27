import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ConditionalLayout from "@/components/ConditionalLayout/ConditionalLayout";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Slim Abida ",
  description: "Site officiel de Slim Abida Project - Jazz Fusion",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <SessionProvider>
        <LanguageProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
