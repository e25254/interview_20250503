import { useMemo, useRef } from "react";
import type { LastPriceJudgeType, OrderBookFormatNowPriceData } from "@/types";
import { formatNumber } from "@/utils";
export default function useNowPrice(priceObj: OrderBookFormatNowPriceData) {
  const lastPriceObj = useRef<OrderBookFormatNowPriceData>({
    price: null,
    timestamp: null,
  });

  const lastPriceJudge: LastPriceJudgeType = useMemo(() => {
    if (!priceObj.price || !priceObj.timestamp) return "equal";
    if (!lastPriceObj.current.price) {
      lastPriceObj.current = priceObj;
      return "equal";
    }
    switch (true) {
      case lastPriceObj.current.price < priceObj.price:
        lastPriceObj.current = priceObj;
        return "up";
      case lastPriceObj.current.price > priceObj.price:
        lastPriceObj.current = priceObj;
        return "down";
      default:
        lastPriceObj.current = priceObj;
        return "equal";
    }
  }, [priceObj]);

  const price = useMemo(() => formatNumber(priceObj.price) || "-", [priceObj]);

  return {
    lastPriceJudge,
    price,
  };
}
