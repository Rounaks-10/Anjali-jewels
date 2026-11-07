import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Enter a valid 10 digit Indian mobile number."],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Enter a valid email address."],
    },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: {
      type: String,
      trim: true,
      match: [/^\d{6}$/, "Enter a valid 6 digit pincode."],
    },
    landmark: { type: String, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true, timestamps: true },
);

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    productKey: { type: String, trim: true },
    name: { type: String, trim: true },
    price: { type: Number, min: 0, default: null },
    image: { type: String, trim: true },
    product: { type: String, trim: true },
    size: { type: String, trim: true },
    quantity: { type: Number, min: 1, default: 1 },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Enter at least 3 characters."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Enter a valid email address."],
      index: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Enter a valid 10 digit Indian mobile number."],
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters."],
      validate: {
        validator(password) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(
            password,
          );
        },
        message:
          "Use 8+ characters with uppercase, lowercase, number, and symbol.",
      },
      select: false,
    },
    acceptedTerms: {
      type: Boolean,
      required: true,
      validate: {
        validator: Boolean,
        message: "Please accept the terms to continue.",
      },
    },
    acceptsOrderUpdates: { type: Boolean, default: true },
    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailOtp: {
      type: String,
      default: null,
    },

    emailOtpExpiry: {
      type: Date,
      default: null,
    },
    addresses: { type: [addressSchema], default: [] },
    cartItems: { type: [cartItemSchema], default: [] },
    wishlist: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
      default: [],
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
