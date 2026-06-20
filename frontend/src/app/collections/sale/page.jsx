"use client";

import { useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Floral Maxi Dress",
    price: 2499,
    oldPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78e?w=600&q=80",
  },
  {
    id: 2,
    name: "Designer Kurta Set",
    price: 2999,
    oldPrice: 5999,
    image:
      "https://images.unsplash.com/photo-1583391733981-8496f7e8d6ea?w=600&q=80",
  },
  {
    id: 3,
    name: "Premium Saree",
    price: 3499,
    oldPrice: 6999,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
  },
  {
    id: 4,
    name: "Elegant Gown",
    price: 3999,
    oldPrice: 7999,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  },
  {
    id: 5,
    name: "Casual Top",
    price: 1499,
    oldPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  },
  {
    id: 6,
    name: "Party Wear Dress",
    price: 2799,
    oldPrice: 5499,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
  },
  {
    id: 7,
    name: "Ethnic Jacket",
    price: 1999,
    oldPrice: 3999,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
  },
  {
    id: 8,
    name: "Luxury Lehenga",
    price: 5999,
    oldPrice: 11999,
    image:
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80",
  },
];

export default function SalePage() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero */}
      <section className="relative h-[320px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80"
          alt="Sale Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
          <p className="uppercase tracking-[4px] text-sm mb-3">
            Limited Time Offer
          </p>

          <h1
            className="text-5xl md:text-7xl"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Sale
          </h1>

          <p className="mt-4 max-w-xl text-gray-200">
            Discover exclusive discounts on our most loved styles.
            Up to 70% OFF.
          </p>
        </div>
      </section>

      {/* Banner */}
      <div className="bg-[#5E6B58] text-white text-center py-4">
        <p className="tracking-[3px] uppercase text-sm">
          Extra 10% OFF on Orders Above ₹4999
        </p>
      </div>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-4xl text-[#2D2D2D]"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Sale Collection
          </h2>

          <p className="text-gray-500">
            {PRODUCTS.length} Products
          </p>
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-6">
          {PRODUCTS.map((product) => {
            const discount = Math.round(
              ((product.oldPrice - product.price) /
                product.oldPrice) *
                100
            );

            return (
              <div
                key={product.id}
                className="bg-white overflow-hidden border border-[#E5DED3] hover:shadow-xl transition"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover"
                  />

                  <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs font-semibold">
                    {discount}% OFF
                  </span>

                  <button
                    onClick={() =>
                      toggleWishlist(product.id)
                    }
                    className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full shadow"
                  >
                    {wishlist.includes(product.id)
                      ? "❤️"
                      : "🤍"}
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-[#2D2D2D] font-medium">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[#5E6B58] font-bold">
                      ₹{product.price}
                    </span>

                    <span className="line-through text-gray-400 text-sm">
                      ₹{product.oldPrice}
                    </span>
                  </div>

                  <button className="mt-4 w-full bg-[#5E6B58] text-white py-3 uppercase text-xs tracking-[2px] hover:bg-[#4d5948] transition">
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EFE8DE] py-20 text-center">
        <h2
          className="text-4xl text-[#2D2D2D]"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Last Chance
        </h2>

        <p className="mt-4 text-gray-600">
          These deals won't stay for long.
        </p>

        <button className="mt-8 px-10 py-4 bg-[#5E6B58] text-white uppercase tracking-[3px]">
          Shop Now
        </button>
      </section>
    </div>
  );
}