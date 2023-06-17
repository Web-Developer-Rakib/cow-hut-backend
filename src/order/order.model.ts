import { model, Schema, Types } from "mongoose";

interface IOrder extends Document {
  cow: Types.ObjectId;
  buyer: Types.ObjectId;
}

const orderSchema = new Schema({
  cow: {
    type: Schema.Types.ObjectId,
    ref: "Cow",
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const OrderModel = model<IOrder>("Order", orderSchema);
export { IOrder, OrderModel };
