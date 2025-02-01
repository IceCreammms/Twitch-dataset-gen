// app/utils/websocket.ts
type WebSocketMessage = {
    channels: Array<{ name: string; viewers: number; link: string; image: string }>;
    totalMessages: number;
    totalTokens: number;
  };
  
  type Listener = (data: WebSocketMessage) => void;
  
  export class WebSocketManager {
    private static instance: WebSocketManager;
    private socket: WebSocket | null = null;
    private listeners: Listener[] = [];
    private url: string;
  
    private constructor(url: string) {
      this.url = url;
    }
  
    public static getInstance(url: string): WebSocketManager {
      if (!WebSocketManager.instance) {
        WebSocketManager.instance = new WebSocketManager(url);
      }
      return WebSocketManager.instance;
    }
  
    public connect(): void {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        this.socket = new WebSocket(this.url);
  
        this.socket.onmessage = (event) => {
          const data: WebSocketMessage = JSON.parse(event.data);
          this.listeners.forEach((listener) => listener(data));
          console.log("WebSocket message received:", data);
        };
  
        this.socket.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      }
    }
  
    public addListener(listener: Listener): void {
      this.listeners.push(listener);
    }
  
    public removeListener(listener: Listener): void {
      this.listeners = this.listeners.filter((l) => l !== listener);
    }
  
    public sendMessage(message: any): void {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket is not open");
      }
    }
  }
  
  // Singleton instance
  const wsInstance = WebSocketManager.getInstance("ws://127.0.0.1:8765");
  export default wsInstance;
  