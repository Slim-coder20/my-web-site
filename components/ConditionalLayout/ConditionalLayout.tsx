"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isUserPage = pathname?.startsWith("/user");

  // Masquer Header et Footer pour les pages admin et user
  if (isAdminPage || isUserPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 m-0 p-0">{children}</main>
      <Footer />
    </>
  );
}

