from sqlalchemy import create_engine, Column, String, Integer, Text, DateTime
from sqlalchemy.orm import sessionmaker
import datetime
import random
from typing import List
import asyncio

from ws_server_class import ws_server


class ChatMessage:
    __tablename__ = "chat_messages"
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    streamer_name = Column(String(100))
    message = Column(Text)


DATABASE_URL = "sqlite:///twitch_chat.db"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Twitch API Credentials
CLIENT_ID = "2v8tle49s9hgfjsebpgvs947uh8r0n"
ACCESS_TOKEN = "kcm3c378jzylr6692now4ehmf2i4v9"

HEADERS = {
    "Client-ID": CLIENT_ID,
    "Authorization": f"Bearer {ACCESS_TOKEN}",
}

# Example stats to send to the client
stats = {
    "channels": [],
    "totalMessages": 0,
    "totalTokens": 0,
}

# Configuration for the number of channels to simulate
Config = {"channel_count": 10}


def generate_random_channels(count: int) -> List[dict]:
    """Generate a list of random channel data."""
    channels = []
    for i in range(count):
        name = f"VTuberChannel{i+1}"
        viewers = random.randint(100, 5000)
        link = f"https://twitch.tv/{name}"
        image = f"https://via.placeholder.com/64?text={name[:2]}"
        channels.append(
            {
                "name": name,
                "viewers": viewers,
                "link": link,
                "image": image,
            }
        )
    return channels


async def send_random_data():
    """Send random data to the client every 5 seconds."""
    while True:
        stats["channels"] = generate_random_channels(Config["channel_count"])
        stats["totalMessages"] += random.randint(1, 10)
        stats["totalTokens"] += random.randint(1, 10)
        await ws_server.broadcast(stats)  # Convert to string before broadcasting
        await asyncio.sleep(5)


async def main():
    """Main coroutine to start the server and send random data."""
    await asyncio.gather(
        ws_server.start(),  # Start the WebSocket server
        send_random_data(),  # Start sending random data
    )


if __name__ == "__main__":
    asyncio.run(main())
