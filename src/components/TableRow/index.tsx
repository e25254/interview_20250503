import { Fragment, memo } from "react";
import type { ColumnConfig, FlashColorType } from "@/types";
import { isEqual } from "lodash";

export default memo(
  function TableRow({
    columns,
    row,
    rowIndex,
    themeColor = "red" as FlashColorType,
  }: {
    columns: ColumnConfig[];
    row: Record<string, string>;
    rowIndex: number;
    themeColor?: FlashColorType;
  }) {
    return (
      <Fragment>
        {rowIndex > 0 && <tr className="h-1" />}
        <tr className={`${`flash-animation-${themeColor}`}`}>
          {columns.map((column) => (
            <td
              key={`${rowIndex}-${column.key}`}
              className={`truncate text-lg font-bold h-7.5`}
              style={{
                maxWidth: column.width,
                textAlign: column.align,
              }}
              title={row[column.key]}
            >
              <div>{row[column.key]}</div>
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
