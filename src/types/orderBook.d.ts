export type OrderBookEntry = [string, string];
export type OrderBookSubscribeData = {
  topic?: string;
  type: "snapshot" | "delta";
  data?: unknown;
  bids?: OrderBookEntry[];
  asks?: OrderBookEntry[];
  seqNum?: number;
  prevSeqNum?: number;
  timestamp?: number;
};

export type OrderBookNewPriceData = {
  price: number;
  size: number;
  side: "SELL" | "BUY";
  symbol: string;
  tradeId: number;
  timestamp: number;
};

export type OrderBookColumn = {
  price: string;
  size: string;
  total: string;
  percent: string;
};

export type OrderBookFormatSubscribeData = {
  bids: OrderBookColumn[];
  asks: OrderBookColumn[];
};

export type OrderBookFormatNowPriceData = {
  price: number | null;
  timestamp: number | null;
};
