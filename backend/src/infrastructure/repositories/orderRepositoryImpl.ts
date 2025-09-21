import { Invoice } from "@domain/entities/invoice";
import { InvoiceCard } from "@domain/entities/invoiceCard";
import { InvoiceSummary } from "@domain/entities/invoiceSummary";
import { Order } from "@domain/entities/order";
import { PaymentType } from "@domain/enums/paymentType";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { PaginationResult } from "@domain/types/paginationResult";
import { invoicesTable, ordersTable } from "@infrastructure/database/mysql";
import { MysqlConnection } from "@infrastructure/database/mysql/connection";
import { sql, inArray } from "drizzle-orm";

export class OrderRepositoryImpl implements IOrderRepository {
  private db = MysqlConnection.getDbInstance();

  create = async (invoice: Invoice, orders: Order[]) =>
    this.db.transaction(async (trx) => {
      const [invoiceResult] = await trx.insert(invoicesTable).values({
        customer: invoice.customer,
        salesPerson: invoice.salesPerson,
        paymentType: invoice.paymentType,
        notes: invoice.notes,
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      });

      const newInvoiceId = invoiceResult.insertId;

      // (bulk insert)
      if (orders.length > 0) {
        await trx.insert(ordersTable).values(
          orders.map((o) => ({
            invoiceID: newInvoiceId,
            quantity: o.quantity,
            totalCogs: o.totalCogs,
            totalPrice: o.totalPrice,
          }))
        );
      }
    });

  findAllInvoiceOrders = async (
    page: number,
    limit: number
  ): Promise<PaginationResult<InvoiceCard>> => {
    const offset = (page - 1) * limit;

    const totalInvoices = await this.db
      .select({ count: sql<number>`COUNT(*)` })
      .from(invoicesTable);
    const totalPage = Math.ceil(Number(totalInvoices[0].count) / limit);

    const invoiceRows = await this.db
      .select()
      .from(invoicesTable)
      .limit(limit)
      .offset(offset);

    if (invoiceRows.length === 0) {
      return { items: [], totalPage };
    }

    const invoiceIds = invoiceRows.map((inv) => inv.id);
    const orderRows = await this.db
      .select()
      .from(ordersTable)
      .where(inArray(ordersTable.invoiceID, invoiceIds));

    const invoiceCards: InvoiceCard[] = invoiceRows.map((inv) => ({
      id: inv.id,
      customer: inv.customer,
      salesPerson: inv.salesPerson,
      paymentType: inv.paymentType as PaymentType,
      notes: inv.notes,
      createdAt: inv.createdAt,
      updatedAt: inv.updatedAt,
      totalAmountPaid: 0,
      orders: orderRows.filter((o) => o.invoiceID === inv.id),
    }));

    return { items: invoiceCards, totalPage: totalPage };
  };

  findAllOrdersDailySum = async (): Promise<InvoiceSummary[]> => {
    const rows = await this.db
      .select({
        date: sql<string>`DATE_FORMAT(created_at, '%d-%m-%Y')`,
        totalPriceSum: sql<number>`SUM(total_price)`,
      })
      .from(ordersTable)
      .groupBy(sql`DATE(created_at)`)
      .orderBy(sql`DATE(created_at)`);

    return rows.map(
      (r) =>
        new InvoiceSummary({
          date: new Date(r.date),
          totalPriceSum: r.totalPriceSum,
        })
    );
  };
}
