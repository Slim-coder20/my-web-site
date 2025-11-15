import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/discographie", label: "Music" },
    { href: "/concerts", label: "shows" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className={styles.footer}>
      {/* Ligne de séparation horizontale */}
      <div className={styles.separator}></div>

      {/* Liens de navigation */}
      <nav className={styles.footerNav}>
        {navLinks.map((link, index) => (
          <span key={link.href}>
            <Link href={link.href} className={styles.footerLink}>
              {link.label}
            </Link>
            {index < navLinks.length - 1 && (
              <span className={styles.separatorBar}> | </span>
            )}
          </span>
        ))}
      </nav>

      {/* Ligne de séparation horizontale */}
      <div className={styles.separator}></div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>Website and Content © Slim Abida {currentYear}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

