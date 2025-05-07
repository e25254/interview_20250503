import Divider from "@/components/Divider";
import Stack from "@/components/Stack";
import Quotes from "@/modules/Quotes";
export default function OrderBook() {
  return (
    <Stack>
      <Stack className="py-2 px-hor-container">
        <h1 className="text-2xl font-bold">Order Book</h1>
      </Stack>
      <Divider />
      <Stack className="py-2">
        <Quotes />
      </Stack>
    </Stack>
  );
}
