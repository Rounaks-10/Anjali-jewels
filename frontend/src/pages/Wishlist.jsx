import React from "react";
import { useCart } from "../context/cartState";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCartFromWishlist } = useCart();

  return (
    <div className="container mx-auto mt-24 px-4">
      <h1 className="mb-6 text-3xl text-[#8a4a2f] font-bold">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No products in wishlist</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {wishlist.map((item) => {
            const productId =
              item._id || item.id || item.productId || item.product?._id;

            return (
              <div
                key={item._id}
                key={productId}
                className="border p-3 rounded flex flex-col"
              >
                <img
                  src={item.images?.[0]?.url}
                  alt={item.name}
                  className="aspect-square w-full object-cover"
                />

                <h3 className="mt-2 font-medium">{item.name}</h3>
                <div className="flex gap-12 mt-auto">
                  <p className="mb-3">₹{item.price}</p>
                  <img
                    src="/assets/trash.png" // <-- put your icon path here
                    alt="Delete"
                    onClick={() =>
                      removeFromWishlist(item._id || item.productId || item.id)
                    }
                    className="w-5 h-5 cursor-pointer hover:opacity-70"
                  />
                </div>
                {/* BUTTONS */}
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => moveToCartFromWishlist(item)}
                    className="flex-1 bg-[#8a4a2f] py-2 text-white  rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
