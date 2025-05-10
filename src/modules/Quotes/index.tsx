import Table from "@/components/Table";
import Stack from "@/components/Stack";
import NowPrice from "@/components/NowPrice";
import type {
  ColumnConfig,
  OrderBookColumn,
  OrderBookFormatData,
} from "@/types";
import OrderBookTableRow from "@/components/OrderBookTableRow";

const columns: ColumnConfig[] = [
  { key: "price", title: "Price(USD)", width: "30%", align: "left" },
  { key: "size", title: "Size", width: "25%", align: "right" },
  { key: "total", title: "Total", width: "45%", align: "right" },
];

type QuotesProps = {
  data: OrderBookFormatData;
};

export default function Quotes({ data }: QuotesProps) {
  return (
    <Stack className="gap-2">
      <Stack className="px-hor-container">
        <Table
          columns={columns}
          data={data.asks}
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
      <NowPrice price={100} />
      <Stack className="px-hor-container">
        <Table
          columns={columns}
          data={data.bids}
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
