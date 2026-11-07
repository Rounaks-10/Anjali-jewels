import React, { useCallback, useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./cartState";
import axios from "axios";
const getCartItemKey = (product, size) => {
  const productId = product?._id || product?.id || product?.productId;

  return `${productId}-${size || "default"}`;
};
const normalizeCartItem = (item) => ({
  key: `${item.productId || item.id || item.name || "product"}-${item.size || ""}`,
  id: item.productId || item.id,
  name: item.name,
  price: item.price,
  image: item.image,
  product: item.product,
  size: item.size,
  quantity: item.quantity || 1,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //Wishlist Functionality
  const toggleWishlist = useCallback(
    async (productId) => {
      if (!token) {
        toast.error("Please login first"); //checks login
        return;
      }

      try {
        console.log("Token:", token);

        const response = await axios.put(
          `${backendUrl}/api/user/wishlist/${productId}`, //calls backend API
          {},
          {
            headers: { token },
          },
        );

        if (response.data.success) {
          setWishlist(response.data.wishlist || []); //updates frontend state

          toast.success(
            response.data.action === "added"
              ? "Added to wishlist"
              : "Removed from wishlist",
          );
        }
      } catch (error) {
        console.log(error);
        toast.error("Wishlist update failed");
      }
    },
    [backendUrl, token],
  );
  //Remove from wishlist
  const removeFromWishlist = useCallback(
    async (productId) => {
      if (!token) {
        toast.error("Please login first");
        return;
      }

      try {
        const response = await axios.put(
          `${backendUrl}/api/user/wishlist/${productId}`,
          {},
          { headers: { token } },
        );

        if (response.data.success) {
          setWishlist(response.data.wishlist || []);
          toast.success("Removed from wishlist");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to remove from wishlist");
      }
    },
    [backendUrl, token],
  );

  const getWishlist = useCallback(
    async (currentToken = token) => {
      if (!currentToken) return;

      try {
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: {
            token: currentToken,
          },
        });

        if (response.data.success) {
          setWishlist(response.data.user.wishlist || []);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [backendUrl, token],
  );

  const addToCart = useCallback(
    async (product, size) => {
      if (!product) return;

      const key = getCartItemKey(product, size);

      setCartItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.key === key);

        if (existingItem) {
          return currentItems.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }

        return [
          ...currentItems,
          {
            key,
            id: product._id || product.id || product.productId,
            name: product.name,
            price: product.price,
            image: product.images?.[0]?.url || product.image,
            size,
            quantity: 1,
          },
        ];
      });

      // backend sync (optional)
      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/add`,
            {
              productId: product._id || product.id,
              size,
            },
            { headers: { token } },
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    [backendUrl, token],
  );
  const moveToCartFromWishlist = useCallback(
    (item) => {
      const product = item.product || item;

      const size = item.size || null;

      addToCart(product, size);

      removeFromWishlist(
        item._id || item.id || item.productId || item.product?._id,
      );
    },
    [addToCart, removeFromWishlist],
  );
  const updateQuantity = useCallback(
    (key, change) => {
      setCartItems((currentItems) => {
        const updatedItems = currentItems.map((item) => {
          if (item.key !== key) {
            //If item key doesn't match, return item as is
            return item;
          }

          const nextQuantity = Math.max(1, item.quantity + change); //Calculate next quantity, ensuring it doesn't go below 1
          return { ...item, quantity: nextQuantity }; //Return updated item with new quantity
        });

        const updatedItem = updatedItems.find((item) => item.key === key); //Find the updated item to send update request to backend

        if (updatedItem && token) {
          axios
            .post(
              `${backendUrl}/api/cart/update`,
              {
                productId: updatedItem.id,
                size: updatedItem.size,
                quantity: updatedItem.quantity,
              },
              { headers: { token } },
            )
            .catch((error) => {
              console.log(error);
              toast.error(error.message || "Failed to update cart quantity.");
            });
        }

        return updatedItems;
      });
    },
    [backendUrl, token],
  );

  const incrementQuantity = useCallback(
    (key) => {
      updateQuantity(key, 1);
    },
    [updateQuantity],
  );

  const decrementQuantity = useCallback(
    (key) => {
      updateQuantity(key, -1);
    },
    [updateQuantity],
  );

  const removeFromCart = useCallback(
    (key) => {
      setCartItems((currentItems) => {
        const itemToRemove = currentItems.find((item) => item.key === key);

        if (itemToRemove && token) {
          axios
            .post(
              `${backendUrl}/api/cart/update`,
              {
                productId: itemToRemove.id,
                size: itemToRemove.size,
                quantity: 0,
              },
              { headers: { token } },
            )
            .catch((error) => {
              console.log(error);
              toast.error(error.message || "Failed to remove cart item.");
            });
        }

        return currentItems.filter((item) => item.key !== key);
      });
    },
    [backendUrl, token],
  );

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + (Number(item.price) || 0) * item.quantity;
    }, 0);
  }, [cartItems]);
  //Get product data

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = useCallback(
    async (currentToken = token) => {
      if (!currentToken) {
        return;
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          { headers: { token: currentToken } },
        );

        if (response.data.success) {
          const savedItems = Array.isArray(response.data.cartItems)
            ? response.data.cartItems
            : [];

          setCartItems(savedItems.map(normalizeCartItem));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Failed to load cart.");
      }
    },
    [backendUrl, token],
  );

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
      getWishlist(storedToken);
    }
  }, [getUserCart, getWishlist]);

  //Wishlist
  const isWishlisted = useCallback(
    (productId) => {
      return wishlist.some(
        (item) => item._id === productId || item.id === productId,
      );
    },
    [wishlist],
  );

  const value = useMemo(
    () => ({
      addToCart,
      cartCount,
      cartItems,
      cartTotal,
      decrementQuantity,
      incrementQuantity,
      removeFromCart,
      backendUrl,
      setToken,
      token,
      wishlist,
      toggleWishlist,
      isWishlisted,
      removeFromWishlist,
      moveToCartFromWishlist,
    }),
    [
      addToCart,
      cartCount,
      cartItems,
      cartTotal,
      decrementQuantity,
      incrementQuantity,
      removeFromCart,
      token,
      wishlist,
      toggleWishlist,
      isWishlisted,
      removeFromWishlist,
      moveToCartFromWishlist,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
