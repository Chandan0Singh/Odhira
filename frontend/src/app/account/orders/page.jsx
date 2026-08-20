"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const getStatusIcon = (status) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle size={18} className="text-green-600" />;

    case "Shipped":
      return <Truck size={18} className="text-blue-600" />;

    default:
      return <Package size={18} className="text-orange-500" />;
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "Delivered":
      return "text-green-600";

    case "Shipped":
      return "text-blue-600";

    case "Cancelled":
      return "text-red-600";

    default:
      return "text-orange-500";
  }
};

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatPrice = (price) => {
  return `₹${Number(price || 0).toLocaleString("en-IN")}`;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE}/api/order/my-orders`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch orders");
        }

        setOrders(result.data || []);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // -----------------------------
  // SUMMARY
  // -----------------------------

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const totalSpent = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero */}
      <section className="bg-[#5E6B58] py-14 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="uppercase tracking-[4px] text-xs opacity-80">
            My Account
          </p>

          <h1
            className="text-4xl md:text-5xl mt-3"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            My Orders
          </h1>

          <p className="mt-4 text-white/80">
            Track and manage your purchases.
          </p>
        </div>
      </section>

      {/* Orders */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Loading */}
        {loading && (
          <div className="bg-white border border-[#E4E0D8] p-16 text-center">
            <Loader2
              size={40}
              className="mx-auto text-[#5E6B58] animate-spin"
            />

            <p className="mt-5 text-[#777]">
              Loading your orders...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white border border-red-200 p-10 text-center">
            <Package
              size={45}
              className="mx-auto text-red-500"
            />

            <h2 className="mt-5 text-xl font-semibold text-[#2D2D2D]">
              Unable to load orders
            </h2>

            <p className="mt-2 text-[#777]">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty Orders */}
        {!loading && !error && orders.length === 0 && (
          <div className="bg-white border border-[#E4E0D8] p-16 text-center">
            <Package
              size={50}
              className="mx-auto text-[#5E6B58]"
            />

            <h2
              className="mt-6 text-3xl text-[#2D2D2D]"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              No Orders Yet
            </h2>

            <p className="mt-3 text-[#777]">
              Start shopping to see your orders here.
            </p>

            <Link
              href="/collections"
              className="inline-block mt-6 px-8 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold"
            >
              Shop Now
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => {
              const firstItem = order.items?.[0];

              const product = firstItem?.productId;

              const productImage =
                product?.images?.[0] ||
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600";

              const orderId =
                order.orderNumber ||
                order._id;

              const orderStatus =
                order.orderStatus || "Processing";

              return (
                <div
                  key={order._id}
                  className="bg-white border border-[#E4E0D8] overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                      {/* Product Image */}
                      <div className="w-28 h-36 bg-[#F5F2EC] overflow-hidden flex-shrink-0">
                        <img
                          src={productImage}
                          alt={
                            product?.title ||
                            product?.name ||
                            "Product"
                          }
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Order Info */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-[#2D2D2D]">
                              #{orderId}
                            </h3>

                            <p className="text-sm text-[#777] mt-1">
                              Ordered on{" "}
                              {formatDate(order.createdAt)}
                            </p>

                            {order.items?.length > 0 && (
                              <p className="text-sm text-[#777] mt-1">
                                {order.items.length}{" "}
                                {order.items.length === 1
                                  ? "item"
                                  : "items"}
                              </p>
                            )}
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-[#5E6B58]">
                              {formatPrice(
                                order.totalAmount
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="mt-5 flex items-center gap-2">
                          {getStatusIcon(orderStatus)}

                          <span
                            className={`text-sm font-medium ${getStatusClass(
                              orderStatus
                            )}`}
                          >
                            {orderStatus}
                          </span>
                        </div>
                      </div>

                      {/* Button */}
                      <Link
                        href={`/account/orders/${order._id}`}
                        className="flex items-center gap-2 border border-[#5E6B58] px-5 py-3 text-[#5E6B58] uppercase tracking-[2px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition"
                      >
                        View Order
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary */}
        {!loading && !error && orders.length > 0 && (
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {/* Total Orders */}
            <div className="bg-white border border-[#E4E0D8] p-6 text-center">
              <h3 className="text-3xl font-bold text-[#5E6B58]">
                {totalOrders}
              </h3>

              <p className="text-[#777] mt-2">
                Total Orders
              </p>
            </div>

            {/* Delivered */}
            <div className="bg-white border border-[#E4E0D8] p-6 text-center">
              <h3 className="text-3xl font-bold text-[#5E6B58]">
                {deliveredOrders}
              </h3>

              <p className="text-[#777] mt-2">
                Delivered
              </p>
            </div>

            {/* Total Spent */}
            <div className="bg-white border border-[#E4E0D8] p-6 text-center">
              <h3 className="text-3xl font-bold text-[#5E6B58]">
                {formatPrice(totalSpent)}
              </h3>

              <p className="text-[#777] mt-2">
                Total Spent
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}