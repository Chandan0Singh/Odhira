"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Truck, ShieldCheck } from "lucide-react";

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    name: "Embroidered Silk Kurta Set",
    price: 3499,
    originalPrice: 4999,
    description:
      "Crafted from premium silk fabric with intricate embroidery, designed for festive and wedding occasions.",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900",
    ],
  };

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-white border border-[#E4E0D8] overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[650px] object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-3 mt-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border overflow-hidden ${
                    selectedImage === index
                      ? "border-[#5E6B58]"
                      : "border-[#E4E0D8]"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-28 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="uppercase tracking-[3px] text-xs text-[#777]">
              Women's Collection
            </p>

            <h1
              className="text-4xl mt-3 text-[#2D2D2D]"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-5">
              <span className="text-3xl font-semibold text-[#5E6B58]">
                ₹{product.price}
              </span>

              <span className="line-through text-gray-400">
                ₹{product.originalPrice}
              </span>

              <span className="bg-red-100 text-red-600 px-2 py-1 text-xs">
                30% OFF
              </span>
            </div>

            <p className="mt-6 text-[#666] leading-relaxed">
              {product.description}
            </p>

            {/* Sizes */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Size</h3>

              <div className="flex gap-3">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border ${
                      selectedSize === size
                        ? "bg-[#5E6B58] text-white border-[#5E6B58]"
                        : "border-[#D8D2C8]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-10">
              <button
                className="flex-1 bg-[#5E6B58] text-white py-4
                           uppercase tracking-[2px]
                           font-semibold flex items-center
                           justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add To Cart
              </button>

              <button
                className="w-14 border border-[#D8D2C8]
                           flex items-center justify-center"
              >
                <Heart size={20} />
              </button>
            </div>

            <button
              className="w-full mt-4 border border-[#5E6B58]
                         py-4 text-[#5E6B58]
                         uppercase tracking-[2px]
                         font-semibold hover:bg-[#5E6B58]
                         hover:text-white transition"
            >
              Buy Now
            </button>

            {/* Features */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <Truck size={18} />
                Free Shipping Across India
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={18} />
                Secure Payments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2
          className="text-4xl text-center mb-10"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          You May Also Like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white border border-[#E4E0D8]"
            >
              <img
                src={`https://picsum.photos/400/500?random=${item}`}
                alt=""
                className="w-full h-80 object-cover"
              />

              <div className="p-4">
                <h3 className="font-medium">
                  Premium Fashion Piece
                </h3>

                <p className="text-[#5E6B58] mt-2 font-semibold">
                  ₹2,999
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}