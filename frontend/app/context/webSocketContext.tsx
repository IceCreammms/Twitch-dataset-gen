"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import wsInstance from "../../lib/websocket";

interface WebSocketContextType {
  data: {
    channels: Array<{ name: string; viewers: number; link: string; image: string }>;
    totalMessages: number;
    totalTokens: number;
  };
  updateChannels: (count: number) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({
    channels: [],
    totalMessages: 0,
    totalTokens: 0,
  });

  useEffect(() => {
    wsInstance.connect();
    const handleData = (newData: WebSocketContextType["data"]) => setData(newData);

    wsInstance.addListener(handleData);

    return () => {
      wsInstance.removeListener(handleData);
    };
  }, []);

  const updateChannels = (count: number) => {
    wsInstance.sendMessage({ channels: count });
  };

  return (
    <WebSocketContext.Provider value={{ data, updateChannels }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
