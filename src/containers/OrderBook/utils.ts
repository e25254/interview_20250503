import { formatNumber } from "@/utils";
import type { OrderBookSubscribeData } from "@/types/orderBook";

export const formatSnapshotData = (data: OrderBookSubscribeData) => {
  const { bids, asks } = data;
  if (!bids || !asks) return { bids: [], asks: [] };
  const pickAsks = asks.slice(asks.length - 8, asks.length).reverse();
  const pickBids = bids.slice(0, 8);
  const bidsTotal =
    pickBids.reduce((acc, [, size]) => acc + Number(size), 0) || 0;
  const asksTotal =
    pickAsks.reduce((acc, [, size]) => acc + Number(size), 0) || 0;

  let bidsAccumulated = 0;
  let asksAccumulated = 0;
  const bidsFormatted = pickBids.map(([price, size]) => {
    bidsAccumulated += Number(size);
    return {
      price: formatNumber(Number(price)),
      size: Number(size).toLocaleString(),
      total: Number(bidsAccumulated).toLocaleString(),
      percent: formatNumber((Number(bidsAccumulated) / bidsTotal) * 100),
    };
  });
  const asksFormatted = pickAsks.map(([price, size]) => {
    asksAccumulated += Number(size);
    return {
      price: formatNumber(Number(price)),
      size: Number(size).toLocaleString(),
      total: Number(asksAccumulated).toLocaleString(),
      percent: formatNumber((Number(asksAccumulated) / asksTotal) * 100),
    };
  });
  const result = { bids: bidsFormatted, asks: asksFormatted.reverse() };
  return result;
};
