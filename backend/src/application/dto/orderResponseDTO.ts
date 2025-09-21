import { PaymentType } from "@domain/enums/paymentType";

export interface InvoiceCardResponseDTO {
  id: number;
  customer: string;
  salesPerson: string;
  paymentType: PaymentType;
  notes?: string;
  totalAmountPaid: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyInvoiceSummaryResponseDTO {
  date: Date;
  totalAmount: number;
}
