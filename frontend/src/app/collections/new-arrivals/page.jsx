"use client";

import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    badge: "NEW",
  },
  {
    id: 2,
    name: "Elegant Blazer Set",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
    badge: "TRENDING",
  },
  {
    id: 3,
    name: "Casual Cotton Shirt",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    badge: "NEW",
  },
  {
    id: 4,
    name: "Premium Denim Jacket",
    price: 3299,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    badge: "HOT",
  },
  {
    id: 5,
    name: "Luxury Handbag",
    price: 2899,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    badge: "NEW",
  },
  {
    id: 6,
    name: "Classic White Sneakers",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    badge: "BESTSELLER",
  },
  {
    id: 7,
    name: "Designer Kurta Set",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    badge: "NEW",
  },
  {
    id: 8,
    name: "Party Wear Gown",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    badge: "TRENDING",
  },
];

function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group bg-white border border-gray-200 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
        />

        <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1">
          {product.badge}
        </span>

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
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="mt-2 text-gray-700 font-semibold">
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function NewArrivalsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[450px]">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80"
          alt="New Arrivals"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="uppercase tracking-[5px] text-sm mb-3">
            Latest Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-light mb-4">
            New Arrivals
          </h1>

          <p className="max-w-2xl text-lg">
            Discover the newest trends and exclusive styles crafted for the
            modern fashion lover.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <p className="text-sm text-gray-500">
          Home / Collections /{" "}
          <span className="text-black font-medium">New Arrivals</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex justify-between items-center border-b pb-5">
          <div>
            <h2 className="text-3xl font-light">Fresh Drops</h2>
            <p className="text-gray-500 mt-2">
              Explore our latest arrivals curated for you.
            </p>
          </div>

          <p className="text-gray-500">
            {PRODUCTS.length} Products
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-light mb-4">
            Stay Updated
          </h2>

          <p className="text-gray-600 mb-8">
            Be the first to know about our latest arrivals, exclusive offers,
            and fashion updates.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 px-4 py-3 outline-none"
            />

            <button className="bg-black text-white px-8 py-3">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}