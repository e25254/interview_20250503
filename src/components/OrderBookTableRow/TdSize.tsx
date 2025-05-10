import { OrderBookColumn } from "@/types";
import { memo } from "react";
import useTdSize from "./useTdSize";

export default memo(function TdSize({ row }: { row: OrderBookColumn }) {
  const { sizeFlash, animationKey } = useTdSize(row);
  return (
    <p
      key={animationKey}
      className={`${sizeFlash ? `flash-animation-${sizeFlash}` : ""}`}
    >
      {row.size}
    </p>
  );
});
