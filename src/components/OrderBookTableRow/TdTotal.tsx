import { FlashColorType, OrderBookColumn } from "@/types";
import { memo } from "react";
import Stack from "../Stack";

const PERCENT_BAR_COLORS: Record<FlashColorType, string> = {
  red: "bg-sell-size-bar",
  green: "bg-buy-size-bar",
};

export default memo(function TdTotal({
  row,
  themeColor,
}: {
  row: OrderBookColumn;
  themeColor: FlashColorType;
}) {
  return (
    <Stack className="relative w-[calc(100%-8px)] ml-auto">
      <p className="relative z-10">{row.total}</p>
      <div
        className={`${PERCENT_BAR_COLORS[themeColor]} absolute bottom-0 right-0 h-full top-0 z-1`}
        style={{
          width: `${row.percent}%`,
        }}
      />
    </Stack>
  );
});
