import useWebSocketConnect from "@/hooks/useWebSocketConnect";
import { useRef, useState } from "react";
import { formatSnapshotData } from "./utils";
import type { OrderBookData, OrderBookFormatData } from "@/types/orderBook";
export default function useOrderBook() {
  const symbol = "BTCPFC";
  const grouping = "0";
  const seqNum = useRef<number | null>(null);
  const [subscribeData, setSubscribeData] = useState<OrderBookFormatData>({
    bids: [],
    asks: [],
  });

  const { resetAndConnect } = useWebSocketConnect({
    url: "wss://ws.btse.com/ws/oss/futures",
    subscribeObj: {
      op: "subscribe",
      args: [`update:${symbol}_${grouping}`],
    },
    onMessage: (data: unknown) => {
      const response = data as { data?: OrderBookData };
      if (!response.data) return;
      const orderBookData = response.data;
      if (orderBookData.type === "snapshot") {
        console.log("收到 orderbook 快照:", orderBookData);
        setSubscribeData(formatSnapshotData(orderBookData));
      } else if (orderBookData.type === "delta") {
        if (seqNum.current && orderBookData.seqNum !== seqNum.current + 1) {
          console.log("序列號不連續，重新訂閱");
          resetAndConnect();
        } else {
          // 更新
        }
      }
    },
  });
  return { subscribeData };
}
