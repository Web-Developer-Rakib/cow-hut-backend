import { NextFunction, Request, Response } from "express";
import mongoose, { SortOrder } from "mongoose";
import { CowModel } from "../cow/cow.model";
import { UserModel } from "../user/user.model";
import { OrderModel } from "./order.model";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cow, buyer } = req.body;
    const selectedCow = await CowModel.findById(cow);

    if (!selectedCow) {
      return res.status(400).json({
        success: false,
        message: "Cow not found.",
      });
    }
    // Check if the buyer has enough money to buy the cow (assuming you have a User model with a budget field)
    const buyerHasEnoughMoney = await UserModel.findOne({
      _id: buyer,
      budget: { $gte: selectedCow.price },
    });

    if (!buyerHasEnoughMoney) {
      return res.status(400).json({
        success: false,
        message: "Insufficient funds to buy the cow.",
      });
    }
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Change the cow's status to 'sold out'
      await CowModel.findByIdAndUpdate(cow, { status: "sold out" }).session(
        session
      );

      // Deduct the cost of the cow from the buyer's budget
      await UserModel.findByIdAndUpdate(buyer, {
        $inc: { budget: -cow.price },
      }).session(session);

      // Transfer the cost of the cow to the seller's income (assuming you have a Seller model with an income field)
      await UserModel.findByIdAndUpdate(cow.seller, {
        $inc: { income: cow.price },
      }).session(session);

      // Create a new order
      const order = await OrderModel.create({ cow, buyer }, { session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Return the newly created order
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: order,
      });
    } catch (error) {
      // Abort the transaction in case of an error
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
export const getSingleOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    const order = OrderModel.findOne({ _id: orderId })
      .populate("cow buyer")
      .exec();
    if (!order) {
      res.status(404).json({ error: "Order not found." });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Order information retrieved successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = (req.query.sort as SortOrder) || "asc";
    const sortField = (req.query.sortField as string) || "createdAt";
    const orders = await OrderModel.find()
      .populate("cow buyer")
      .sort({ [sortField]: sort })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
