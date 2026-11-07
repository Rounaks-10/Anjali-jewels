import express from "express";
import jwt from "jsonwebtoken";
import {
  addUserAddress,
  clearUserCart,
  getUserProfile,
  loginUser,
  registerUser,
  verifyEmailOtp,
  resendOtp,
  adminLogin,
  removeUserAddress,
  toggleWishlistProduct,
  updateUserAddress,
  updateUserCart,
  updateUserProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : req.headers.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Please login again.",
    });
  }

  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("Received Token:", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decodedToken);

    req.userId = decodedToken.id;

    return next();
  } catch (error) {
    console.log("JWT ERROR:", error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

userRouter.post("/register", registerUser);
userRouter.post("/verify-otp", verifyEmailOtp);
userRouter.post(
  "/resend-otp",
  resendOtp
);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", authUser, getUserProfile);
userRouter.put("/profile", authUser, updateUserProfile);

userRouter.post("/address", authUser, addUserAddress);
userRouter.put("/address/:addressId", authUser, updateUserAddress);
userRouter.delete("/address/:addressId", authUser, removeUserAddress);

userRouter.put("/cart", authUser, updateUserCart);
userRouter.delete("/cart", authUser, clearUserCart);

userRouter.put("/wishlist/:productId", authUser, toggleWishlistProduct);
userRouter.put("/wishlist", authUser, toggleWishlistProduct);

export default userRouter;
