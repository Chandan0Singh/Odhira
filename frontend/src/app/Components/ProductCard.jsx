"use client";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";

/**
 * ProductCard — reusable across all collection pages
 *
 * Props:
 *  - product: {
 *      id, name, price, originalPrice?, badge?, category,
 *      colors: [{ name, hex }],
 *      images: [string],   // per-color or fallback array
 *    }
 */
export default function ProductCard({ product }) {
  const [activeColor, setActiveColor] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const image =
    Array.isArray(product.images[activeColor])
      ? product.images[activeColor]
      : product.images[Math.min(activeColor, product.images.length - 1)];

  const hoverImage = product.images[1] ?? product.images[0];

  function handleAddToBag(e) {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article
      className="group flex flex-col bg-white border border-[#E4E0D8] overflow-hidden
                 hover:shadow-[0_8px_32px_rgba(94,107,88,0.11)] transition-shadow duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ───────────────────────────────────────── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EDE9E3]">
        <img
          src={hovered && product.images.length > 1 ? hoverImage : image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#5E6B58] text-[#F8F5EE] text-[9px]
                           uppercase tracking-[2px] font-bold px-2.5 py-1">
            {product.badge}
          </span>
        )}
        {discountPct && !product.badge && (
          <span className="absolute top-3 left-3 bg-[#C8A96B] text-white text-[9px]
                           uppercase tracking-[2px] font-bold px-2.5 py-1">
            -{discountPct}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center
                     justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-white"
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            className={wishlisted ? "fill-[#5E6B58] stroke-[#5E6B58]" : "stroke-[#5E6B58]"}
          />
        </button>

        {/* Quick Add — slides up on hover */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0
                        transition-transform duration-300 ease-out">
          <button
            onClick={handleAddToBag}
            className="w-full flex items-center justify-center gap-2 h-11
                       bg-[#5E6B58] text-[#F8F5EE] text-[10px] uppercase tracking-[2.5px] font-semibold
                       hover:bg-[#4a5546] transition-colors duration-200"
          >
            <ShoppingBag size={13} strokeWidth={1.5} />
            {added ? "Added!" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* ── Info ────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 p-4">
        {/* Category */}
        <p className="text-[10px] uppercase tracking-[2.5px] text-[#A8B2A1] font-semibold">
          {product.category}
        </p>

        {/* Name */}
        <h3
          className="text-[15px] leading-snug text-[#2D2D2D] hover:text-[#5E6B58]
                     transition-colors duration-200 cursor-pointer"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[14px] font-semibold text-[#5E6B58]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {hasDiscount && (
            <span className="text-[12px] text-[#bbb] line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors?.length > 0 && (
          <div className="flex gap-1.5 mt-1">
            {product.colors.map((color, i) => (
              <button
                key={color.name}
                title={color.name}
                onClick={() => setActiveColor(i)}
                className="w-4 h-4 rounded-full border transition-all duration-150"
                style={{
                  backgroundColor: color.hex,
                  borderColor: activeColor === i ? "#5E6B58" : "#D5CFC6",
                  outline: activeColor === i ? "2px solid #5E6B58" : "none",
                  outlineOffset: "2px",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}