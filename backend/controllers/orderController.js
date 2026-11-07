import { createRequire } from "node:module";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
const require = createRequire(import.meta.url);
const { getIndiaPincode } = require("india-pincode");
//global variables
const currency = "inr";
const deliveryCharge = 10;
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      paymentMethod = "COD",
      customer,
      shippingAddress,
    } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Order items are required." });
    }

    const user = await userModel
      .findById(userId)
      .select("name email phone addresses");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const defaultAddress =
      user.addresses?.find((addr) => addr.isDefault) ||
      user.addresses?.[0] ||
      {};

    const pincodeValue = String(
      shippingAddress?.pincode || defaultAddress.pincode || "",
    ).trim();

    const orderCustomer = {
      fullName: customer?.fullName || user.name || "",
      phone: customer?.phone || user.phone || "",
      email: customer?.email || user.email || "",
    };

    const orderAddress = {
      address: shippingAddress?.address || defaultAddress.address || "",
      city: shippingAddress?.city || defaultAddress.city || "",
      state: shippingAddress?.state || defaultAddress.state || "",
      pincode: pincodeValue,
      landmark: shippingAddress?.landmark || defaultAddress.landmark || "",
    };

    if (!/^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(orderCustomer.fullName)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid full name." });
    }

    if (!/^[6-9]\d{9}$/.test(orderCustomer.phone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        orderCustomer.email,
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address in the format name@example.com.",
      });
    }

    if (
      !/^[A-Za-z0-9][A-Za-z0-9\s,./#()-]{9,149}$/.test(orderAddress.address)
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a complete delivery address.",
      });
    }

    if (!/^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(orderAddress.city)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid city name." });
    }

    if (!/^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(orderAddress.state)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid state name." });
    }

    if (!/^[1-9]\d{5}$/.test(pincodeValue)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 6-digit Indian pincode.",
      });
    }

    const pincodeLookup = getIndiaPincode();
    const pincodeResult = pincodeLookup.getByPincode(pincodeValue);

    if (!pincodeResult.success) {
      return res.status(400).json({
        success: false,
        message:
          "Enter a valid Indian pincode that exists in our delivery database.",
      });
    }

    if (orderAddress.landmark && orderAddress.landmark.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Landmark should have at least 3 characters.",
      });
    }

    const normalizedItems = items.map((item) => ({
      productId: item.productId || item._id,
      name: item.name || "",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      size: item.size || "",
      image: item.image || "",
    }));

    const order = await orderModel.create({
      userId,
      items: normalizedItems,
      totalAmount:
        Number(totalAmount) ||
        normalizedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      paymentMethod: String(paymentMethod || "COD").toUpperCase(),
      paymentStatus: "Pending",
      orderStatus: "Order Placed",
      customer: orderCustomer,
      shippingAddress: orderAddress,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, totalAmount, customer, shippingAddress } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Order items are required." });
    }

    const normalizedItems = items.map((item) => ({
      productId: item.productId || item._id,
      name: item.name || "",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      size: item.size || "",
      image: item.image || "",
    }));

    const orderData = {
      userId,
      items: normalizedItems,
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: "Razorpay",
      paymentStatus: "Pending",
      orderStatus: "Order Placed",
      customer: {
        fullName: customer?.fullName || "",
        phone: customer?.phone || "",
        email: customer?.email || "",
      },
      shippingAddress: {
        address: shippingAddress?.address || "",
        city: shippingAddress?.city || "",
        state: shippingAddress?.state || "",
        pincode: shippingAddress?.pincode || "",
        landmark: shippingAddress?.landmark || "",
      },
    };

    const newOrder = await orderModel.create(orderData);

    const options = {
      amount: Math.max(Number(orderData.totalAmount) || 0, 0)*100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    console.log("Received Total Amount:", totalAmount);
console.log("Amount sent to Razorpay:", options.amount);
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({
        success: true,
        key: process.env.RAZORPAY_KEY_ID,
        order,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//User order data for the logged-in user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId." });
    }

    const orders = await orderModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { orderStatus: status });
    res.json({ success: true, message: "Order status updated." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus };
