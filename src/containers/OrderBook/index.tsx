import Divider from "@/components/Divider";
import Stack from "@/components/Stack";
import Quotes from "@/modules/Quotes";
import useOrderBook from "./useOrderBook";

export default function OrderBook() {
  const { subscribeData, mockDelay, currentPrice } = useOrderBook();
  return (
    <Stack>
      <Stack className="py-2.5 px-hor-container">
        <h1 className="text-2xl font-bold" onClick={mockDelay}>
          Order Book
        </h1>
      </Stack>
      <Divider />
      <Stack className="py-1.5">
        <Quotes subscribeData={subscribeData} currentPrice={currentPrice} />
      </Stack>
    </Stack>
  );
}
