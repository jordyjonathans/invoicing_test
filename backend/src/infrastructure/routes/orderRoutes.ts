import { OrderService } from "@application/services/orderService";
import { OrderRepositoryImpl } from "@infrastructure/repositories/orderRepositoryImpl";
import { EventPublisher } from "@infrastructure/ws/eventPublisher";
import { OrderController } from "@interfaces/controllers/orderController";
import { Router } from "express";

const orderRepo = new OrderRepositoryImpl();
const eventPublisher = new EventPublisher();
const orderService = new OrderService(orderRepo, eventPublisher);
const orderController = new OrderController(orderService);

const orderRouter = Router();

orderRouter.post("/", orderController.createOrder);
orderRouter.get("/:page/:limit", orderController.getInvoiceOrdersWithPage);
orderRouter.get("/summary", orderController.getDailyOrdersSummary);

export default orderRouter;
