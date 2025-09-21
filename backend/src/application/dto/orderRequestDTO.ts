import { PaymentType } from "@domain/enums/paymentType";

export interface InvoiceDTO {
  customer: string;
  salesperson: string;
  paymentType: PaymentType;
  notes?: string;
}

export interface OrderDTO {
  quantity: number;
  totalCogs: number;
  totalPrice: number;
}

export interface CreateOrderRequestDTO {
  invoice: InvoiceDTO;
  orders: OrderDTO[];
}
