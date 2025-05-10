import { Fragment, memo } from "react";
import type { ColumnConfig, FlashColorType, OrderBookColumn } from "@/types";
import { isEqual } from "lodash";
import TdPrice from "@/components/OrderBookTableRow/TdPrice";
import TdTotal from "@/components/OrderBookTableRow/TdTotal";
import TdSize from "@/components/OrderBookTableRow/TdSize";

const TdComponents: Record<
  string,
  React.ComponentType<{ row: OrderBookColumn; themeColor: FlashColorType }>
> = {
  price: TdPrice,
  total: TdTotal,
  size: TdSize,
};

export default memo(
  function OrderBookTableRow({
    columns,
    row,
    rowIndex,
    themeColor = "red" as FlashColorType,
  }: {
    columns: ColumnConfig[];
    row: OrderBookColumn;
    rowIndex: number;
    themeColor?: FlashColorType;
  }) {
    return (
      <Fragment>
        <tr className={`flash-animation-${themeColor} hover:bg-row-hover`}>
          {columns.map((column, columnIndex) => {
            const Component =
              TdComponents[column.key as keyof typeof TdComponents];
            return (
              <td
                key={`${rowIndex}-${column.key}`}
                className="truncate text-lg font-bold h-[33px]"
                style={{
                  maxWidth: column.width,
                  textAlign: column.align,
                  paddingLeft:
                    columnIndex === 0 ? "var(--spacing-hor-container)" : "",
                  paddingRight:
                    columnIndex === columns.length - 1
                      ? "var(--spacing-hor-container)"
                      : "0",
                }}
                title={row[column.key as keyof OrderBookColumn]}
              >
                {Component && <Component row={row} themeColor={themeColor} />}
              </td>
            );
          })}
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
