import { memo } from "react";
import useNowPrice from "@/components/NowPrice/useNowPrice";
import Stack from "@/components/Stack";

type NowPriceProps = {
  price: number;
};

export default memo(function NowPrice({ price }: NowPriceProps) {
  const { lastPriceJudge } = useNowPrice(price);
  console.log("lastPriceJudge", lastPriceJudge);
  return <Stack className="justify-center items-center h-11.5">{price}</Stack>;
});
