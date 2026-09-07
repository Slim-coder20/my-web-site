import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ConditionalLayout from "@/components/ConditionalLayout/ConditionalLayout";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-family",
  display: "swap",
});

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
    <html lang="fr" className={montserrat.variable}>
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
