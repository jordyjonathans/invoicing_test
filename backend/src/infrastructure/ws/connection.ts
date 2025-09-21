import { env } from "@infrastructure/config/env";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import { createPool, Pool } from "mysql2/promise";
import { WebSocketServer } from "ws";

export class WSConnection {
  private static instance: WebSocketServer;

  private constructor() {}

  static connect(port: number) {
    if (!WSConnection.instance) {
      WSConnection.instance = new WebSocketServer({ port });
      WSConnection.instance.on("connection", (ws) => {
        console.log("Client connected to WebSocket");
      });
      console.log("WebSocket server started on port 8080");
    }
  }

  static getInstance() {
    if (!WSConnection.instance) {
      throw new Error(
        "❌ Web socket has not been connected yet! Please connect it first."
      );
    }

    return WSConnection.instance;
  }
}
