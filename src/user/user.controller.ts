import { NextFunction, Request, Response } from "express";
import { SortOrder } from "mongoose";
import { UserModel } from "./user.model";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = (req.query.sort as SortOrder) || "asc";
    const sortField = (req.query.sortField as string) || "createdAt";
    const users = await UserModel.find()
      .sort({ [sortField]: sort })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ _id: userId });
    res.status(200).send({
      success: true,
      statusCode: 200,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.userId;
  const updateFields = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      Object.assign(user, updateFields);
      const updatedUser = await user.save();
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User updated successfully",
        data: updatedUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.userId;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id).exec();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Uers deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
