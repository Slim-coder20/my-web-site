"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./LanguageButtonMobile.module.css";

export default function LanguageButtonMobile() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <div className={styles.languageButtonContainer}>
      <div className={styles.separator}></div>
      <button
        onClick={toggleLanguage}
        className={styles.languageButton}
        aria-label={`Switch to ${language === "fr" ? "English" : "Français"}`}
        title={`Switch to ${language === "fr" ? "English" : "Français"}`}
      >
        {language === "fr" ? "EN" : "FR"}
      </button>
    </div>
  );
}
