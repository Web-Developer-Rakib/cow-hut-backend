import express from "express";
import verifyUser from "../../middlewares/verifyUser";
import { createOrder, getAllOrders } from "./order.controller";
const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.post("/create-order", createOrder);
orderRouter.get("/:orderId", verifyUser, createOrder);

export default orderRouter;
