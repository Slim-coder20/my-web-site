"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./checkout.module.css";

interface CheckoutSectionTitleProps {
  type: "selectedAlbum" | "orderInfo";
}

export default function CheckoutSectionTitle({
  type,
}: CheckoutSectionTitleProps) {
  const { t } = useLanguage();

  return (
    <h2 className={styles.sectionTitle}>
      {type === "selectedAlbum"
        ? t.checkout.selectedAlbum
        : t.checkout.orderInfo}
    </h2>
  );
}

