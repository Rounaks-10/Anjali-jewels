import userModel from "../models/userModel.js";

const getProductId = (product) =>
  product?._id || product?.id || product?.productId;

const buildCartItem = (product, size) => ({
  productId: getProductId(product),
  productKey: `${getProductId(product) || "product"}-${size}`,
  name: product?.name || "",
  price: Number(product?.price) || 0,
  image: product?.image || "",
  product: product?.product || "",
  size,
  quantity: 1,
});

const addToCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const { product, size } = req.body;

    if (!userId || !product || !size) {
      return res.status(400).json({
        success: false,
        message: "Missing userId, product, or size.",
      });
    }

    const user = await userModel.findById(userId); //Find user by ID

    if (!user) {
      //If user not found, return error
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const productId = getProductId(product); //Get product ID from product object
    const existingItem = user.cartItems.find(
      //Check if product with same size already exists in cart
      (item) =>
        String(item.productId) === String(productId) && item.size === size,
    );

    if (existingItem) {
      //If exists, increment quantity
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(buildCartItem(product, size)); //If not, add new item to cart
    }

    await user.save();

    return res.json({
      success: true,
      message: "Added to Cart",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;

    if (!userId || !productId || !size) {
      return res.status(400).json({
        success: false,
        message: "Missing userId, productId, or size.",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const existingItemIndex = user.cartItems.findIndex(
      (item) =>
        String(item.productId) === String(productId) && item.size === size,
    );

    if (existingItemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found." });
    }

    const nextQuantity = Number(quantity);

    if (!Number.isFinite(nextQuantity) || nextQuantity <= 0) {
      user.cartItems.splice(existingItemIndex, 1);
    } else {
      user.cartItems[existingItemIndex].quantity = nextQuantity;
    }

    await user.save();

    return res.json({
      success: true,
      message: "Cart Updated",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId." });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.json({ success: true, cartItems: user.cartItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
