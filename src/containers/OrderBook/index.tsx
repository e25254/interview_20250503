import Divider from "@/components/Divider";
import Stack from "@/components/Stack";
import Quotes from "@/modules/Quotes";
export default function OrderBook() {
  return (
    <Stack>
      <Stack className="py-4 px-hor-container">
        <h1 className="text-md font-bold">Order Book</h1>
      </Stack>
      <Divider />
      <Stack className="px-hor-container">
        <Quotes />
      </Stack>
    </Stack>
  );
}
