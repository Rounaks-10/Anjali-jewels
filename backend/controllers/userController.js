import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import crypto from "crypto";
import { sendEmailOtp } from "../services/emailOtpService.js";
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const getUserId = (req) => {
  return req.userId || req.user?.id || req.body.userId || req.params.userId;
};

const getPublicUser = (user) => {
  const userObject = user.toObject ? user.toObject() : user;
  delete userObject.password;
  return userObject;
};

const handleControllerError = (res, error) => {
  if (error?.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(error.errors)[0]?.message || "Validation failed",
    });
  }

  if (error?.code === 11000) {
    const duplicateField = Object.keys(error.keyValue || {})[0] || "field";
    return res.status(409).json({
      success: false,
      message: `This ${duplicateField} is already registered.`,
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Something went wrong.",
  });
};

const registerUser = async (req, res) => {
  try {
    const {
      acceptedTerms,
      email,
      name,
      password,
      phone,
      acceptsOrderUpdates = true,
    } = req.body;

    const existingUser = await userModel.findOne({
      $or: [
        {
          email: String(email || "")
            .toLowerCase()
            .trim(),
        },
        { phone },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          existingUser.email ===
          String(email || "")
            .toLowerCase()
            .trim()
            ? "This email is already registered."
            : "This mobile number is already registered.",
      });
    }

    /*const user = await userModel.create({
      acceptedTerms,
      acceptsOrderUpdates,
      email,
      name,
      password,
      phone,
    });

    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: getPublicUser(user),
    });*/
    const otp = generateOtp();

    const user = await userModel.create({
      acceptedTerms,
      acceptsOrderUpdates,
      email,
      name,
      password,
      phone,

      emailOtp: otp,
      emailOtpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmailOtp(user.email, user.name, otp);

    return res.status(201).json({
      success: true,
      requiresVerification: true,
      email: user.email,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};
const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.emailOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.emailOtpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.emailVerified = true;
    user.emailOtp = null;
    user.emailOtpExpiry = null;

    await user.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: getPublicUser(user),
      message: "Email verified successfully",
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = generateOtp();

    user.emailOtp = otp;

    user.emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendEmailOtp(user.email, user.name, otp);

    res.json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({
        email: String(email || "")
          .toLowerCase()
          .trim(),
      })
      .select("+password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    
    if (!user.emailVerified) {
      return res
        .status(403)
        .json({ success: false, message: "Please verify your email first." });
    }
    const isPasswordMatch = await user.comparePassword(password || "");

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = createToken(user._id);

    return res.json({
      success: true,
      message: "Logged in successfully.",
      token,
      user: getPublicUser(user),
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = getUserId(req);
    const user = await userModel.findById(userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.json({
      success: true,
      user: getPublicUser(user),
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = getUserId(req);
    const allowedUpdates = ["name", "phone", "acceptsOrderUpdates"];
    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await userModel.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully.",
      user: getPublicUser(user),
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const addUserAddress = async (req, res) => {
  try {
    const userId = getUserId(req);
    const address = req.body.address || req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (address.isDefault) {
      user.addresses.forEach((savedAddress) => {
        savedAddress.isDefault = false;
      });
    }

    user.addresses.push(address);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Address added successfully.",
      addresses: user.addresses,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};
//Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const updateUserAddress = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { addressId } = req.params;
    const updates = req.body.address || req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    if (updates.isDefault) {
      user.addresses.forEach((savedAddress) => {
        savedAddress.isDefault = false;
      });
    }

    address.set(updates);
    await user.save();

    return res.json({
      success: true,
      message: "Address updated successfully.",
      addresses: user.addresses,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const removeUserAddress = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { addressId } = req.params;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    address.deleteOne();
    await user.save();

    return res.json({
      success: true,
      message: "Address removed successfully.",
      addresses: user.addresses,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const updateUserCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    const cartItems = req.body.cartItems || [];

    const user = await userModel.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.json({
      success: true,
      message: "Cart updated successfully.",
      cartItems: user.cartItems,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const clearUserCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    const user = await userModel.findByIdAndUpdate(
      userId,
      { cartItems: [] },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.json({
      success: true,
      message: "Cart cleared successfully.",
      cartItems: user.cartItems,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const toggleWishlistProduct = async (req, res) => {
  try {
    const userId = getUserId(req);
    const productId = req.body.productId || req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id.",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const productExists = user.wishlist.some(
      (savedProductId) => savedProductId.toString() === productId,
    );

    if (productExists) {
      user.wishlist = user.wishlist.filter(
        (savedProductId) => savedProductId.toString() !== productId,
      );
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    await user.populate("wishlist");

    return res.json({
      success: true,
      action: productExists ? "removed" : "added",
      message: productExists
        ? "Product removed from wishlist."
        : "Product added to wishlist.",
      wishlist: user.wishlist,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export {
  addUserAddress,
  adminLogin,
  clearUserCart,
  getUserProfile,
  loginUser,
  registerUser,
  verifyEmailOtp,
  resendOtp,
  removeUserAddress,
  toggleWishlistProduct,
  updateUserAddress,
  updateUserCart,
  updateUserProfile,
};
