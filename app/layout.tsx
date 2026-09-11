import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ygis6j347i");`}
        </Script>
        <SessionProvider>
        <LanguageProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
