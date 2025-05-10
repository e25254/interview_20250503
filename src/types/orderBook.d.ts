export type OrderBookEntry = [string, string];
export type OrderBookData = {
  topic?: string;
  type: "snapshot" | "delta";
  data?: unknown;
  bids?: OrderBookEntry[];
  asks?: OrderBookEntry[];
  seqNum?: number;
  prevSeqNum?: number;
  timestamp?: number;
};

export type OrderBookColumn = {
  price: string;
  size: string;
  total: string;
  percent: string;
};

export type OrderBookFormatData = {
  bids: OrderBookColumn[];
  asks: OrderBookColumn[];
};
