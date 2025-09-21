import {
  CreateOrderRequestDTO,
  OrderDTO,
} from "@application/dto/orderRequestDTO";
import { Invoice } from "@domain/entities/invoice";
import { Order } from "@domain/entities/order";

export class OrderMapper {
  static toEntities(dto: CreateOrderRequestDTO): {
    invoice: Invoice;
    orders: Order[];
  } {
    const invoice = new Invoice({
      customer: dto.invoice.customer,
      paymentType: dto.invoice.paymentType,
      salesPerson: dto.invoice.salesperson,
      notes: dto.invoice.notes,
    });

    const orders = dto.orders.map(
      (o: OrderDTO) =>
        new Order({
          quantity: o.quantity,
          totalCogs: o.totalCogs,
          totalPrice: o.totalPrice,
        })
    );

    return { invoice, orders };
  }
}
