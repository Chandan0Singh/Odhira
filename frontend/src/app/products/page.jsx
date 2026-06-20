"use client";

import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Floral Printed Kurta",
    price: 2499,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
    category: "Women",
  },
  {
    id: 2,
    name: "Elegant Saree",
    price: 3999,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
    category: "Women",
  },
  {
    id: 3,
    name: "Classic Men's Kurta",
    price: 2799,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
    category: "Men",
  },
  {
    id: 4,
    name: "Leather Handbag",
    price: 1999,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Silk Dupatta",
    price: 999,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Designer Lehenga",
    price: 8999,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
    category: "Women",
  },
  {
    id: 7,
    name: "Nehru Jacket",
    price: 3499,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
    category: "Men",
  },
  {
    id: 8,
    name: "Fashion Sunglasses",
    price: 1499,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    category: "Accessories",
  },
];

export default function ProductsPage() {
  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero */}
      <section className="bg-[#5E6B58] text-white py-20 text-center">
        <h1
          className="text-5xl mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Our Products
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Explore our curated collection of fashion, accessories and timeless
          designs crafted for modern lifestyles.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4">
                <p className="text-sm text-[#5E6B58] uppercase mb-2">
                  {product.category}
                </p>

                <h3 className="text-lg font-medium mb-2">
                  {product.name}
                </h3>

                <p className="text-xl font-semibold text-[#5E6B58] mb-4">
                  ₹{product.price}
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="block text-center border border-[#5E6B58] text-[#5E6B58] py-2 hover:bg-[#5E6B58] hover:text-white transition"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}