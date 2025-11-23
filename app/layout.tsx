import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ConditionalLayout from "@/components/ConditionalLayout/ConditionalLayout";

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
        <LanguageProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
