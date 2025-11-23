"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./checkout.module.css";

export default function CheckoutHeader() {
  const { t } = useLanguage();

  return (
    <h1 className={styles.title}>{t.checkout.title}</h1>
  );
}

