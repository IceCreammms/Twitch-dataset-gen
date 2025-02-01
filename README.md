
  

# Twitch Chat dataset generator

  

This project consists of two main components:

  

1.  **Python Server**

A backend service that connects to Twitch via IRC, retrieves chat messages, and provides an API for other services. It also manages data persistence using a SQLite database.

2.  **Frontend Dashboard**

A Next.js application built with shadcn/ui and Tailwind CSS. This dashboard allows users to modify application settings and monitor the current status. It communicates with the Python server using WebSockets for real-time updates.

## Table of Contents

  

- [Features](#features)

- [Prerequisites](#prerequisites)

- [Installation](#installation)

- [Configuration](#configuration)

- [Usage](#usage)

- [Troubleshooting](#troubleshooting)

- [License](#license)


## Features

  

-  **Real-Time Twitch Chat:**

Connect to Twitch’s IRC to fetch live chat messages.

-  **API Integration:**

The Python server exposes endpoints for the frontend to interact with.

-  **WebSocket Communication:**

The frontend dashboard uses WebSockets to receive real-time updates from the server.

-  **User-Friendly Dashboard:**

Built with Next.js, shadcn/ui, and Tailwind CSS, the frontend provides a modern interface to change settings and view the current status.

-  **Data Persistence:**

All relevant data is stored in a SQLite database on the server side.

## Prerequisites

  

Before getting started, ensure you have the following installed:

  

-  **Python 3.8+**

Required to run the Python server.

-  **Node.js 14+ / npm or Yarn**

Needed to run the Next.js frontend.

-  **Git**

To clone the repository.



## Installation

### 1. Clone the Repository

`git clone https://github.com/yourusername/your-repo-name.git`

`cd your-repo-name`

  

### 2. Set Up the Python Server

  

1.  **Navigate to the server folder:**

  

`cd server`

2.  **Create and activate a virtual environment (optional but recommended):**

  

`python -m venv venv`

`source venv/bin/activate # On Windows: venv\Scripts\activate`

3.  **Install dependencies:**

`pip install -r requirements.txt`

4.  **Initialize or verify the SQLite database:**

The server should automatically create or update the SQLite database on the first run. If not, check the server documentation for manual initialization instructions.

  

### 3. Set Up the Frontend Dashboard

  

1.  **Navigate to the frontend folder:**

`cd ../frontend`

2.  **Install Node.js dependencies:**

  

`npm install`

#### or if using Yarn

`yarn install`

## Configuration

  

### Python Server

  

-  **Twitch Credentials:**

Configure your Twitch IRC credentials (e.g., OAuth token, channel names) within the server’s configuration file (e.g., `config.py` or `.env`). Refer to the file comments or documentation for detailed instructions.

-  **SQLite Database:**

The database file is located within the server directory (e.g., `data.db` or similar). Ensure the server process has write permissions to this file.

  

### Frontend Dashboard

  

-  **WebSocket Endpoint:**

Update the WebSocket endpoint URL in your frontend configuration (e.g., in an environment file like `.env.local`), so it correctly points to your running Python server.

## Usage

  

### Running the Python Server

  

1.  **Start the server:**

  

`cd server`

`python app.py`

The server should start and begin connecting to Twitch’s IRC to fetch messages, expose the API endpoints, and open a WebSocket for communication.

  

### Running the Frontend Dashboard

  

1.  **Start the development server:**

`cd frontend`

`npm run dev`

#### or if using Yarn

`yarn dev`

2.  **Access the Dashboard:**

Open your browser and navigate to http://localhost:3000 to interact with the application.

## Troubleshooting

  

-  **Server Not Connecting to Twitch:**

Verify that your Twitch credentials are correct and that your network allows IRC connections.

-  **WebSocket Issues:**

Check that the WebSocket URL in the frontend configuration matches the Python server's WebSocket endpoint.

-  **Database Errors:**

Ensure the server process has proper permissions to read/write to the SQLite database file.

  

For additional help, consult the documentation within the code or open an issue on the repository.

## License

  

Distributed under the MIT License. See `LICENSE` for more information.