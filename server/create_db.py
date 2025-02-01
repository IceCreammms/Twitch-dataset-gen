from sqlalchemy import create_engine, Column, String, Text, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

# Define the base class for ORM models
Base = declarative_base()

# Define the ChatMessage table
class ChatMessage(Base):
    __tablename__ = 'chat_messages'
    id = Column(Integer, primary_key=True)  # Auto-incrementing primary key
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)  # Timestamp of the message
    streamer_name = Column(String(100))  # Name of the streamer/channel
    message = Column(Text)  # Content of the message

# Create an SQLite database
DATABASE_URL = "sqlite:///twitch_chat.db"  # Database file path
engine = create_engine(DATABASE_URL)

# Create the database schema
Base.metadata.create_all(engine)

# Session maker for interacting with the database
Session = sessionmaker(bind=engine)
session = Session()

print("Database created successfully!")
