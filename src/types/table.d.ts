import { CSSProperties } from "react";
type TextAlign = CSSProperties["textAlign"];

export interface ColumnConfig {
  key: string;
  title: string;
  width: string;
  align: TextAlign;
}
