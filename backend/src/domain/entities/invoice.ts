import { PaymentType } from "@domain/enums/paymentType";
import { Order } from "./order";

export class Invoice {
  public id?: number;
  public customer: string;
  public salesPerson: string;
  public paymentType: PaymentType;
  public notes?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(invoice: Invoice) {
    this.id = invoice.id;
    this.customer = invoice.customer;
    this.salesPerson = invoice.salesPerson;
    this.paymentType = invoice.paymentType;
    this.notes = invoice.notes;
    this.createdAt = invoice.createdAt;
    this.updatedAt = invoice.updatedAt;
  }
}
