import { Document, Schema, model } from "mongoose";
import hashPassword from "../../utils/hashPassword";

// User interface
interface IUser {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserDocument extends IUser, Document {}
// User schema
const userSchema = new Schema<IUserDocument>(
  {
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ["seller", "buyer"], required: true },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: true, default: 0 },
    income: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);
// Hash password before save to the database
userSchema.pre<IUser>("save", hashPassword);
// User model
const UserModel = model<IUserDocument>("User", userSchema);

export { IUser, UserModel };
