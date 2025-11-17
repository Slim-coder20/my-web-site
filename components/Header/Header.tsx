"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "ACCUEIL" },
    { href: "/about", label: "BIO" },
    { href: "/discographie", label: "MUSIC" },
    { href: "/videos", label: "VIDEOS" },
    { href: "/concerts", label: "CONCERTS" },
    { href: "/contact", label: "CONTACT" },
  ];

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
              >
                {link.label}
              </Link>
            );
          })}
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
