"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "./UserLayout.module.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
  }, [status, router]);

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
    router.refresh();
  };

  if (status === "loading") {
    return (
      <div className={styles.loadingContainer}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!session || status !== "authenticated") {
    return null;
  }

  const navItems = [
    { href: "/user/dashboard", label: "Tableau de bord" },
    { href: "/user/profile", label: "Mon Profil" },
    { href: "/user/appointments", label: "Mes Rendez-vous" },
  ];

  return (
    <div className={styles.userLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Mon Espace</h2>
        </div>
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                pathname === item.href ? styles.navLinkActive : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Déconnexion
          </button>
        </div>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

