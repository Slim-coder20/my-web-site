"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Header.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/discographie", label: t.nav.music },
    { href: "/videos", label: t.nav.videos },
    { href: "/concerts", label: t.nav.concerts },
    { href: "/pedago", label: t.nav.pedago },
    { href: "/contact", label: t.nav.contact },
  ];
  // Fonction ppour changer la langue qu'on appelle dans le boutton de changement de langue // 
  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  // Création du menu burger pour les petits écrans //
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Nom de l'artiste en style manuscrit */}

        {/* Barre de navigation */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ""}`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                onClick={closeMenu}
                prefetch={false}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Séparateur visuel pour mobile */}
          <div className={styles.mobileSeparator}></div>
          {/* Bouton de changement de langue */}
          <button
            onClick={() => {
              toggleLanguage();
              // Ne pas fermer le menu pour permettre de voir le changement
            }}
            className={styles.languageButton}
            aria-label={`Switch to ${
              language === "fr" ? "English" : "Français"
            }`}
            title={`Switch to ${language === "fr" ? "English" : "Français"}`}
          >
            {language === "fr" ? "EN" : "FR"}
          </button>
        </nav>
        {/* Bouton burger pour les petits écrans */}
        <button
          className={`${styles.burgerButton} ${
            isMenuOpen ? styles.burgerOpen : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.burgerIcon}></span>
          <span className={styles.burgerIcon}></span>
          <span className={styles.burgerIcon}></span>
        </button>
      </div>
    </header>
  );
}
