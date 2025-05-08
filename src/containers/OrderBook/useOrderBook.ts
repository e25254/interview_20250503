import useWebSocketConnect from "@/hooks/useWebSocketConnect";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatSnapshotData } from "./utils";
import throttle from "lodash/throttle";
import type {
  OrderBookData,
  OrderBookFormatData,
  OrderBookEntry,
} from "@/types";
export default function useOrderBook() {
  const symbol = "BTCPFC";
  const grouping = "0";
  const preSeqNumRef = useRef<number | null>(null);
  const [subscribeData, setSubscribeData] = useState<OrderBookFormatData>({
    bids: [],
    asks: [],
  });

  const tempDataRef = useRef<OrderBookFormatData>({
    bids: [],
    asks: [],
  });

  const THROTTLE_DELAY = 200;

  const rawOrderBookRef = useRef<{
    bids: Map<string, string>;
    asks: Map<string, string>;
  }>({
    bids: new Map(),
    asks: new Map(),
  });

  const processOrderBookEntries = useCallback(
    (entries: OrderBookEntry[] | undefined, orderType: "bids" | "asks") => {
      if (!entries) return;
      entries.forEach(([price, size]) => {
        if (Number(size) === 0) {
          rawOrderBookRef.current[orderType].delete(price);
        } else {
          rawOrderBookRef.current[orderType].set(price, size);
        }
      });
    },
    []
  );

  const throttledUpdate = useMemo(
    () =>
      throttle(() => {
        setSubscribeData(tempDataRef.current);
      }, THROTTLE_DELAY),
    [THROTTLE_DELAY]
  );

  const handleSnapshot = useCallback(
    (orderBookData: OrderBookData) => {
      if (orderBookData.seqNum) preSeqNumRef.current = orderBookData.seqNum;

      if (orderBookData.bids) {
        rawOrderBookRef.current.bids.clear();
        processOrderBookEntries(orderBookData.bids, "bids");
      }

      if (orderBookData.asks) {
        rawOrderBookRef.current.asks.clear();
        processOrderBookEntries(orderBookData.asks, "asks");
      }

      tempDataRef.current = formatSnapshotData(orderBookData);
      throttledUpdate();
    },
    [processOrderBookEntries, throttledUpdate]
  );

  const updateOrderBook = useCallback(() => {
    const bids: OrderBookEntry[] = Array.from(rawOrderBookRef.current.bids)
      .map(([price, size]): OrderBookEntry => [price, size])
      .sort((a, b) => Number(b[0]) - Number(a[0]));
    const asks: OrderBookEntry[] = Array.from(rawOrderBookRef.current.asks)
      .map(([price, size]): OrderBookEntry => [price, size])
      .sort((a, b) => Number(b[0]) - Number(a[0]));

    tempDataRef.current = formatSnapshotData({
      type: "snapshot",
      bids,
      asks,
    });
    throttledUpdate();
  }, [throttledUpdate]);

  const handleDelta = useCallback(
    (orderBookData: OrderBookData, resetConnection: () => void) => {
      if (
        preSeqNumRef.current &&
        orderBookData.prevSeqNum !== preSeqNumRef.current
      ) {
        resetConnection();
        return;
      }

      if (orderBookData.seqNum) preSeqNumRef.current = orderBookData.seqNum;

      processOrderBookEntries(orderBookData.bids, "bids");
      processOrderBookEntries(orderBookData.asks, "asks");

      // 更新訂單簿顯示
      updateOrderBook();
    },
    [updateOrderBook, processOrderBookEntries]
  );

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
        console.log("orderBookData", orderBookData);
        handleSnapshot(orderBookData);
      } else if (orderBookData.type === "delta") {
        handleDelta(orderBookData, resetAndConnect);
      }
    },
  });

  useEffect(() => {
    return () => {
      throttledUpdate.cancel();
    };
  }, [throttledUpdate]);

  const mockDelay = useCallback(() => {
    if (preSeqNumRef.current) {
      preSeqNumRef.current -= 100;
    }
  }, []);

  return { subscribeData, mockDelay };
}
