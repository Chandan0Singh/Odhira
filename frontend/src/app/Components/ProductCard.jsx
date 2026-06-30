"use client";

import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group bg-white border border-gray-200 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.images?.[0]?.url || product.images?.[0]}
          alt={product.title}
          className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
        />

        {product.isNewArrival && (
          <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1">
            NEW
          </span>
        )}

        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full"
        >
          <Heart
            size={18}
            className={wishlisted ? "fill-red-500 text-red-500" : ""}
          />
        </button>

        <button
          className="absolute bottom-0 left-0 w-full bg-black text-white py-3
          translate-y-full group-hover:translate-y-0 transition duration-300
          flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} />
          Add To Bag
        </button>
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-medium">{product.title}</h3>

        <p className="mt-2 text-gray-700 font-semibold">
          ₹{(product.discountedPrice || product.price).toLocaleString()}
        </p>
      </div>
    </div>
  );
}