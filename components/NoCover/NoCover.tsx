"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface NoCoverProps {
  className?: string;
  section?: "discographie" | "checkout";
}

export default function NoCover({
  className,
  section = "discographie",
}: NoCoverProps) {
  const { t } = useLanguage();

  const text =
    section === "checkout" ? t.checkout.noCover : t.discographie.noCover;

  return <span className={className}>{text}</span>;
}

