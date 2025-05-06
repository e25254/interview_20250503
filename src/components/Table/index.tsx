import type { ColumnConfig } from "@/types";

interface TableProps {
  columns: ColumnConfig[];
  data: Record<string, string>[];
}

export default function Table({
  columns = [
    { key: "a", title: "Price(USD)", width: "28%", align: "left" },
    { key: "b", title: "Size", width: "26%", align: "right" },
    { key: "c", title: "Total", width: "46%", align: "right" },
  ],
  data = [
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
  ],
}: TableProps) {
  return (
    <table className="w-full border-collapse table-fixed">
      <colgroup>
        {columns.map((column) => (
          <col key={column.key} style={{ width: column.width }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="truncate"
              style={{ textAlign: column.align }}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td
                key={`${rowIndex}-${column.key}`}
                className="truncate"
                style={{
                  maxWidth: column.width,
                  textAlign: column.align,
                }}
                title={row[column.key]}
              >
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
