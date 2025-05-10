import type { FlashColorType, OrderBookColumn } from "@/types";
import { memo } from "react";

const PRICE_COLORS: Record<FlashColorType, string> = {
  red: "text-sell-price",
  green: "text-buy-price",
};

export default memo(function TdPrice({
  row,
  themeColor,
}: {
  row: OrderBookColumn;
  themeColor: FlashColorType;
}) {
  return <p className={PRICE_COLORS[themeColor]}>{row.price}</p>;
});
