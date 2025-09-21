import { IEventPublisher } from "@domain/interfaces/IEventPublisher";
import { WSConnection } from "./connection";

export class EventPublisher implements IEventPublisher {
  publish<T>(event: T): void {
    const wss = WSConnection.getInstance();
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(JSON.stringify(event));
    });
  }
}
