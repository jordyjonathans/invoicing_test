import { Request, Response } from "express";
import { OrderService } from "@application/services/orderService";
import { Order } from "@domain/entities/order";
import { CreateOrderRequestDTO } from "@application/dto/orderRequestDTO";
import { Invoice } from "@domain/entities/invoice";

export class OrderController {
  constructor(private orderService: OrderService) {}

  createOrder = async (req: Request, res: Response) => {
    try {
      const dto: CreateOrderRequestDTO = req.body;

      await this.orderService.createOrder(dto);

      res.status(201);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  };

  getInvoiceOrdersWithPage = async (req: Request, res: Response) => {
    try {
      const page = Number(req.params.page) || 1;
      const limit = Number(req.params.limit) || 10;
      const orders = await this.orderService.getInvoiceOrders(page, limit);

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  };

  getDailyOrdersSummary = async (req: Request, res: Response) => {
    try {
      const orders = await this.orderService.getDailyOrdersSummary();

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  };
}
