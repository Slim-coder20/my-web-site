import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
          <Header />
          <main className="flex-1 m-0 p-0">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
