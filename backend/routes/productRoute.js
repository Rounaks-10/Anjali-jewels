import express from "express";
import {
  addProduct,
  removeProduct,
  singleProduct,
  totalProductList,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add", adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  addProduct,
);
productRouter.get("/list", totalProductList);
productRouter.post("/list", totalProductList);
productRouter.get("/single/:productId", singleProduct);
productRouter.get("/single/slug/:slug", singleProduct);
productRouter.post("/single", singleProduct);
productRouter.delete("/remove/:productId", removeProduct);
productRouter.delete("/remove/slug/:slug", removeProduct);
productRouter.delete("/remove/sku/:sku", removeProduct);
productRouter.post("/remove", removeProduct);

export default productRouter;
