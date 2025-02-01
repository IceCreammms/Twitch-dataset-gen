import "./globals.css";

import { WebSocketProvider } from "./context/webSocketContext";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <WebSocketProvider>{children}</WebSocketProvider>
      </body>
    </html>
  );
}
