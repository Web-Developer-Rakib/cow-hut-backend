import { NextFunction, Request, Response } from "express";
import loginHelper from "../../helpers/login.helper";
import { AdminModel } from "./admin.model";

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { phoneNumber, role, password, name, address } = req.body;

  // Check if phone number is already taken
  const adminExist = await AdminModel.findOne({ phoneNumber });
  if (adminExist) {
    res.status(409).json({ message: "Phone number already exists" });
    return;
  }

  // Create a new admin
  const newAdmin = new AdminModel({
    phoneNumber,
    role,
    password,
    name,
    address,
  });

  try {
    // Save the new admin to the database
    const savedAdmin = await newAdmin.save();
    // Remove password from response
    const { password: _password, ...adminData } = savedAdmin.toObject();
    res.status(201).json({
      success: true,
      statusCode: 200,
      message: "Admin created successfully",
      data: adminData,
    });
  } catch (error) {
    next(error);
  }
};
export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await loginHelper(req, res, next, AdminModel, "Admin");
};
