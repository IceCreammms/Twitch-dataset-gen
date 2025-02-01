import asyncio
import websockets
from websockets.server import WebSocketServerProtocol
import json

class WebSocketServer:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(WebSocketServer, cls).__new__(cls)
            cls._instance.clients = set()
            cls._instance.server = None
        return cls._instance

    async def register(self, websocket: WebSocketServerProtocol):
        self.clients.add(websocket)
        print(f"Client connected: {websocket.remote_address}")

    async def unregister(self, websocket: WebSocketServerProtocol):
        self.clients.remove(websocket)
        print(f"Client disconnected: {websocket.remote_address}")

    async def handle_client(self, websocket: WebSocketServerProtocol, path: str):
        await self.register(websocket)
        try:
            async for message in websocket:
                print(f"Message received: {message}")
                # Echo message to all connected clients
                await self.broadcast(f"Server received: {message}")
        except websockets.exceptions.ConnectionClosed as e:
            print(f"Connection closed: {e}")
        finally:
            await self.unregister(websocket)

    async def broadcast(self, message):
        if self.clients:
            try:
                # Serialize the message to JSON
                json_message = json.dumps(message)
                tasks = [asyncio.create_task(client.send(json_message)) for client in self.clients]
                await asyncio.wait(tasks)
            except Exception as e:
                print(f"Error broadcasting message: {e}")



    async def start(self, host: str = "localhost", port: int = 8765):
        if not self.server:
            self.server = await websockets.serve(self.handle_client, host, port)
            print(f"WebSocket server started on ws://{host}:{port}")
        return self.server

    async def stop(self):
        if self.server:
            self.server.close()
            await self.server.wait_closed()
            print("WebSocket server stopped")
            self.server = None

# Singleton instance
ws_server = WebSocketServer()

if __name__ == "__main__":
    # Start the server
    asyncio.run(ws_server.start())
