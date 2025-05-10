import { FlashColorType, OrderBookColumn } from "@/types";
import { useEffect, useRef, useState } from "react";

type SizeFlash = FlashColorType | null;

export default function useTdSize(row: OrderBookColumn) {
  const [sizeFlash, setSizeFlash] = useState<SizeFlash>(null);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const lastPrice = useRef<string | null>(null);
  const lastSize = useRef<string | null>(null);
  useEffect(() => {
    if (lastPrice.current !== row.price) {
      lastSize.current = row.size;
      lastPrice.current = row.price;
      return;
    }
    if (!lastSize.current) return;
    const timer: NodeJS.Timeout = setTimeout(() => {
      setSizeFlash(null);
    }, 300);
    if (row.size > lastSize.current) {
      setSizeFlash("red");
      setAnimationKey((prev) => prev + 1);
    } else if (row.size < lastSize.current) {
      setSizeFlash("green");
      setAnimationKey((prev) => prev + 1);
    }
    lastSize.current = row.size;
    lastPrice.current = row.price;
    return () => clearTimeout(timer);
  }, [row]);
  return { sizeFlash, animationKey };
}
