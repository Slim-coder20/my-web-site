"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Nom de l'artiste en style manuscrit */}
      

        {/* Barre de navigation */}
        <nav className={styles.nav}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
