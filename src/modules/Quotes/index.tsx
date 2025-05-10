import Table from "@/components/Table";
import Stack from "@/components/Stack";
import NowPrice from "@/components/NowPrice";
import type {
  ColumnConfig,
  OrderBookColumn,
  OrderBookFormatNowPriceData,
  OrderBookFormatSubscribeData,
} from "@/types";
import OrderBookTableRow from "@/components/OrderBookTableRow";

const columns: ColumnConfig[] = [
  { key: "price", title: "Price(USD)", width: "32%", align: "left" },
  { key: "size", title: "Size", width: "23%", align: "right" },
  { key: "total", title: "Total", width: "45%", align: "right" },
];

type QuotesProps = {
  subscribeData: OrderBookFormatSubscribeData;
  currentPrice: OrderBookFormatNowPriceData;
};

export default function Quotes({ subscribeData, currentPrice }: QuotesProps) {
  return (
    <Stack className="gap-2">
      <Stack>
        <Table
          columns={columns}
          data={subscribeData.asks}
          themeColor="red"
          renderRow={(row, rowIndex, { columns, themeColor }) => (
            <OrderBookTableRow
              key={row.price}
              row={row as OrderBookColumn}
              rowIndex={rowIndex}
              columns={columns}
              themeColor={themeColor}
            />
          )}
        />
      </Stack>
      <NowPrice priceObj={currentPrice} />
      <Stack>
        <Table
          columns={columns}
          data={subscribeData.bids}
          isShowColumns={false}
          themeColor="green"
          renderRow={(row, rowIndex, { columns, themeColor }) => (
            <OrderBookTableRow
              key={row.price}
              row={row as OrderBookColumn}
              rowIndex={rowIndex}
              columns={columns}
              themeColor={themeColor}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}
