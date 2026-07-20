"use client";

import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const cartItems = [
  {
    id: 1,
    name: "Silk Embroidered Kurta",
    size: "M",
    qty: 1,
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
  },
  {
    id: 2,
    name: "Premium Dupatta",
    size: "Free Size",
    qty: 1,
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500",
  },
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const fetchData = async() =>{
    try{
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);

      const data = await response.json();

      if(!response){
        throw new Error("Failed to fetch product");
      }

      console.log("Da :",data)

    }catch(error){
      console.log("error : ", error)
    }

  }

  useEffect(()=>{
    fetchData();
  }, [])

  const shipping = 0;
  const total = subtotal + shipping;

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
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
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
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Order Summary
              </h2>

              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-[#EEE] pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Size: {item.size}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.qty}
                      </p>
                    </div>

                    <span className="font-semibold">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
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