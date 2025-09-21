import { PaymentType } from "@domain/enums/paymentType";
import { Order } from "./order";

export class InvoiceCard {
  public id?: number;
  public customer: string;
  public salesPerson: string;
  public paymentType: PaymentType;
  public notes?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public totalAmountPaid: number;
  public orders: Order[];

  constructor(invoice: InvoiceCard) {
    this.id = invoice.id;
    this.customer = invoice.customer;
    this.salesPerson = invoice.salesPerson;
    this.paymentType = invoice.paymentType;
    this.notes = invoice.notes;
    this.createdAt = invoice.createdAt;
    this.updatedAt = invoice.updatedAt;
    this.totalAmountPaid = invoice.totalAmountPaid;
    this.orders = invoice.orders;
  }
}
