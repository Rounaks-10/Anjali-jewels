import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true },
    alt: { type: String, trim: true },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  // Product Details
  specifications: {
    type: Map,
    of: String,
    default: {},
  },

  // Product Details
  benefits: {
    type: [String],
    default: [],
  },

  //Sizes
  sizes: {
    type: [String],
    default: [],
  },

  images: {
    type: [imageSchema],
    default: [],
  },
});

productSchema.index({
  name: "text",
  description: "text",
  category: "text",
  subCategory: "text",
  productType: "text",
});

productSchema.index({ price: 1 });

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
