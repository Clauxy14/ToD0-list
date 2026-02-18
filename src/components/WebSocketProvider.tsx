import type { ReactNode } from "react";
// import { useWebSocket } from '../hooks/useWebSocket';

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  // WebSocket temporarily disabled due to connection issues
  // useWebSocket('wss://api.oluwasetemi.dev/ws/client/tasks');

  return <>{children}</>;
};
