import { CSSProperties } from "react";
type TextAlign = CSSProperties["textAlign"];

export type ColumnConfig = {
  key: string;
  title: string;
  width: string;
  align: TextAlign;
};

export type FlashColorType = "green" | "red";
