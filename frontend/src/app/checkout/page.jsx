"use client";

import { CreditCard, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");
  const qty = Number(searchParams.get("qty")) || 1;
  const size = searchParams.get("size") || "Free Size";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError("No product selected");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product (${response.status})`);
        }

        const data = await response.json();

        if (!data.success || !data) {
          throw new Error("Product not found");
        }

        setProduct(data);
      } catch (err) {
        console.error("Checkout fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5E6B58]" size={32} />
      </div>
    );
  }

  // Error / no product state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-lg text-[#5E6B58] font-medium mb-2">
            {error || "Something went wrong"}
          </p>
          <p className="text-sm text-gray-500">
            Please go back and select a product to checkout.
          </p>
        </div>
      </div>
    );
  }

  const unitPrice = product.discountedPrice || product.price;
  const subtotal = unitPrice * qty;
  const shipping = 0;
  const total = subtotal + shipping;
  const productImage =
    product.images?.[0]?.url || product.images?.[0] || "/placeholder.png";

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero */}
      <section className="bg-[#5E6B58] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="uppercase tracking-[4px] text-xs opacity-80">
            Secure Checkout
          </p>

          <h1
            className="text-4xl md:text-5xl mt-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Checkout
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <div className="bg-white border border-[#E4E0D8] p-6">
              <h2 className="text-xl font-semibold mb-5">
                Contact Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58]"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58]"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58] md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58] md:col-span-2"
                />
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-[#E4E0D8] p-6">
              <h2 className="text-xl font-semibold mb-5">
                Shipping Address
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="Address Line 1"
                  className="border border-[#D8D2C8] p-3 md:col-span-2"
                />
                <input
                  placeholder="City"
                  className="border border-[#D8D2C8] p-3"
                />
                <input
                  placeholder="State"
                  className="border border-[#D8D2C8] p-3"
                />
                <input
                  placeholder="Postal Code"
                  className="border border-[#D8D2C8] p-3"
                />
                <input
                  placeholder="Country"
                  className="border border-[#D8D2C8] p-3"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white border border-[#E4E0D8] p-6">
              <h2 className="text-xl font-semibold mb-5">
                Payment Method
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 border border-[#E4E0D8] p-4 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked />
                  <CreditCard size={18} />
                  Credit / Debit Card
                </label>

                <label className="flex items-center gap-3 border border-[#E4E0D8] p-4 cursor-pointer">
                  <input type="radio" name="payment" />
                  UPI Payment
                </label>

                <label className="flex items-center gap-3 border border-[#E4E0D8] p-4 cursor-pointer">
                  <input type="radio" name="payment" />
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <div className="bg-white border border-[#E4E0D8] p-6 sticky top-24">
              <h2
                className="text-2xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-5">
                <div className="flex gap-4 border-b border-[#EEE] pb-4">
                  <img
                    src={productImage}
                    alt={product.title}
                    className="w-20 h-24 object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {size}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {qty}</p>
                  </div>

                  <span className="font-semibold">₹{unitPrice}</span>
                </div>
              </div>

              <div className="space-y-3 mt-6 border-t pt-5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-[#5E6B58] text-white py-4
                           uppercase tracking-[2px] text-sm font-semibold
                           hover:bg-[#4a5546] transition"
              >
                Place Order
              </button>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck size={16} />
                  Free Shipping
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Secure Payments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}