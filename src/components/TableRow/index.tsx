import { Fragment, memo } from "react";
import type { ColumnConfig } from "@/types";
import { isEqual } from "lodash";

export default memo(
  function TableRow({
    columns,
    row,
    rowIndex,
  }: {
    columns: ColumnConfig[];
    row: Record<string, string>;
    rowIndex: number;
  }) {
    return (
      <Fragment>
        {rowIndex > 0 && <tr className="h-1" />}
        <tr>
          {columns.map((column) => (
            <td
              key={`${rowIndex}-${column.key}`}
              className="truncate text-lg font-bold h-7.5"
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
      </Fragment>
    );
  },
  (prevProps, nextProps) => {
    const { row: prevRow } = prevProps;
    const { row: nextRow } = nextProps;

    return isEqual(prevRow, nextRow);
  }
);
