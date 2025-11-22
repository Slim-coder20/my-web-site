"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  translations,
  type Language,
  type Translations,
} from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Toujours commencer par "fr" pour éviter les erreurs d'hydratation
  // Le serveur et le client doivent avoir la même valeur initiale
  const [language, setLanguageState] = useState<Language>("fr");

  // Charger la langue depuis localStorage après le montage (côté client uniquement)
  // Note: setState dans useEffect est nécessaire ici pour éviter les erreurs d'hydratation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage === "fr" || savedLanguage === "en") {
      setLanguageState(savedLanguage);
      if (typeof document !== "undefined") {
        document.documentElement.lang = savedLanguage;
      }
    } else {
      // Si aucune langue sauvegardée, utiliser "fr" par défaut
      if (typeof document !== "undefined") {
        document.documentElement.lang = "fr";
      }
    }
  }, []);

  // Mettre à jour l'attribut lang du HTML quand la langue change
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Sauvegarder la langue dans localStorage quand elle change
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
