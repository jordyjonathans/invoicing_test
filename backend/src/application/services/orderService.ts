import { CreateOrderRequestDTO } from "@application/dto/orderRequestDTO";
import {
  DailyInvoiceSummaryResponseDTO,
  InvoiceCardResponseDTO,
} from "@application/dto/orderResponseDTO";
import { OrderMapper } from "@application/mappers/createOrderMapper";
import { Invoice } from "@domain/entities/invoice";
import { InvoiceCard } from "@domain/entities/invoiceCard";
import { InvoiceSummary } from "@domain/entities/invoiceSummary";
import { EventType } from "@domain/enums/eventType";
import { PaymentType } from "@domain/enums/paymentType";
import { IEventPublisher } from "@domain/interfaces/IEventPublisher";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { NewInvoiceEvent } from "@domain/types/invoiceEvents";
import { PaginationResult } from "@domain/types/paginationResult";

export class OrderService {
  constructor(
    private orderRepo: IOrderRepository,
    private eventPublisher: IEventPublisher
  ) {}

  createOrder = async (dto: CreateOrderRequestDTO): Promise<void> => {
    const { invoice, orders } = OrderMapper.toEntities(dto);

    const totalPriceSum = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    this.eventPublisher.publish<NewInvoiceEvent>({
      type: EventType.NEW_INVOICE,
      date: invoice.createdAt || new Date(),
      totalPrice: totalPriceSum,
    });

    await this.orderRepo.create(invoice, orders);
  };

  getInvoiceOrders = async (
    page: number,
    limit: number
  ): Promise<PaginationResult<InvoiceCardResponseDTO>> => {
    const invoiceCards = await this.orderRepo.findAllInvoiceOrders(page, limit);
    const invoicesDto: InvoiceCardResponseDTO[] = invoiceCards.items.map(
      (invCard) => ({
        id: invCard.id!,
        customer: invCard.customer,
        salesPerson: invCard.salesPerson,
        paymentType: invCard.paymentType as PaymentType,
        notes: invCard.notes,
        totalAmountPaid: invCard.orders.reduce(
          (sum, order) => sum + order.totalPrice,
          0
        ),
        createdAt: invCard.createdAt!,
        updatedAt: invCard.updatedAt!,
      })
    );
    return { items: invoicesDto, totalPage: invoiceCards.totalPage };
  };

  getDailyOrdersSummary = async (): Promise<InvoiceSummary[]> =>
    this.orderRepo.findAllOrdersDailySum();
}
