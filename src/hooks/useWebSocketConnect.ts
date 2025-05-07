import { useEffect, useRef, useCallback } from "react";

type WebSocketConnectOptions = {
  url: string;
  subscribeObj?: Record<string, string | string[]> | null;
  onMessage?: (data: unknown) => void;
  onError?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
};

export default function useWebSocketConnect({
  url,
  subscribeObj = null,
  onMessage,
  onError,
  onClose,
}: WebSocketConnectOptions) {
  const socket = useRef<WebSocket | null>(null);
  const isComponentMounted = useRef(true);
  const isConnecting = useRef(false);

  const send = useCallback((message: string) => {
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(message);
    } else {
      console.log("WebSocket無法發送消息，Socket未連接");
    }
  }, []);

  const subscribe = useCallback(
    (subscribeObj: Record<string, string | string[]>) => {
      const message = JSON.stringify(subscribeObj);
      send(message);
    },
    [send]
  );
  // 連接 WebSocket
  const connect = useCallback(() => {
    if (!isComponentMounted.current) return;
    if (socket.current?.readyState === WebSocket.OPEN) return;
    if (socket.current?.readyState === WebSocket.CONNECTING) return;
    if (isConnecting.current) return;
    try {
      isConnecting.current = true;
      if (socket.current) {
        try {
          socket.current.close();
        } catch (e) {
          console.log("WebSocket關閉舊連接時出錯", e);
        }
        socket.current = null;
      }
      socket.current = new WebSocket(url);

      socket.current.onopen = () => {
        isConnecting.current = false;
        if (!isComponentMounted.current) {
          socket.current?.close();
          return;
        }
        if (subscribeObj && socket.current) subscribe(subscribeObj);
      };

      socket.current.onmessage = (event) => {
        if (!isComponentMounted.current) return;

        try {
          const data = JSON.parse(event.data);

          if (onMessage) {
            onMessage(data);
          }
        } catch (error) {
          console.log("WebSocket錯誤:", error);
        }
      };

      socket.current.onerror = (event) => {
        isConnecting.current = false;
        if (!isComponentMounted.current) return;

        console.log("WebSocket錯誤:", event);
        if (onError) {
          onError(event);
        }
      };

      socket.current.onclose = (event) => {
        isConnecting.current = false;
        if (!isComponentMounted.current) return;

        console.log("WebSocket已關閉連接:", event.code, event.reason);
        if (onClose) {
          onClose(event);
        }
      };
      const connectionTimeout = setTimeout(() => {
        if (socket.current?.readyState !== WebSocket.OPEN) {
          console.log("WebSocket連接超時");
          if (socket.current) {
            socket.current.close();
          }
        }
      }, 10000);

      // 清理超時計時器
      socket.current.addEventListener("open", () => {
        clearTimeout(connectionTimeout);
      });

      socket.current.addEventListener("close", () => {
        clearTimeout(connectionTimeout);
      });

      socket.current.addEventListener("error", () => {
        clearTimeout(connectionTimeout);
      });
    } catch (error) {
      isConnecting.current = false;
      if (!isComponentMounted.current) return;
      console.log("WebSocket錯誤:", error);
    }
  }, [url, subscribeObj, subscribe, onMessage, onError, onClose]);

  const resetAndConnect = useCallback(() => {
    if (socket.current) {
      try {
        socket.current.close();
      } catch (e) {
        console.log("重置連接時關閉舊連接出錯", e);
      }
      socket.current = null;
    }
    setTimeout(() => {
      connect();
    }, 100);
  }, [connect]);

  const disconnect = useCallback(() => {
    if (socket.current) {
      try {
        if (
          socket.current.readyState === WebSocket.OPEN ||
          socket.current.readyState === WebSocket.CONNECTING
        ) {
          socket.current.close();
        }
      } catch (e) {
        console.log("關閉WebSocket連接時出錯", e);
      }
      socket.current = null;
    }
  }, []);

  useEffect(() => {
    isComponentMounted.current = true;
    const timer = setTimeout(() => {
      connect();
    }, 100);

    return () => {
      isComponentMounted.current = false;
      disconnect();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    connect,
    disconnect,
    send,
    subscribe,
    resetAndConnect,
  };
}
