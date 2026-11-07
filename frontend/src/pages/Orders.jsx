import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartState";
const statusIndex = {
  "Order Placed": 0,
  Confirmed: 1,
  Packed: 2,
  Delivered: 3,
};

const formatPrice = (price) => {
  const numericPrice = Number(price) || 0;

  return `${"\u20B9"} ${numericPrice.toLocaleString("en-IN")}`;
};

const getDeliveryDate = () => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const trackingSteps = [
  ["Order Placed", "Your order request has been received."],
  ["Confirmed", "Our team is verifying stock and payment."],
  ["Packed", "Your jewellery will be packed securely."],
  ["Delivered", "Delivery confirmation will appear here."],
];

const Orders = () => {
  const { backendUrl, token } = useCart();
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [trackingItemKey, setTrackingItemKey] = React.useState("");

  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          `${backendUrl}/api/order/userorders`,
          {},
          { headers: { token } },
        );

        if (response.data?.success) {
          setOrders(
            Array.isArray(response.data.orders) ? response.data.orders : [],
          );
        } else {
          toast.error(response.data?.message || "Unable to load orders.");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);
  }, [backendUrl, token]);

  if (!loading && orders.length === 0) {
    return (
      <div className="mt-20 bg-white px-4 pb-16 sm:mt-8 lg:mt-0">
        <div className="py-5 text-sm text-gray-600">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">{">"}</span>
          <span className="font-medium text-[#8a4a2f]">Orders</span>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-md border border-gray-200 p-8 text-center">
          <h1 className="font-serif text-3xl font-semibold text-[#2b0000]">
            No orders yet
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Your placed jewellery orders will appear here.
          </p>
          <Link
            to="/alljewellery"
            className="mt-6 inline-flex h-11 items-center justify-center rounded bg-[#8a4a2f] px-6 text-sm font-bold text-white transition hover:bg-[#6f3923]"
          >
            Shop Jewellery
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
        <span className="font-medium text-[#8a4a2f]">Orders</span>
      </div>

      <div className="flex flex-col gap-2 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-[#8a4a2f]">
            Order history
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#2b0000] sm:text-4xl">
            My Orders
          </h1>
        </div>
        <Link
          to="/alljewellery"
          className="inline-flex h-11 items-center justify-center rounded border border-[#8a4a2f] px-5 text-sm font-bold text-[#8a4a2f] transition hover:bg-[#fff2ec]"
        >
          Continue Shopping
        </Link>
      </div>

      <section className="mt-8 space-y-6">
        {orders.map((order) => {
          const deliveryDate = getDeliveryDate();
          const isTrackingOpen = trackingItemKey === order._id;

          return (
            <article
              key={order._id}
              className="rounded-md border border-[#ead7d0] bg-[#fffaf7] p-5"
            >
              <div className="grid gap-4 border-b border-[#ead7d0] pb-5 md:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Order ID
                  </p>
                  <p className="mt-1 font-serif text-xl font-semibold text-[#2b0000]">
                    {order._id?.slice(-8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Status
                  </p>
                  <p className="mt-1 font-semibold text-[#1f7a3a]">
                    {order.orderStatus || "Order Placed"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Estimated Delivery
                  </p>
                  <p className="mt-1 font-semibold text-black">
                    {deliveryDate}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Order Total
                  </p>
                  <p className="mt-1 font-serif text-xl font-semibold text-black">
                    {formatPrice(order.totalAmount)}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {order.items?.map((item) => {
                  const itemTotal =
                    (Number(item.price) || 0) * (Number(item.quantity) || 1);

                  return (
                    <article
                      key={`${order._id}-${item.productId || item.name}-${item.size}`}
                      className="rounded-md border border-gray-200 bg-white p-4"
                    >
                      <div className="grid gap-4 md:grid-cols-[96px_minmax(0,1fr)_auto] md:items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 rounded bg-[#f8f8f8] object-cover"
                        />
                        <div className="min-w-0">
                          <h2 className="font-serif text-xl font-semibold text-black">
                            {item.name}
                          </h2>
                          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
                            <span>Size: {item.size || "—"}</span>
                            <span>Quantity: {item.quantity || 1}</span>
                            <span>
                              Amount:{" "}
                              <span className="font-semibold text-black">
                                {item.price
                                  ? formatPrice(itemTotal)
                                  : "Price on request"}
                              </span>
                            </span>
                          </div>
                          <p className="mt-3 inline-flex rounded-full bg-[#f3fbf5] px-3 py-1 text-xs font-semibold text-[#1f7a3a]">
                            {order.paymentMethod || "COD"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setTrackingItemKey(isTrackingOpen ? "" : order._id)
                          }
                          className="h-11 rounded bg-[#8a4a2f] px-5 text-sm font-bold text-white transition hover:bg-[#6f3923]"
                        >
                          {isTrackingOpen ? "Hide Tracking" : "Track Order"}
                        </button>
                      </div>

                      {isTrackingOpen && (
                        <div className="mt-5 border-t border-gray-200 pt-5">
                          <div className="grid gap-3 md:grid-cols-4">
                            {trackingSteps.map(
                              ([title, description], index) => {
                                const currentStatus =
                                  statusIndex[
                                    order.orderStatus || "Order Placed"
                                  ] ?? 0;
                                const isCompleted = index <= currentStatus;
                                const isCurrent = index === currentStatus;

                                return (
                                  <div
                                    key={`${order._id}-${title}-${index}`}
                                    className={`rounded border px-4 py-3 ${
                                      isCompleted
                                        ? "border-[#b7dfc1] bg-[#f3fbf5]"
                                        : "border-gray-200 bg-[#fafafa]"
                                    } ${
                                      isCurrent
                                        ? "shadow-sm ring-1 ring-[#1f7a3a]"
                                        : ""
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span
                                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                                          isCompleted
                                            ? "bg-[#1f7a3a] text-white"
                                            : "bg-gray-200 text-gray-500"
                                        }`}
                                      >
                                        {index + 1}
                                      </span>
                                      <p className="font-semibold text-black">
                                        {title}
                                      </p>
                                    </div>
                                    <p className="mt-2 text-sm leading-5 text-gray-600">
                                      {description}
                                    </p>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Orders;
