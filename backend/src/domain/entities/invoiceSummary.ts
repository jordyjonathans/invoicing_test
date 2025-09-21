import { PaymentType } from "@domain/enums/paymentType";
import { Order } from "./order";

export class InvoiceSummary {
  public date: Date;
  public totalPriceSum: number;

  constructor(invSummary: InvoiceSummary) {
    this.date = invSummary.date;
    this.totalPriceSum = invSummary.totalPriceSum;
  }
}
