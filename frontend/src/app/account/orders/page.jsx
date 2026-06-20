"use client";

import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const orders = [
  {
    id: "#ORD-1025",
    date: "12 June 2026",
    status: "Delivered",
    total: "₹4,999",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
  {
    id: "#ORD-1024",
    date: "05 June 2026",
    status: "Shipped",
    total: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
  },
  {
    id: "#ORD-1023",
    date: "28 May 2026",
    status: "Processing",
    total: "₹6,999",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },
];

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

export default function OrdersPage() {
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
        {orders.length === 0 ? (
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
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E4E0D8] overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6 items-center">
                    {/* Product Image */}
                    <div className="w-28 h-36 bg-[#F5F2EC] overflow-hidden flex-shrink-0">
                      <img
                        src={order.image}
                        alt={order.id}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[#2D2D2D]">
                            {order.id}
                          </h3>

                          <p className="text-sm text-[#777] mt-1">
                            Ordered on {order.date}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-[#5E6B58]">
                            {order.total}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center gap-2">
                        {getStatusIcon(order.status)}

                        <span
                          className={`text-sm font-medium ${
                            order.status === "Delivered"
                              ? "text-green-600"
                              : order.status === "Shipped"
                              ? "text-blue-600"
                              : "text-orange-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="flex items-center gap-2 border border-[#5E6B58] px-5 py-3 text-[#5E6B58] uppercase tracking-[2px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition"
                    >
                      View Order
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <div className="bg-white border border-[#E4E0D8] p-6 text-center">
            <h3 className="text-3xl font-bold text-[#5E6B58]">12</h3>
            <p className="text-[#777] mt-2">Total Orders</p>
          </div>

          <div className="bg-white border border-[#E4E0D8] p-6 text-center">
            <h3 className="text-3xl font-bold text-[#5E6B58]">9</h3>
            <p className="text-[#777] mt-2">Delivered</p>
          </div>

          <div className="bg-white border border-[#E4E0D8] p-6 text-center">
            <h3 className="text-3xl font-bold text-[#5E6B58]">₹54K</h3>
            <p className="text-[#777] mt-2">Total Spent</p>
          </div>
        </div>
      </div>
    </div>
  );
}