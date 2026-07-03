"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const { user } = useAuth();

  console.log("ProductCard user:", user.id);

  const handleAddToCart = async () => {
  try {
    if (!user) {
      alert("Please login first");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/cart/add",
      {
        userId: user.id,
        productId: product._id,
        quantity: 1,
      }
    );

    console.log(res.data);
    alert("Product added to cart!");
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message || "Failed to add product to cart"
    );
  }
};

  const handleBuyNow = () => {
    console.log("Buy Now:", product);
    // TODO: Redirect to checkout or Buy Now page
  };

  return (
    <div className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.images?.[0]?.url || product.images?.[0]}
          alt={product.title}
          className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* NEW Badge */}
        {product.isNewArrival && (
          <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1">
            NEW
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
        >
          <Heart
            size={18}
            className={wishlisted ? "fill-red-500 text-red-500" : ""}
          />
        </button>

        {/* Hover Buttons */}
        <div
          className="
            absolute bottom-0 left-0 w-full
            translate-y-full group-hover:translate-y-0
            transition-transform duration-300
            bg-white border-t border-gray-200 p-3
          "
        >
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 border border-black py-3 hover:bg-black hover:text-white transition"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 hover:bg-gray-800 transition"
            >
              <Zap size={18} />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-medium">{product.title}</h3>

        <p className="mt-2 text-gray-800 font-semibold text-lg">
          ₹{(product.discountedPrice || product.price).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
