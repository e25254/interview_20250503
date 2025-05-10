import type { ColumnConfig, FlashColorType } from "@/types";
import { memo } from "react";
import isEqual from "lodash/isEqual";

type TableProps = {
  columns: ColumnConfig[];
  data: Record<string, string>[];
  isShowColumns?: boolean;
  themeColor?: FlashColorType;
  renderRow: (
    row: Record<string, string>,
    rowIndex: number,
    props: {
      columns: ColumnConfig[];
      themeColor: FlashColorType;
    }
  ) => React.ReactNode;
};

export default memo(
  function Table({
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
    isShowColumns = true,
    themeColor = "red" as FlashColorType,
    renderRow,
  }: TableProps) {
    return (
      <table className="w-full border-collapse table-fixed">
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>
        {isShowColumns && (
          <thead>
            <tr>
              {columns.map((column, columnIndex) => (
                <th
                  key={column.key}
                  className="truncate text-xl text-quote-head font-normal"
                  style={{
                    textAlign: column.align,
                    paddingLeft:
                      columnIndex === 0 ? "var(--spacing-hor-container)" : "0",
                    paddingRight:
                      columnIndex === columns.length - 1
                        ? "var(--spacing-hor-container)"
                        : "0",
                  }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {isShowColumns && <tr className="h-2" />}
          {data.map((row, rowIndex) => {
            return renderRow(row, rowIndex, { columns, themeColor });
          })}
        </tbody>
      </table>
    );
  },
  (prevProps, nextProps) => {
    const { data: prevData } = prevProps;
    const { data: nextData } = nextProps;
    return isEqual(prevData, nextData);
  }
);
