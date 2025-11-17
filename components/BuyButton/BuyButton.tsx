"use client";

import { useRouter } from "next/navigation";
import styles from "./BuyButton.module.css";

interface BuyButtonProps {
  productId: number;
  productTitle: string;
}

export default function BuyButton({ productId }: BuyButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/checkout/${productId}`);
  };

  return (
    <button className={styles.buyButton} onClick={handleClick}>
      Acheter
    </button>
  );
}
