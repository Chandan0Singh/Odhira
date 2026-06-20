"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

const wishlistItems = [
  {
    id: 1,
    name: "Floral Printed Kurta",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },
  {
    id: 2,
    name: "Designer Saree",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
  },
  {
    id: 3,
    name: "Leather Handbag",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
  },
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero */}
      <section className="bg-[#5E6B58] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Heart className="mx-auto mb-4" size={40} />
          <h1
            className="text-5xl mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            My Wishlist
          </h1>
          <p className="text-gray-200">
            Save your favorite pieces for later.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {wishlistItems.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-96 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-medium mb-2">
                      {item.name}
                    </h3>

                    <p className="text-[#5E6B58] font-semibold text-lg mb-4">
                      ₹{item.price}
                    </p>

                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-[#5E6B58] text-white py-3 hover:bg-[#495442] transition">
                        <ShoppingBag size={18} />
                        Add To Cart
                      </button>

                      <button className="border px-4 hover:bg-red-50 transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-12">
              <Link
                href="/collections"
                className="inline-block border border-[#5E6B58] text-[#5E6B58] px-8 py-3 hover:bg-[#5E6B58] hover:text-white transition"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Heart
              size={60}
              className="mx-auto mb-6 text-gray-400"
            />

            <h2
              className="text-3xl mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mb-8">
              Save products you love and shop them later.
            </p>

            <Link
              href="/collections"
              className="bg-[#5E6B58] text-white px-8 py-3 inline-block hover:bg-[#495442]"
            >
              Explore Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}