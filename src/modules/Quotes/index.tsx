import Table from "@/components/Table";
import type { ColumnConfig } from "@/types";

const columns: ColumnConfig[] = [
  { key: "a", title: "Price(USD)", width: "28%", align: "left" },
  { key: "b", title: "Size", width: "26%", align: "right" },
  { key: "c", title: "Total", width: "46%", align: "right" },
];

const data: Record<string, string>[] = [
  { a: "a1", b: "b1", c: "c1" },
  { a: "a2", b: "b2", c: "c2" },
  { a: "a3", b: "b3", c: "c3" },
  { a: "a4", b: "b4", c: "c4" },
  { a: "a5", b: "b5", c: "c5" },
  { a: "a6", b: "b6", c: "c6" },
  { a: "a7", b: "b7", c: "c7" },
  {
    a: "a8",
    b: "b8",
    c: "c812312312312312312312312c812312312312312312312312c812312312312312312312312c812312312312312312312312",
  },
];

export default function Quotes() {
  return <Table columns={columns} data={data} />;
}
