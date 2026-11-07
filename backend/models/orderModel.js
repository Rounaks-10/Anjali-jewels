import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    size: { type: String, trim: true },
    image: { type: String, trim: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: { type: [orderItemSchema], required: true, default: [] },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, default: "COD" },
    paymentStatus: { type: String, default: "Pending" },
    orderStatus: { type: String, default: "Order Placed" },
    customer: {
      fullName: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
    },
    shippingAddress: {
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true },
      landmark: { type: String, trim: true },
    },
  },
  { timestamps: true },
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
