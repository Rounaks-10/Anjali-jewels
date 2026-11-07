import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartState";

const formatPrice = (price) => {
  const numericPrice = Number(price) || 0;

  return `${"\u20B9"} ${numericPrice.toLocaleString("en-IN")}`;
};

const inputClassName =
  "mt-2 h-12 w-full rounded border border-gray-300 px-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#8a4a2f] focus:ring-2 focus:ring-[#ead7d0]";

const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const INDIAN_PINCODE_REGEX = /^[1-9]\d{5}$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const ADDRESS_REGEX = /^[A-Za-z0-9][A-Za-z0-9\s,./#()-]{9,149}$/;
const PLACE_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;

const getInputClassName = (hasError) =>
  `${inputClassName} ${hasError ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}`.trim();

const PlaceOrder = () => {
  const { backendUrl, cartCount, cartItems, cartTotal, token } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = React.useState("COD");
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState({});

  const grandTotal = cartTotal;
  const hasPriceOnRequestItem = cartItems.some((item) => !item.price);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  React.useEffect(() => {
    if (!token) {
      navigate("/login", { state: { from: "/place-order" } });
    }
  }, [navigate, token]);

  const validateOrderForm = (customer, shippingAddress) => {
    const errors = {};

    if (!NAME_REGEX.test(customer.fullName)) {
      errors.fullName = "Enter a valid full name with at least 2 letters.";
    }

    if (!INDIAN_PHONE_REGEX.test(customer.phone)) {
      errors.phone =
        "Enter a valid 10-digit Indian mobile number starting with 6–9.";
    }

    if (!EMAIL_REGEX.test(customer.email)) {
      errors.email =
        "Enter a valid email address in the format name@example.com.";
    }

    if (!ADDRESS_REGEX.test(shippingAddress.address)) {
      errors.address =
        "Enter a complete delivery address with at least 10 characters.";
    }

    if (!PLACE_REGEX.test(shippingAddress.city)) {
      errors.city = "Enter a valid city name.";
    }

    if (!PLACE_REGEX.test(shippingAddress.state)) {
      errors.state = "Enter a valid state name.";
    }

    if (!INDIAN_PINCODE_REGEX.test(shippingAddress.pincode)) {
      errors.pincode = "Enter a valid 6-digit Indian pincode.";
    }

    if (
      shippingAddress.landmark &&
      shippingAddress.landmark.trim().length < 3
    ) {
      errors.landmark = "Landmark should have at least 3 characters.";
    }

    return errors;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      navigate("/login", { state: { from: "/place-order" } });
      return;
    }

    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const customer = {
      fullName: String(formData.get("fullName") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
    };

    const shippingAddress = {
      address: String(formData.get("address") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      state: String(formData.get("state") || "").trim(),
      pincode: String(formData.get("pincode") || "").trim(),
      landmark: String(formData.get("landmark") || "").trim(),
    };

    const errors = validateOrderForm(customer, shippingAddress);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error(
        "Please fix the highlighted delivery details before placing the order.",
      );
      return;
    }

    setValidationErrors({});

    const payload = {
      paymentMethod,
      totalAmount: cartTotal,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        size: item.size || "",
        image: item.image || "",
      })),
      customer,
      shippingAddress,
    };

    try {
      setIsSubmitting(true);

      if (paymentMethod === "razorpay") {
        const scriptReady = await loadRazorpayScript();

        if (!scriptReady || !window.Razorpay) {
          toast.error("Razorpay checkout is unavailable right now.");
          return;
        }

        const razorpayResponse = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          {
            ...payload,
            totalAmount: Number(cartTotal) || 0,
          },
          { headers: { token } },
        );
        console.log("Razorpay Response:", razorpayResponse.data);
        if (
          !razorpayResponse.data?.success ||
          !razorpayResponse.data?.order?.id
        ) {
          toast.error(
            razorpayResponse.data?.message ||
              "Unable to start Razorpay payment.",
          );
          return;
        }

        const options = {
          key: razorpayResponse.data.key || "rzp_test_Sxv3d6yEDUSRgE",
          amount: razorpayResponse.data.order.amount,
          currency: razorpayResponse.data.order.currency || "INR",
          name: "Anjali Jewels",
          description: "Jewellery order payment",
          order_id: razorpayResponse.data.order.id,
          prefill: {
            name: customer.fullName,
            email: customer.email,
            contact: customer.phone,
          },
          handler: () => {
            setOrderPlaced(true);
            toast.success("Payment successful. Your order is being processed.");
            navigate("/orders");
          },
          modal: {
            ondismiss: () => {
              toast.info("Payment cancelled.");
            },
          },
        };

        console.log("Frontend Amount:", options.amount);
        console.log("Order ID:", options.order_id);

        const rzp = new window.Razorpay(options);
        rzp.open();
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        payload,
        { headers: { token } },
      );

      if (response.data?.success) {
        setOrderPlaced(true);
        toast.success(response.data.message || "Order placed successfully.");
        navigate("/orders");
      } else {
        toast.error(response.data?.message || "Unable to place order.");
      }
    } catch (error) {
      const message = error.response?.data?.message;

      if (
        message ===
        "Enter a valid Indian pincode that exists in our delivery database."
      ) {
        setValidationErrors((prev) => ({
          ...prev,
          pincode: message,
        }));
      }

      console.error(error);
      toast.error(message || "Failed to place order.");
      console.error("Order Error:", error.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="mt-20 bg-white px-4 pb-16 sm:mt-8 lg:mt-0">
        <div className="py-5 text-sm text-gray-600">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">{">"}</span>
          <span className="font-medium text-[#8a4a2f]">Place Order</span>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-md border border-gray-200 p-8 text-center">
          <h1 className="font-serif text-3xl font-semibold text-[#2b0000]">
            Your cart is empty
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Add jewellery to your cart before placing an order.
          </p>
          <Link
            to="/alljewellery"
            className="mt-6 inline-flex h-11 items-center justify-center rounded bg-[#8a4a2f] px-6 text-sm font-bold text-white transition hover:bg-[#6f3923]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 bg-white px-4 pb-16 sm:mt-8 lg:mt-0">
      <div className="py-5 text-sm text-gray-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="font-medium text-[#8a4a2f]">Place Order</span>
      </div>

      <div className="flex flex-col gap-2 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-[#8a4a2f]">
            Secure checkout
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#2b0000] sm:text-4xl">
            Place Your Order
          </h1>
        </div>
        <p className="text-sm text-gray-600">
          {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {orderPlaced && (
        <div className="mt-6 rounded-md border border-[#b7dfc1] bg-[#f3fbf5] px-5 py-4 text-sm font-medium text-[#1f7a3a]">
          Order request received. Our team will contact you shortly to confirm
          availability and payment.
        </div>
      )}

      <form
        onSubmit={handlePlaceOrder}
        className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start"
      >
        <div className="space-y-6">
          <section className="rounded-md border border-gray-200 p-5">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#2b0000]">
                  Contact Details
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  We will use these details for delivery updates.
                </p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff2ec] text-sm font-bold text-[#8a4a2f]">
                1
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-black">
                Full Name
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter full name"
                  className={getInputClassName(
                    Boolean(validationErrors.fullName),
                  )}
                  aria-invalid={Boolean(validationErrors.fullName)}
                />
                {validationErrors.fullName && (
                  <p className="mt-1 text-xs text-red-600">
                    {validationErrors.fullName}
                  </p>
                )}
              </label>
              <label className="text-sm font-semibold text-black">
                Mobile Number
                <input
                  type="tel"
                  name="phone"
                  required
                  inputMode="numeric"
                  pattern="^[6-9]\d{9}$"
                  maxLength={10}
                  placeholder="Enter 10-digit Indian mobile number"
                  className={getInputClassName(Boolean(validationErrors.phone))}
                  aria-invalid={Boolean(validationErrors.phone)}
                />
                {validationErrors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {validationErrors.phone}
                  </p>
                )}
              </label>
              <label className="text-sm font-semibold text-black sm:col-span-2">
                Email Address
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email address"
                  className={getInputClassName(Boolean(validationErrors.email))}
                  aria-invalid={Boolean(validationErrors.email)}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {validationErrors.email}
                  </p>
                )}
              </label>
            </div>
          </section>

          <section className="rounded-md border border-gray-200 p-5">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#2b0000]">
                  Delivery Address
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Add the address where the jewellery should be delivered.
                </p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff2ec] text-sm font-bold text-[#8a4a2f]">
                2
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-black sm:col-span-2">
                Address
                <textarea
                  name="address"
                  required
                  rows="4"
                  placeholder="House number, street, area"
                  className={`mt-2 w-full rounded border border-gray-300 px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#8a4a2f] focus:ring-2 focus:ring-[#ead7d0] ${validationErrors.address ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}`}
                  aria-invalid={Boolean(validationErrors.address)}
                ></textarea>
                {validationErrors.address && (
                  <p className="mt-1 text-xs text-red-600">
                    {validationErrors.address}
                  </p>
                )}
              </label>
              <label className="text-sm font-semibold text-black">
                City
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Enter city"
                  className={getInputClassName(Boolean(validationErrors.city))}
                  aria-invalid={Boolean(validationErrors.city)}
                />
                {validationErrors.city && (
                  <p className="mt-1 text-xs text-red-600">
                    {validationErrors.city}
                  </p>
                )}
              </label>
              <label className="text-sm font-semibold text-black">
                State
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="Enter state"
                  className={getInputClassName(Boolean(validationErrors.state))}
                  aria-invalid={Boolean(validationErrors.state)}
                />
                {validationErrors.state && (
                  <p className="mt-1 text-xs text-red-600">
                    {validationErrors.state}
                  </p>
                )}
              </label>
              <label className="text-sm font-semibold text-black">
                Pincode
                <input
                  type="text"
                  name="pincode"
                  required
                  inputMode="numeric"
                  pattern="^[1-9]\d{5}$"
                  maxLength={6}
                  placeholder="Enter 6-digit Indian pincode"
                  className={getInputClassName(
                    Boolean(validationErrors.pincode),
                  )}
                  aria-invalid={Boolean(validationErrors.pincode)}
                />
                {validationErrors.pincode && (
                  <p className="mt-1 text-xs text-red-600">
                    {validationErrors.pincode}
                  </p>
                )}
              </label>
              <label className="text-sm font-semibold text-black">
                Landmark
                <input
                  type="text"
                  name="landmark"
                  placeholder="Nearby landmark"
                  className={getInputClassName(
                    Boolean(validationErrors.landmark),
                  )}
                  aria-invalid={Boolean(validationErrors.landmark)}
                />
                {validationErrors.landmark && (
                  <p className="mt-1 text-xs text-red-600">
                    {validationErrors.landmark}
                  </p>
                )}
              </label>
            </div>
          </section>

          <section className="rounded-md border border-gray-200 p-5">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#2b0000]">
                  Payment Method
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Select how you would like to complete the purchase.
                </p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff2ec] text-sm font-bold text-[#8a4a2f]">
                3
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["razorpay", "Razorpay"],
                ["COD", "Pay on Delivery"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className={`flex min-h-14 cursor-pointer items-center gap-3 rounded border px-4 text-sm font-semibold transition ${
                    paymentMethod === value
                      ? "border-[#8a4a2f] bg-[#fff2ec] text-[#8a4a2f]"
                      : "border-gray-300 text-gray-700 hover:border-[#d9b8ab]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="h-4 w-4 accent-[#8a4a2f]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-md border border-[#ead7d0] bg-[#fffaf7] p-5 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl font-semibold text-[#2b0000]">
            Order Summary
          </h2>

          <div className="mt-5 space-y-4 border-b border-[#ead7d0] pb-5">
            {cartItems.map((item) => {
              const itemTotal = (Number(item.price) || 0) * item.quantity;

              return (
                <div key={item.key} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded bg-white object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base font-semibold text-black">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Size {item.size} | Qty {item.quantity}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-black">
                      {item.price ? formatPrice(itemTotal) : "Price on request"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-3 border-b border-[#ead7d0] py-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-black">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-600">Delivery</span>
              <span className="font-semibold text-[#1f7a3a]">Free</span>
            </div>
            {hasPriceOnRequestItem && (
              <p className="rounded bg-white px-3 py-2 text-xs leading-5 text-gray-600">
                Final pricing for request-only items will be confirmed by our
                team before payment.
              </p>
            )}
          </div>

          <div className="flex justify-between gap-4 pt-5">
            <span className="text-sm font-semibold text-gray-700">Total</span>
            <span className="font-serif text-2xl font-semibold text-black">
              {formatPrice(grandTotal)}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 h-12 w-full rounded bg-[#8a4a2f] px-6 text-sm font-bold text-white transition hover:bg-[#6f3923] disabled:cursor-not-allowed disabled:bg-[#c3a08f]"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>

          <div className="mt-5 grid gap-3 text-sm text-gray-600">
            {["Certified jewellery", "Insured delivery", "Secure payment"].map(
              (benefit) => (
                <div
                  key={benefit}
                  className="flex items-center justify-between rounded border border-[#ead7d0] bg-white px-4 py-3"
                >
                  <span>{benefit}</span>
                  <span className="font-semibold text-[#8a4a2f]">Included</span>
                </div>
              ),
            )}
          </div>
        </aside>
      </form>
    </div>
  );
};

export default PlaceOrder;
