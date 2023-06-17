import express from "express";
import { createOrder, getAllOrders } from "./order.controller";
const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/", getAllOrders);

export default orderRouter;
