"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

/**
 * FilterSidebar — reusable across Women / Men / Accessories / Sale pages
 *
 * Props:
 *  - filters:  { colors, sizes, priceRange, collections }  — current state
 *  - onChange: (key, value) => void
 *  - onClear:  () => void
 *  - totalResults: number
 */

const PRICE_OPTIONS = [
  { label: "Under ₹1,000",   value: "0-1000" },
  { label: "₹1,000 – ₹3,000", value: "1000-3000" },
  { label: "₹3,000 – ₹6,000", value: "3000-6000" },
  { label: "Above ₹6,000",   value: "6000-99999" },
];

const SWATCH_COLORS = [
  { name: "Ivory",     hex: "#F5F0E8" },
  { name: "Sage",      hex: "#A8B2A1" },
  { name: "Olive",     hex: "#5E6B58" },
  { name: "Taupe",     hex: "#B7A99A" },
  { name: "Charcoal",  hex: "#3D3D3D" },
  { name: "Blush",     hex: "#E8C5B0" },
  { name: "Gold",      hex: "#C8A96B" },
  { name: "Rust",      hex: "#9E4A2F" },
];

function AccordionSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E4E0D8]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[11px] uppercase tracking-[2.5px] font-semibold text-[#2D2D2D]">
          {title}
        </span>
        {open ? (
          <ChevronUp size={14} strokeWidth={1.5} className="text-[#A8B2A1]" />
        ) : (
          <ChevronDown size={14} strokeWidth={1.5} className="text-[#A8B2A1]" />
        )}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-4" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onClear, totalResults, accessoryCategories = [] }) {
  const activeCount = [
    filters.colors.length,
    filters.sizes.length,
    filters.price ? 1 : 0,
    filters.collections.length,
  ].reduce((a, b) => a + b, 0);

  return (
    <aside className="w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] uppercase tracking-[2.5px] font-semibold text-[#2D2D2D]">
          Filters
          {activeCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full
                             bg-[#5E6B58] text-[#F8F5EE] text-[9px] font-bold">
              {activeCount}
            </span>
          )}
        </p>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-[11px] text-[#A8B2A1] hover:text-[#5E6B58]
                       transition-colors duration-150 uppercase tracking-wider"
          >
            <X size={11} /> Clear all
          </button>
        )}
      </div>

      <p className="text-[12px] text-[#999] mb-5">{totalResults} products</p>

      {/* Category */}
      {accessoryCategories.length > 0 && (
        <AccordionSection title="Category">
          <ul className="space-y-2.5">
            {accessoryCategories.map((cat) => (
              <li key={cat}>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.collections.includes(cat)}
                    onChange={() => onChange("collections", cat)}
                    className="sr-only"
                  />
                  <span
                    className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center
                                transition-colors duration-150
                                ${filters.collections.includes(cat)
                                  ? "bg-[#5E6B58] border-[#5E6B58]"
                                  : "border-[#C5BFB8] group-hover:border-[#5E6B58]"
                                }`}
                  >
                    {filters.collections.includes(cat) && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3l2 2 4-4" stroke="#F8F5EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span className="text-[13px] text-[#555] group-hover:text-[#2D2D2D] transition-colors">
                    {cat}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </AccordionSection>
      )}

      {/* Price */}
      <AccordionSection title="Price">
        <ul className="space-y-2.5">
          {PRICE_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === opt.value}
                  onChange={() => onChange("price", filters.price === opt.value ? null : opt.value)}
                  className="sr-only"
                />
                <span
                  className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center
                              transition-colors duration-150
                              ${filters.price === opt.value
                                ? "border-[#5E6B58] bg-[#5E6B58]"
                                : "border-[#C5BFB8] group-hover:border-[#5E6B58]"
                              }`}
                >
                  {filters.price === opt.value && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </span>
                <span className="text-[13px] text-[#555] group-hover:text-[#2D2D2D] transition-colors">
                  {opt.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </AccordionSection>

      {/* Color */}
      <AccordionSection title="Colour">
        <div className="flex flex-wrap gap-2.5">
          {SWATCH_COLORS.map((color) => (
            <button
              key={color.name}
              title={color.name}
              onClick={() => onChange("colors", color.name)}
              className="relative w-6 h-6 rounded-full border-2 transition-all duration-150"
              style={{
                backgroundColor: color.hex,
                borderColor: filters.colors.includes(color.name) ? "#5E6B58" : "#D5CFC6",
                outline: filters.colors.includes(color.name) ? "2px solid #5E6B58" : "none",
                outlineOffset: "2px",
              }}
            />
          ))}
        </div>
      </AccordionSection>

      {/* Size (for accessories: One Size / S / M / L / Free Size) */}
      <AccordionSection title="Size" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {["One Size", "XS", "S", "M", "L", "XL", "Free Size"].map((sz) => (
            <button
              key={sz}
              onClick={() => onChange("sizes", sz)}
              className={`px-3 py-1.5 text-[11px] border font-medium tracking-wide transition-all duration-150
                          ${filters.sizes.includes(sz)
                            ? "bg-[#5E6B58] border-[#5E6B58] text-[#F8F5EE]"
                            : "border-[#D5CFC6] text-[#555] hover:border-[#5E6B58] hover:text-[#5E6B58]"
                          }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </AccordionSection>
    </aside>
  );
}