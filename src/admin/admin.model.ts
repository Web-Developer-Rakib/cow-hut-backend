import { Document, Schema, model } from "mongoose";
import hashPassword from "../../utils/hashPassword";

enum Role {
  Admin = "admin",
}

interface IAdmin extends Document {
  phoneNumber: string;
  role: Role;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema: Schema<IAdmin> = new Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: Role, required: true, default: Role.Admin },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
  },
  { timestamps: true }
);
// Hash password before save to the database
adminSchema.pre<IAdmin>("save", hashPassword);
const AdminModel = model<IAdmin>("Admin", adminSchema);

export { AdminModel, IAdmin };
