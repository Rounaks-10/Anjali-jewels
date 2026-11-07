import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import productModel from "../models/productModel.js";

const parseJsonValue = (value, fallback) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const parseArrayValue = (value) => {
  const parsedValue = parseJsonValue(value, []);

  if (Array.isArray(parsedValue)) {
    return parsedValue.filter(Boolean);
  }

  return String(parsedValue)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseBooleanValue = (value, fallback = false) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return String(value).toLowerCase() === "true";
};

const createSlug = (name) => {
  return String(name || "product")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getUploadedFiles = (files) => {
  if (!files) {
    return [];
  }

  if (Array.isArray(files)) {
    return files;
  }

  return Object.values(files).flat();
};

const uploadImages = async (files, productName) => {
  const uploadedFiles = getUploadedFiles(files);

  if (uploadedFiles.length === 0) {
    return [];
  }

  const uploadedImages = await Promise.all(
    uploadedFiles.map(async (file, index) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "anjali-jewels/products",
        resource_type: "image",
      });
      console.log(`Cloudinary image ${index + 1}: ${result.secure_url}`);

      return {
        url: result.secure_url,
        publicId: result.public_id,
        alt: `${productName} view ${index + 1}`,
        isPrimary: index === 0,
      };
    }),
  );

  return uploadedImages;
};

const normalizeBodyImages = (images, productName) => {
  const parsedImages = parseJsonValue(images, []);

  if (!Array.isArray(parsedImages)) {
    return [];
  }

  return parsedImages
    .map((image, index) => {
      if (!image) {
        return null;
      }

      if (typeof image === "string") {
        return {
          url: image,
          alt: `${productName} view ${index + 1}`,
          isPrimary: index === 0,
        };
      }

      return image;
    })
    .filter(Boolean);
};

const handleControllerError = (res, error) => {
  if (error?.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(error.errors)[0]?.message || "Validation failed.",
    });
  }

  if (error?.code === 11000) {
    const duplicateField = Object.keys(error.keyValue || {})[0] || "field";
    return res.status(409).json({
      success: false,
      message: `A product with this ${duplicateField} already exists.`,
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Something went wrong.",
  });
};

const addProduct = async (req, res) => {
  try {
    const specifications = parseJsonValue(req.body.specifications, {});
    const benefits = parseArrayValue(req.body.benefits);
    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
    console.log(specifications);
    console.log(benefits);
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);
    const {
      name,
      description,
      category,
      subCategory,
      productType,
      price,
      bestseller,
      isNewArrival,
    } = req.body;

    const images = await uploadImages(req.files, name);
    console.log("REQ BODY:", req.body);
    console.log("NEW ARRIVAL:", req.body.isNewArrival);
    const productData = {
      name,
      description,
      category,
      subCategory,
      productType,
      price: Number(price),
      bestseller: parseBooleanValue(bestseller),
      isNewArrival: parseBooleanValue(isNewArrival),
      specifications,
      benefits,
      sizes,
      images,
    };

    const product = new productModel(productData);
    await product.save();

    return res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    return handleControllerError(res, error);
  }
};

const totalProductList = async (req, res) => {
  try {
    const {
      category,
      gender,
      jewelleryType,
      metal,
      page = 1,
      product,
      search,
      sort = "sortOrder",
      minPrice,
      maxPrice,
      filters,
    } = req.query;

    const filter = {};

    // Extract gemstone filter selection

    if (category) filter.category = category;
    if (gender) filter.gender = String(gender).toLowerCase();
    if (jewelleryType) filter.jewelleryType = jewelleryType;
    if (metal) filter.metal = metal;
    if (product) filter.product = product;
    if (search) filter.$text = { $search: search };
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice !== undefined && minPrice !== "") {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined && maxPrice !== "") {
        filter.price.$lte = Number(maxPrice);
      }
    }
    let parsedFilters = [];

    if (filters) {
      try {
        parsedFilters = JSON.parse(filters);
      } catch {
        parsedFilters = Array.isArray(filters) ? filters : [filters];
      }
    }
    console.log("REQ QUERY:", req.query);
    console.log("FILTERS RECEIVED:", filters);
    console.log("PARSED FILTERS:", parsedFilters);

    // ----------------------
    // GEMSTONE FILTER (MAIN FEATURE)
    // ----------------------
    const isGemstoneSelected = parsedFilters.includes(
      "Jewellery with Gemstones",
    );

    if (isGemstoneSelected) {
      filter.$or = [
        { subCategory: { $regex: "gemstone", $options: "i" } },
        { description: { $regex: "gemstone", $options: "i" } },
        { name: { $regex: "gemstone", $options: "i" } },
      ];
    }

    // remove gemstone from normal filters
    parsedFilters = parsedFilters.filter(
      (f) => f !== "Jewellery with Gemstones",
    );
    //Jewellery with gemstones & platinum jewellery
    const jewelleryTypeFilters = [];

    //Gold Jewellery Filter By
    // const jewelleryTypeFilters = [];

    if (parsedFilters.includes("Gold Jewellery")) {
      jewelleryTypeFilters.push({
        $or: [
          { name: /gold/i },
          { description: /gold/i },
          { subCategory: /gold/i },
        ],
      });
    }

    if (parsedFilters.includes("Diamond Jewellery")) {
      jewelleryTypeFilters.push({
        $or: [
          { name: /diamond/i },
          { description: /diamond/i },
          { subCategory: /diamond/i },
        ],
      });
    }

    if (parsedFilters.includes("Platinum Jewellery")) {
      jewelleryTypeFilters.push({
        $or: [
          { name: /platinum/i },
          { description: /platinum/i },
          { subCategory: /platinum/i },
        ],
      });
    }

    if (parsedFilters.includes("Plain Jewellery with Stones")) {
      jewelleryTypeFilters.push({
        $and: [
          {
            $or: [
              {
                name: /(ruby|emerald|sapphire|amethyst|topaz|pearl|gemstone|stone)/i,
              },
              {
                description:
                  /(ruby|emerald|sapphire|amethyst|topaz|pearl|gemstone|stone)/i,
              },
              {
                subCategory:
                  /(ruby|emerald|sapphire|amethyst|topaz|pearl|gemstone|stone)/i,
              },
            ],
          },
          {
            $nor: [
              { name: /diamond/i },
              { description: /diamond/i },
              { subCategory: /diamond/i },
            ],
          },
        ],
      });
    }

    parsedFilters = parsedFilters.filter(
      (item) =>
        ![
          "Gold Jewellery",
          "Diamond Jewellery",
          "Platinum Jewellery",
          "Plain Jewellery with Stones",
        ].includes(item),
    );

    // ----------------------
    // PRODUCT TYPE FILTERS
    // ----------------------
    const productTypeFilters = [
      "Anklet",
      "Bangle",
      "Bracelet",
      "Chain",
      "Earrings",
      "Finger Ring",
      "Haram",
      "Jewellery Set",
      "Kada",
      "Maang Tikka",
    ];

    // Separate product type filters
    const selectedProductTypes = parsedFilters.filter((item) =>
      productTypeFilters.includes(item),
    );

    // Remove them from remaining filters
    parsedFilters = parsedFilters.filter(
      (item) => !productTypeFilters.includes(item),
    );

    // Apply productType filter
    if (selectedProductTypes.length > 0) {
      filter.productType = { $in: selectedProductTypes };
    }
    if (parsedFilters.length > 0) {
      filter.subCategory = { $in: parsedFilters };
    }
    console.log("Remaining parsedFilters:", parsedFilters);
    console.log("Selected product types:", selectedProductTypes);

    if (jewelleryTypeFilters.length > 0) {
      filter.$and = [...(filter.$and || []), ...jewelleryTypeFilters];
    }

    console.log("REQ QUERY:", req.query);
    console.log("FILTER:", JSON.stringify(filter));
    const limit = Math.max(Number(req.query.limit) || 60, 1);
    const skip = (Math.max(Number(page), 1) - 1) * limit;
    /*const sortMap = {
      newest: { createdAt: -1 },
      priceHighToLow: { price: -1 },
      priceLowToHigh: { price: 1 },
      sortOrder: { sortOrder: 1, createdAt: -1 },
    };*/
    let sortOption = { createdAt: -1 };

    if (sort === "priceLowToHigh") {
      sortOption = { price: 1 };
    }

    if (sort === "priceHighToLow") {
      sortOption = { price: -1 };
    }

    if (sort === "newArrivals") {
      filter.isNewArrival = true;
      sortOption = { createdAt: -1 };
    }

    if (sort === "bestSeller") {
      filter.bestseller = true;
      sortOption = { createdAt: -1 };
    }

    const [products, totalProducts] = await Promise.all([
      productModel.find(filter).sort(sortOption).skip(skip).limit(limit),

      productModel.countDocuments(filter),
    ]);
    console.log(
      "FILTERED PRODUCTS:",
      products.map((p) => ({
        name: p.name,
        price: p.price,
      })),
    );

    console.log("TOTAL PRODUCTS:", totalProducts);

    return res.json({
      success: true,
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    console.error("PRODUCT LIST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const lookupValue =
      req.params.productId ||
      req.params.id ||
      req.params.slug ||
      req.body.productId ||
      req.body.id ||
      req.body.slug;

    const product = mongoose.Types.ObjectId.isValid(lookupValue)
      ? await productModel.findById(lookupValue)
      : await productModel.findOne({
          $or: [
            { slug: lookupValue },
            { sku: String(lookupValue).toUpperCase() },
          ],
        });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const removeProduct = async (req, res) => {
  try {
    const lookupValue =
      req.params.productId ||
      req.params.id ||
      req.params.slug ||
      req.body.productId ||
      req.body.id ||
      req.body._id ||
      req.body.slug ||
      req.body.sku;

    if (!lookupValue) {
      return res.status(400).json({
        success: false,
        message: "Product id, slug, or sku is required.",
      });
    }

    const product = mongoose.Types.ObjectId.isValid(lookupValue)
      ? await productModel.findByIdAndDelete(lookupValue)
      : await productModel.findOneAndDelete({
          $or: [
            { slug: lookupValue },
            { sku: String(lookupValue).toUpperCase() },
          ],
        });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const publicIds = product.images
      .map((image) => image.publicId)
      .filter(Boolean);

    if (publicIds.length > 0) {
      await Promise.allSettled(
        publicIds.map((publicId) => cloudinary.uploader.destroy(publicId)),
      );
    }

    return res.json({
      success: true,
      message: "Product removed successfully.",
      product,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export { addProduct, removeProduct, singleProduct, totalProductList };
