import { useMemo, useRef } from "react";
import type { LastPriceJudgeType } from "@/types";
export default function useNowPrice(price: number) {
  const lastPrice = useRef<number | null>(null);

  const lastPriceJudge: LastPriceJudgeType = useMemo(() => {
    if (lastPrice.current === null) return "equal";
    const result = lastPrice.current < price ? "up" : "down";
    lastPrice.current = price;
    return result;
  }, [price]);

  return {
    lastPriceJudge,
  };
}
