import { EventType } from "@domain/enums/eventType";

export interface NewInvoiceEvent {
  type: EventType.NEW_INVOICE; // string literal berasal dari enum
  date: Date;
  totalPrice: number;
}
