import useWebSocketConnect from "@/hooks/useWebSocketConnect";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatSnapshotData } from "./utils";
import throttle from "lodash/throttle";
import type {
  OrderBookSubscribeData,
  OrderBookFormatSubscribeData,
  OrderBookEntry,
  OrderBookNewPriceData,
  OrderBookFormatNowPriceData,
} from "@/types";
export default function useOrderBook() {
  const symbol = "BTCPFC";
  const grouping = "0";
  const preSeqNumRef = useRef<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<OrderBookFormatNowPriceData>(
    {
      price: null,
      timestamp: null,
    }
  );
  const [subscribeData, setSubscribeData] =
    useState<OrderBookFormatSubscribeData>({
      bids: [],
      asks: [],
    });

  const tempCurrentPriceRef = useRef<OrderBookFormatNowPriceData>({
    price: null,
    timestamp: null,
  });

  const tempSubscribeData = useRef<OrderBookFormatSubscribeData>({
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

  const { resetAndConnect } = useWebSocketConnect({
    url: "wss://ws.btse.com/ws/oss/futures",
    subscribeObj: {
      op: "subscribe",
      args: [`update:${symbol}_${grouping}`],
    },
    onMessage: (data: unknown) => {
      const response = data as { data?: OrderBookSubscribeData };
      if (!response.data) return;

      const OrderBookSubscribeData = response.data;
      if (OrderBookSubscribeData.type === "snapshot") {
        handleSnapshot(OrderBookSubscribeData);
      } else if (OrderBookSubscribeData.type === "delta") {
        handleDelta(OrderBookSubscribeData, resetAndConnect);
      }
    },
  });

  useWebSocketConnect({
    url: "wss://ws.btse.com/ws/futures",
    subscribeObj: {
      op: "subscribe",
      args: [`tradeHistoryApi:${symbol}`],
    },
    onMessage: (data: unknown) => {
      const response = data as { data?: OrderBookNewPriceData[] };
      if (!response.data) return;
      const { data: tradeData } = response;
      const { price, timestamp } = tradeData[0];
      tempCurrentPriceRef.current = {
        price: price,
        timestamp: timestamp,
      };
      throttledUpdateCurrentPrice();
    },
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

  const throttledUpdateCurrentPrice = useMemo(
    () =>
      throttle(
        () => setCurrentPrice(tempCurrentPriceRef.current),
        THROTTLE_DELAY
      ),
    [THROTTLE_DELAY]
  );

  const throttledUpdateSubscribeData = useMemo(
    () =>
      throttle(() => {
        setSubscribeData(tempSubscribeData.current);
      }, THROTTLE_DELAY),
    [THROTTLE_DELAY]
  );

  const checkIsCrossed = useCallback(
    (bids: OrderBookEntry[], asks: OrderBookEntry[]) => {
      if (bids[0][0] > asks[asks.length - 1][0]) {
        return true;
      }
      return false;
    },
    []
  );

  const handleSnapshot = useCallback(
    (OrderBookSubscribeData: OrderBookSubscribeData) => {
      if (OrderBookSubscribeData.seqNum)
        preSeqNumRef.current = OrderBookSubscribeData.seqNum;

      if (OrderBookSubscribeData.bids) {
        rawOrderBookRef.current.bids.clear();
        processOrderBookEntries(OrderBookSubscribeData.bids, "bids");
      }

      if (OrderBookSubscribeData.asks) {
        rawOrderBookRef.current.asks.clear();
        processOrderBookEntries(OrderBookSubscribeData.asks, "asks");
      }

      tempSubscribeData.current = formatSnapshotData(OrderBookSubscribeData);
      throttledUpdateSubscribeData();
    },
    [processOrderBookEntries, throttledUpdateSubscribeData]
  );

  const updateOrderBook = useCallback(() => {
    const bids: OrderBookEntry[] = Array.from(rawOrderBookRef.current.bids)
      .map(([price, size]): OrderBookEntry => [price, size])
      .sort((a, b) => Number(b[0]) - Number(a[0]));
    const asks: OrderBookEntry[] = Array.from(rawOrderBookRef.current.asks)
      .map(([price, size]): OrderBookEntry => [price, size])
      .sort((a, b) => Number(b[0]) - Number(a[0]));

    const isCrossed = checkIsCrossed(bids, asks);
    if (isCrossed) {
      resetAndConnect();
      return;
    }

    tempSubscribeData.current = formatSnapshotData({
      type: "snapshot",
      bids,
      asks,
    });
    throttledUpdateSubscribeData();
  }, [throttledUpdateSubscribeData, checkIsCrossed, resetAndConnect]);

  const handleDelta = useCallback(
    (
      OrderBookSubscribeData: OrderBookSubscribeData,
      resetConnection: () => void
    ) => {
      if (
        preSeqNumRef.current &&
        OrderBookSubscribeData.prevSeqNum !== preSeqNumRef.current
      ) {
        resetConnection();
        return;
      }

      if (OrderBookSubscribeData.seqNum)
        preSeqNumRef.current = OrderBookSubscribeData.seqNum;

      processOrderBookEntries(OrderBookSubscribeData.bids, "bids");
      processOrderBookEntries(OrderBookSubscribeData.asks, "asks");

      // 更新訂單簿顯示
      updateOrderBook();
    },
    [updateOrderBook, processOrderBookEntries]
  );

  useEffect(() => {
    return () => {
      throttledUpdateSubscribeData.cancel();
    };
  }, [throttledUpdateSubscribeData]);

  const mockDelay = useCallback(() => {
    if (preSeqNumRef.current) {
      preSeqNumRef.current -= 100;
    }
  }, []);

  return { subscribeData, mockDelay, currentPrice };
}
