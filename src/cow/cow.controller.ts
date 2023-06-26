import { NextFunction, Request, Response } from "express";
import { SortOrder } from "mongoose";
import { CowModel, ICow } from "./cow.model";

export const createCow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cowData: ICow = req.body;
    if (!cowData) {
      res.sendStatus(400);
    } else {
      const cow = new CowModel(cowData);
      await cow.save();
      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Cow created successfully",
        data: cow,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getAllCows = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = (req.query.sort as SortOrder) || "asc";
    const sortField = (req.query.sortField as string) || "createdAt";
    const cows = await CowModel.find()
      .populate("seller")
      .sort({ [sortField]: sort })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const cowCount = await CowModel.countDocuments();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cows retrieved successfully",
      meta: {
        page: page,
        limit: limit,
        count: cowCount,
      },
      data: cows,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleCow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cowId = req.params.cowId;
    const cow = await CowModel.findOne({ _id: cowId }).populate("seller");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow retrieved successfully",
      data: cow,
    });
  } catch (error) {
    next(error);
  }
};
export const updateCow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cowId = req.params.cowId;
  const updateFields = req.body;
  try {
    const cow = await CowModel.findById(cowId);
    if (!cow) {
      res.status(404).json({ error: "Cow not found" });
    } else {
      Object.assign(cow, updateFields);
      const updatedCow = await cow.save();
      res.send(200).json({
        success: true,
        statusCode: 200,
        message: "Cow updated successfully",
        data: updatedCow,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteCow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.cowId;
  try {
    const deletedCow = await CowModel.findByIdAndDelete(id).exec();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow deleted successfully",
      data: deletedCow,
    });
  } catch (error) {
    next(error);
  }
};
