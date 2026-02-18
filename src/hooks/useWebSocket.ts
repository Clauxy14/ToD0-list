import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todo";

interface WebSocketMessage {
  type: "todo_created" | "todo_updated" | "todo_deleted";
  data: Todo | { id: string };
}

export const useWebSocket = (url: string) => {
  const queryClient = useQueryClient();
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const connect = () => {
      try {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
          console.log("WebSocket connected");
        };

        ws.current.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);

            switch (message.type) {
              case "todo_created":
              case "todo_updated":
                queryClient.invalidateQueries({ queryKey: ["todos"] });
                if ("id" in message.data) {
                  queryClient.invalidateQueries({
                    queryKey: ["todo", message.data.id],
                  });
                }
                break;

              case "todo_deleted":
                queryClient.invalidateQueries({ queryKey: ["todos"] });
                if ("id" in message.data) {
                  queryClient.removeQueries({
                    queryKey: ["todo", message.data.id],
                  });
                }
                break;
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        ws.current.onclose = () => {
          console.log("WebSocket disconnected");
          // Attempt to reconnect after 5 seconds
          reconnectTimeoutRef.current = window.setTimeout(connect, 5000);
        };

        ws.current.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      } catch (error) {
        console.error("Failed to connect to WebSocket:", error);
        // Retry connection after 5 seconds
        reconnectTimeoutRef.current = window.setTimeout(connect, 5000);
      }
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [queryClient]);

  const sendMessage = useCallback((message: unknown) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  return { sendMessage };
};
