import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cartState";
import { getTitleFromProductSlug } from "../utils/productRoutes";
const formatPrice = (price) => {
  if (!price) {
    return "Price on request";
  }

  return `${"\u20B9"} ${Number(price).toLocaleString("en-IN")}`;
};

const ProductDetails = () => {
  const { productSlug } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const product = state?.product;
  const productName = product?.name ?? getTitleFromProductSlug(productSlug);
  const availableSizes = product?.sizes || [];

  const [selectedSize, setSelectedSize] = React.useState("");
  const [cartMessage, setCartMessage] = React.useState("");
  React.useEffect(() => {
    if (availableSizes.length && !selectedSize) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes]);
  const productImages = [product?.image, product?.hoverImage].filter(Boolean);
  const galleryImages =
    productImages.length > 0 ? productImages : ["/assets/alljew/1.webp"];
  const skuId = `${String(productName)
    .replace(/[^A-Z0-9]/gi, "")
    .slice(0, 10)
    .toUpperCase()}${product?.id ?? "000"}`;

  const specificationItems = Object.entries(product?.specifications || {});
  const highlights = Object.entries(product?.specifications || {}).slice(0, 3);
  const productForCart = {
    id: product?.id ?? skuId,
    name: productName,
    price: product?.price,
    image: galleryImages[0],
    product: product?.product ?? "Finger Ring",
  };

  const handleAddToCart = () => {
    addToCart(productForCart, selectedSize);
    setCartMessage(`Added size ${selectedSize} to your cart`);
  };

  const handleBuyNow = () => {
    addToCart(productForCart, selectedSize);
    navigate("/cart");
  };

  return (
    <div className="mt-20 bg-white pb-16 sm:mt-8 lg:mt-0">
      <div className="px-4 py-5 text-sm text-gray-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        <Link to="/alljewellery" className="hover:underline">
          Product
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="font-medium text-[#8a4a2f]">{productName}</span>
      </div>

      <div className="grid gap-8 px-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-start">
        <div className="grid gap-4 sm:grid-cols-2">
          {galleryImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-md bg-[#f8f8f8]"
            >
              <img
                src={image}
                alt={`${productName} view ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              {index === 1 && (
                <button
                  type="button"
                  className="absolute bottom-4 left-4 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm"
                >
                  View Similar
                </button>
              )}
            </div>
          ))}
        </div>

        <section className="lg:sticky lg:top-24">
          <div className="border-b border-gray-200 pb-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-semibold leading-tight text-[#2b0000] sm:text-4xl">
                  {productName}
                </h1>
                <p className="mt-2 text-sm text-gray-500">SKU ID : {skuId}</p>
              </div>
              {product && (
                <button
                  className="heart-btn"
                  onClick={() => toggleWishlist(product?.id)}
                >
                  <img
                    src={
                      isWishlisted(product?.id)
                        ? "/assets/heart-burgundy-filled.svg"
                        : "/assets/alljew/heart-ash-border.svg"
                    }
                    alt="Wishlist"
                  />
                </button>
              )}
            </div>

            <p className="mt-6 font-serif text-3xl font-semibold text-black">
              {formatPrice(product?.price)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Incl. taxes and charges
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 border-b border-gray-200 py-5 text-center">
            {highlights.map(([label, value]) => (
              <div key={label} className="rounded-md bg-[#fbf7f4] px-3 py-4">
                <p className="text-xs text-gray-500">{label}</p>

                <p className="mt-1 font-semibold text-[#2b0000]">{value}</p>
              </div>
            ))}
          </div>

          <div className="border-b border-gray-200 py-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-black">Select Size</p>
              <button
                type="button"
                className="text-sm text-[#8a4a2f] underline"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {availableSizes.length > 0 ? (
                availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setCartMessage("");
                    }}
                    className={`h-11 min-w-12 rounded border px-4 text-sm font-semibold ${
                      selectedSize === size
                        ? "border-[#8a4a2f] bg-[#fbf0f1] text-[#8a4a2f]"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  This product is available in one standard size.
                </p>
              )}
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Selected Size:{" "}
              <span className="font-semibold text-[#2b0000]">
                {selectedSize || "Standard"}
              </span>
            </p>
          </div>

          <div className="grid gap-3 border-b border-gray-200 py-5 sm:grid-cols-2">
            <label className="flex h-12 items-center rounded border border-gray-300 px-4">
              <input
                type="text"
                placeholder="Enter pincode"
                className="w-full text-sm outline-none placeholder:text-gray-500"
              />
              <button
                type="button"
                className="ml-3 text-sm font-semibold text-[#8a4a2f]"
              >
                Check
              </button>
            </label>
            <button
              type="button"
              className="h-12 rounded border border-[#8a4a2f] px-4 text-sm font-semibold text-[#8a4a2f]"
            >
              Check Store Availability
            </button>
          </div>

          <div className="grid gap-3 py-5 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="h-14 rounded bg-[#8a4a2f] px-6 text-sm font-bold text-white transition hover:bg-[#6f3923]"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="h-14 rounded border border-[#8a4a2f] px-6 text-sm font-bold text-[#8a4a2f] transition hover:bg-[#fbf0f1]"
            >
              Buy Now
            </button>
          </div>
          {cartMessage && (
            <p className="-mt-2 mb-4 text-sm font-medium text-[#1f7a3a]">
              {cartMessage}
            </p>
          )}

          <div className="space-y-3">
            <div className="rounded-md border border-[#ead7d0] bg-[#fffaf7] p-4">
              <p className="font-semibold text-[#2b0000]">
                Exchange your old gold
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Get an estimated exchange value at checkout.
              </p>
            </div>
            <div className="rounded-md border border-[#ead7d0] bg-[#fffaf7] p-4">
              <p className="font-semibold text-[#2b0000]">Offers for you</p>
              <p className="mt-1 text-sm text-gray-600">
                Flat benefits and bank offers can be applied at payment.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-12 px-4">
        <h2 className="font-serif text-2xl font-semibold text-[#2b0000]">
          Product Details
        </h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-md border border-gray-200 p-5">
            <p className="font-semibold text-black">Product Information</p>
            <div className="mt-4 space-y-3 text-sm">
              {specificationItems.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6">
                  <span className="text-gray-500">{label}</span>
                  <span className="text-right font-medium capitalize text-black">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-gray-200 p-5">
            <p className="font-semibold text-black">Description</p>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              {product?.description}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {product?.benefits?.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded bg-[#fbf7f4] px-4 py-3 text-center text-sm font-semibold text-[#2b0000]"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
