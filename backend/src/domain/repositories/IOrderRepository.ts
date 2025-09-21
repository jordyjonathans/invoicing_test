import { Invoice } from "@domain/entities/invoice";
import { InvoiceCard } from "@domain/entities/invoiceCard";
import { InvoiceSummary } from "@domain/entities/invoiceSummary";
import { Order } from "@domain/entities/order";
import { PaginationResult } from "@domain/types/paginationResult";

export interface IOrderRepository {
  create(invoice: Invoice, orders: Order[]): Promise<void>;

  findAllInvoiceOrders(
    page: number,
    limit: number
  ): Promise<PaginationResult<InvoiceCard>>;

  findAllOrdersDailySum(): Promise<InvoiceSummary[]>;
}
