import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartState";

const Cart = () => {
  const {
    cartItems,
    cartTotal,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    token,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (token) {
      navigate("/place-order");
      return;
    }

    navigate("/login", { state: { from: "/place-order" } });
  };

  return (
    <div className="mt-20 bg-white px-4 pb-16 sm:mt-8 lg:mt-0">
      <div className="py-5 text-sm text-gray-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="font-medium text-[#8a4a2f]">Cart</span>
      </div>

      <h1 className="font-serif text-3xl font-semibold text-[#2b0000]">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
          <img
            src="/public/empty-cart.svg"
            alt="Empty Cart"
            className="mb-6 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]"
          />

          <h2 className="font-serif text-2xl font-semibold text-[#2b0000]">
            Handpicked Elegance Awaits
          </h2>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
            Looks like you haven't added any jewellery to your cart yet. Explore
            our beautiful collection and find something special.
          </p>

          <Link
            to="/alljewellery"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-[#8a4a2f] px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#6f3923]"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            {cartItems.map((item) => {
              const itemPrice = Number(item.price) || 0;
              const itemTotal = itemPrice * item.quantity;

              return (
                <div
                  key={item.key}
                  className="grid gap-4 rounded-md border border-gray-200 p-4 sm:grid-cols-[120px_1fr_auto]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-square w-full rounded bg-[#f8f8f8] object-cover sm:w-[120px]"
                  />
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-black">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      Size: {item.size}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="flex h-10 items-center rounded border border-gray-300">
                        <button
                          type="button"
                          aria-label={`Decrease quantity for ${item.name}`}
                          disabled={item.quantity === 1}
                          onClick={() => decrementQuantity(item.key)}
                          className="h-full w-10 text-xl font-semibold text-[#8a4a2f] transition hover:bg-[#fff2ec] disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
                        >
                          -
                        </button>
                        <span className="min-w-10 px-3 text-center text-sm font-semibold text-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity for ${item.name}`}
                          onClick={() => incrementQuantity(item.key)}
                          className="h-full w-10 text-xl font-semibold text-[#8a4a2f] transition hover:bg-[#fff2ec]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        className="h-10 rounded border border-[#d9b8ab] px-4 text-sm font-semibold text-[#8a4a2f] transition hover:bg-[#fff2ec]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-serif text-lg font-semibold text-black">
                      {item.price
                        ? `${"\u20B9"} ${itemTotal.toLocaleString("en-IN")}`
                        : "Price on request"}
                    </p>
                    {item.price && item.quantity > 1 && (
                      <p className="mt-1 text-sm text-gray-500">
                        {`${"\u20B9"} ${itemPrice.toLocaleString("en-IN")} each`}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-md border border-[#ead7d0] bg-[#fffaf7] p-5">
            <h2 className="font-serif text-2xl font-semibold text-[#2b0000]">
              Order Summary
            </h2>
            <div className="mt-5 flex justify-between border-t border-[#ead7d0] pt-4 text-sm">
              <span className="text-gray-600">Total</span>
              <span className="font-semibold text-black">
                {`${"\u20B9"} ${cartTotal.toLocaleString("en-IN")}`}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-5 h-12 w-full rounded bg-[#8a4a2f] px-6 text-sm font-bold text-white transition hover:bg-[#6f3923]"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
