"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import CheckoutModal from "../Components/CheckoutModal";

export default function CartPage() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  console.log("User in CartPage:", user); // Debugging line

  useEffect(() => {
    if (user?.id) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${user.id}`);

      setCartItems(res.data.items);
    } catch (err) {
      console.error(err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = async (cartItemId) => {
    try {
      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: {
          userId: user.id,
          cartItemId,
        },
      });

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.productId.discountedPrice || item.productId.price) * item.quantity,
    0,
  );

  const shipping = subtotal > 5000 ? 0 : 199;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const fetchUserData = async () => {
    const response = await fetch(
      `http://localhost:5000/api/user/${user.id}/addresses`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();

    setUserAddresses(data.addresses);
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
    fetchUserData();
  };

  const handlePlaceOrder = async (address) => {
    console.log(address);
  };

  return (
    <>
      <div className="bg-[#F8F5EE] min-h-screen">
        {/* Hero */}
        <section className="py-16 border-b border-[#E4E0D8]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="uppercase tracking-[4px] text-[#5E6B58] text-sm mb-3">
              Shopping Bag
            </p>

            <h1
              className="text-5xl text-[#2D2D2D]"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Your Cart
            </h1>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[#E4E0D8]">
                <h2
                  className="text-3xl text-[#2D2D2D]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Your Cart is Empty
                </h2>

                <p className="mt-4 text-gray-500">
                  Add some products to continue shopping.
                </p>

                <a
                  href="/collections"
                  className="inline-block mt-6 px-8 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px]"
                >
                  Continue Shopping
                </a>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-[#E4E0D8] p-5 flex gap-5"
                >
                  <img
                    src={
                      item.productId.images?.[0]?.url ||
                      item.productId.images?.[0]
                    }
                    alt={item.productId.title}
                    className="w-28 h-36 object-cover"
                  />

                  <div className="flex-1">
                    <h3
                      className="text-2xl text-[#2D2D2D]"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {item.productId.title}
                    </h3>

                    <p className="mt-2 text-[#5E6B58] font-semibold">
                      ₹
                      {(
                        item.productId.discountedPrice || item.productId.price
                      ).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-3 mt-5">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="w-9 h-9 border border-[#D5CFC6] flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="w-9 h-9 border border-[#D5CFC6] flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 self-start"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          {cartItems.length > 0 && (
            <div>
              <div className="bg-white border border-[#E4E0D8] p-8 sticky top-24">
                <h2
                  className="text-3xl text-[#2D2D2D]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Order Summary
                </h2>

                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>

                  <hr className="border-[#E4E0D8]" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckout()}
                  className="w-full mt-8 py-4 bg-[#5E6B58] text-white uppercase tracking-[3px] text-sm hover:bg-[#4b5847] transition"
                >
                  Proceed To Checkout
                </button>

                <a
                  href="/collections"
                  className="block text-center mt-4 text-[#5E6B58] text-sm"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <CheckoutModal
        open={showCheckoutModal}
        addresses={userAddresses}
        phone={user.phone}
        onPlaceOrder={handlePlaceOrder}
        onClose={() => setShowCheckoutModal(false)}
      />
    </>
  );
}
