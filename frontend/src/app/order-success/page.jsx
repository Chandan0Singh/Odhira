"use client";

import { CheckCircle2, Loader2, Package, MapPin, CreditCard } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order found");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/api/order/${orderId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch order (${response.status})`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Order not found");
        }

        setOrder(data.data);
      } catch (err) {
        console.error("Order fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5E6B58]" size={32} />
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-lg text-[#5E6B58] font-medium mb-2">
            {error || "Something went wrong"}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            We couldn&apos;t find this order.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#5E6B58] text-white px-6 py-3 uppercase tracking-[2px] text-sm font-semibold hover:bg-[#4a5546] transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero */}
      <section className="bg-[#5E6B58] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={36} />
          </div>
          <p className="uppercase tracking-[4px] text-xs opacity-80">
            Order Confirmed
          </p>
          <h1
            className="text-4xl md:text-5xl mt-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Thank You
          </h1>
          <p className="mt-4 opacity-90 text-sm">
            Your order has been placed successfully.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Order meta */}
        <div className="bg-white border border-[#E4E0D8] p-6 flex flex-wrap gap-6 justify-between">
          <div>
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              Order ID
            </p>
            <p className="font-medium mt-1">#{order._id}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              Order Date
            </p>
            <p className="font-medium mt-1">{orderDate}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              Payment Status
            </p>
            <p className="font-medium mt-1">{order.paymentStatus}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              Order Status
            </p>
            <p className="font-medium mt-1">{order.orderStatus}</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white border border-[#E4E0D8] p-6">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <Package size={20} />
            Items
          </h2>

          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 border-b border-[#EEE] pb-4 last:border-none last:pb-0"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-20 h-24 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.size && (
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p className="text-sm text-gray-500">
                      Color: {item.color}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 mt-6 border-t pt-5">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shippingCharge ? `₹${order.shippingCharge}` : "Free"}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Shipping + Payment */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E4E0D8] p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin size={18} />
              Shipping Address
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {order.shippingAddress.fullName}
              <br />
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.pincode}
              <br />
              Phone: {order.shippingAddress.phone}
            </p>
          </div>

          <div className="bg-white border border-[#E4E0D8] p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard size={18} />
              Payment Method
            </h2>
            <p className="text-sm text-gray-700">
              {order.paymentMethod === "COD"
                ? "Cash on Delivery"
                : "Razorpay (Card / UPI)"}
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => router.push("/")}
            className="bg-[#5E6B58] text-white px-8 py-4 uppercase tracking-[2px] text-sm font-semibold hover:bg-[#4a5546] transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}