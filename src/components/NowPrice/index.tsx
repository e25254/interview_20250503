import { memo } from "react";
import useNowPrice from "@/components/NowPrice/useNowPrice";
import Stack from "@/components/Stack";
import { LastPriceJudgeType, OrderBookFormatNowPriceData } from "@/types";
import isEqual from "lodash/isEqual";
import Arrow from "@/components/Icon/Arrow";
type NowPriceProps = {
  priceObj: OrderBookFormatNowPriceData;
};

export default memo(
  function NowPrice({ priceObj }: NowPriceProps) {
    const { lastPriceJudge, price } = useNowPrice(priceObj);
    const priceClassName: { [key in LastPriceJudgeType]: string } = {
      up: "text-sell-price bg-sell-size-bar",
      down: "text-buy-price bg-buy-size-bar",
      equal: "text-text-default bg-now-price-equal",
    };
    const svgClassName: { [key in LastPriceJudgeType]: string } = {
      up: "rotate-180",
      down: "",
      equal: "hidden",
    };
    return (
      <Stack
        className={`justify-center items-center h-11.5 ${priceClassName[lastPriceJudge]}`}
      >
        <Stack className="font-bold text-2xl relative">
          {price}
          <Stack
            className={`w-6 h-6 absolute right-[-28px] top-1/2 -translate-y-1/2 ${svgClassName[lastPriceJudge]}`}
          >
            <Arrow />
          </Stack>
        </Stack>
      </Stack>
    );
  },
  (prevProps, nextProps) => {
    const { priceObj: prevPriceObj } = prevProps;
    const { priceObj: nextPriceObj } = nextProps;
    return isEqual(prevPriceObj, nextPriceObj);
  }
);
