"use client";

import { CreditCard, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {useAuth} from "@/context/AuthContext"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CheckoutPage() {
   const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("productId");
  const qty = Number(searchParams.get("qty")) || 1;
  const size = searchParams.get("size") || "Free Size";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("Razorpay"); // "Razorpay" | "COD"

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

        setProduct(data.data);
      } catch (err) {
        console.error("Checkout fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
      "country",
    ];

    for (const field of required) {
      if (!form[field]?.trim()) {
        return `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`;
      }
    }
    return null;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const buildOrderPayload = (paymentStatus = "Pending") => {
    const userId = user.id // adjust key to match your auth storage

    return {
      userId,
      items: [
        {
          productId: product._id,
          name: product.title,
          image: productImage,
          price: unitPrice,
          quantity: qty,
          size,
          color: product.color || "",
        },
      ],
      shippingAddress: {
        type: "Home",
        fullName: `${form.firstName} ${form.lastName}`,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.postalCode,
      },
      paymentMethod: paymentMethod === "COD" ? "COD" : "Razorpay",
      paymentStatus,
      subtotal,
      shippingCharge: shipping,
      discount: 0,
      totalAmount: total,
    };
  };

  const createOrderInDB = async (paymentStatus) => {
    const payload = buildOrderPayload(paymentStatus);

    const res = await fetch(`${API_BASE}/api/order/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to create order");
    }

    return data.data;
  };

  const handleCODOrder = async () => {
    const createdOrder = await createOrderInDB("Pending");
    router.push(`/order-success?orderId=${createdOrder._id}`);
  };

  const handleRazorpayOrder = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error("Razorpay SDK failed to load. Check your connection.");
    }

    const razorpayOrderRes = await fetch(`${API_BASE}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });


    const razorpayOrderData = await razorpayOrderRes.json();

    if (!razorpayOrderData.success) {
      throw new Error(razorpayOrderData.message || "Could not initiate payment");
    }

    const { order: razorpayOrder } = razorpayOrderData;

    return new Promise((resolve, reject) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Odhira",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_BASE}/api/payment/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
              throw new Error("Payment verification failed");
            }

            const createdOrder = await createOrderInDB("Paid");
            router.push(`/order-success?orderId=${createdOrder._id}`);
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled")),
        },
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#5E6B58",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => reject(new Error("Payment failed")));
      rzp.open();
    });
  };

  const handlePlaceOrder = async () => {
    setOrderError(null);

    const validationError = validateForm();
    if (validationError) {
      setOrderError(validationError);
      return;
    }

    try {
      setPlacingOrder(true);

      if (paymentMethod === "COD") {
        await handleCODOrder();
      } else {
        await handleRazorpayOrder();
      }
    } catch (err) {
      console.error("Order placement error:", err.message);
      setOrderError(err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

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
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58]"
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58]"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58] md:col-span-2"
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
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
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address Line 1"
                  className="border border-[#D8D2C8] p-3 md:col-span-2 outline-none focus:border-[#5E6B58]"
                />
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58]"
                />
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58]"
                />
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58]"
                />
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border border-[#D8D2C8] p-3 outline-none focus:border-[#5E6B58]"
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
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "Razorpay"}
                    onChange={() => setPaymentMethod("Razorpay")}
                  />
                  <CreditCard size={18} />
                  Credit / Debit Card / UPI (Razorpay)
                </label>

                <label className="flex items-center gap-3 border border-[#E4E0D8] p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

            {orderError && (
              <p className="text-red-600 text-sm font-medium">{orderError}</p>
            )}
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
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="w-full mt-6 bg-[#5E6B58] text-white py-4
                           uppercase tracking-[2px] text-sm font-semibold
                           hover:bg-[#4a5546] transition disabled:opacity-60
                           disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {placingOrder ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
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