"use client";
import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import FilterSidebar from "../../components/FilterSidebar";

/* ── Mock Products ──────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Linen Kurta — Classic Collar",
    category: "Kurtas",
    price: 2800,
    originalPrice: 3500,
    badge: "New",
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Sage", hex: "#A8B2A1" },
      { name: "Charcoal", hex: "#3D3D3D" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4f7a?w=600&q=80",
      "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?w=600&q=80",
    ],
  },
  {
    id: 2,
    name: "Chanderi Silk Kurta",
    category: "Kurtas",
    price: 4200,
    badge: "Best Seller",
    colors: [
      { name: "Olive", hex: "#5E6B58" },
      { name: "Taupe", hex: "#B7A99A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1610189352649-6f5e49bda9b2?w=600&q=80",
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80",
    ],
  },
  {
    id: 3,
    name: "Block Print Kurta Pajama Set",
    category: "Sets",
    price: 5800,
    originalPrice: 7200,
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Rust", hex: "#9E4A2F" },
    ],
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600&q=80",
    ],
  },
  {
    id: 4,
    name: "Nehru Jacket — Brocade",
    category: "Jackets",
    price: 6500,
    badge: "New",
    colors: [
      { name: "Gold", hex: "#C8A96B" },
      { name: "Charcoal", hex: "#3D3D3D" },
    ],
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
      "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=600&q=80",
    ],
  },
  {
    id: 5,
    name: "Cotton Pathani Suit",
    category: "Sets",
    price: 3900,
    colors: [
      { name: "Sage", hex: "#A8B2A1" },
      { name: "Ivory", hex: "#F5F0E8" },
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    ],
  },
  {
    id: 6,
    name: "Ikat Woven Stole",
    category: "Accessories",
    price: 1100,
    originalPrice: 1400,
    colors: [
      { name: "Rust", hex: "#9E4A2F" },
      { name: "Olive", hex: "#5E6B58" },
    ],
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
      "https://images.unsplash.com/photo-1609948543911-3af7f0a2e28e?w=600&q=80",
    ],
  },
  {
    id: 7,
    name: "Bandhgala Jacket — Silk",
    category: "Jackets",
    price: 8900,
    originalPrice: 10500,
    colors: [
      { name: "Charcoal", hex: "#3D3D3D" },
      { name: "Taupe", hex: "#B7A99A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1627225924765-552d49cf369f?w=600&q=80",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&q=80",
    ],
  },
  {
    id: 8,
    name: "Khadi Cotton Kurta",
    category: "Kurtas",
    price: 1950,
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Sage", hex: "#A8B2A1" },
      { name: "Taupe", hex: "#B7A99A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&q=80",
      "https://images.unsplash.com/photo-1603251578711-3290ca1a0187?w=600&q=80",
    ],
  },
  {
    id: 9,
    name: "Festive Dhoti Set",
    category: "Sets",
    price: 6200,
    badge: "New",
    colors: [
      { name: "Gold", hex: "#C8A96B" },
      { name: "Ivory", hex: "#F5F0E8" },
    ],
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80",
    ],
  },
  {
    id: 10,
    name: "Embroidered Modi Jacket",
    category: "Jackets",
    price: 5400,
    colors: [
      { name: "Olive", hex: "#5E6B58" },
      { name: "Rust", hex: "#9E4A2F" },
    ],
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=80",
    ],
  },
  {
    id: 11,
    name: "Linen Palazzo Pants",
    category: "Bottoms",
    price: 1800,
    originalPrice: 2200,
    colors: [
      { name: "Charcoal", hex: "#3D3D3D" },
      { name: "Ivory", hex: "#F5F0E8" },
    ],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    ],
  },
  {
    id: 12,
    name: "Printed Churidar",
    category: "Bottoms",
    price: 1200,
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Sage", hex: "#A8B2A1" },
    ],
    images: [
      "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=600&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    ],
  },
];

const CATEGORIES = ["Kurtas", "Sets", "Jackets", "Bottoms", "Accessories"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low–High", value: "price-asc" },
  { label: "Price: High–Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
];

const EMPTY_FILTERS = { colors: [], sizes: [], price: null, collections: [] };

function priceInRange(price, range) {
  if (!range) return true;
  const [min, max] = range.split("-").map(Number);
  return price >= min && price <= max;
}

/* ── Page ───────────────────────────────────────────────────── */
export default function MenPage() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleFilterChange(key, value) {
    setFilters((prev) => {
      if (key === "price") return { ...prev, price: value };
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  }

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (
        filters.collections.length &&
        !filters.collections.includes(p.category)
      )
        return false;
      if (
        filters.colors.length &&
        !p.colors.some((c) => filters.colors.includes(c.name))
      )
        return false;
      if (!priceInRange(p.price, filters.price)) return false;
      return true;
    });
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "newest") list = [...list].reverse();
    return list;
  }, [filters, sort]);

  const activeCount = [
    filters.colors.length,
    filters.sizes.length,
    filters.price ? 1 : 0,
    filters.collections.length,
  ].reduce((a, b) => a + b, 0);

  return (
    <div
      className="bg-[#F8F5EE] min-h-screen"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-56 md:h-72 overflow-hidden bg-[#3D3D3D]">
        <img
          src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&q=80"
          alt="Men's Collection"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-35"
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[10px] uppercase tracking-[4px] text-[#A8B2A1] font-semibold mb-3">
            Collections
          </p>
          <h1
            className="text-[40px] md:text-[52px] leading-tight text-[#F8F5EE]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
            }}
          >
            Men
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <span className="w-12 h-px bg-[#A8B2A1]/60" />
            <span className="text-[#A8B2A1] text-sm">✦</span>
            <span className="w-12 h-px bg-[#A8B2A1]/60" />
          </div>
          <p className="text-[13px] text-[#c8cfc5] mt-4 max-w-md leading-relaxed">
            Kurtas, sets, jackets and more — crafted for the modern Indian man.
          </p>
        </div>
      </section>

      {/* ── Breadcrumb ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-2 text-[11px] text-[#999] uppercase tracking-wider">
          <a href="/" className="hover:text-[#5E6B58] transition-colors">
            Home
          </a>
          <span>/</span>
          <a
            href="/collections"
            className="hover:text-[#5E6B58] transition-colors"
          >
            Collections
          </a>
          <span>/</span>
          <span className="text-[#5E6B58] font-semibold">Men</span>
        </nav>
      </div>

      {/* ── Category Pills ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-6 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setFilters(EMPTY_FILTERS)}
            className={`flex-shrink-0 px-5 py-2 text-[11px] uppercase tracking-[2px] font-semibold
                        border transition-all duration-200
                        ${
                          filters.collections.length === 0
                            ? "bg-[#5E6B58] border-[#5E6B58] text-[#F8F5EE]"
                            : "border-[#D5CFC6] text-[#666] hover:border-[#5E6B58] hover:text-[#5E6B58]"
                        }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  collections: prev.collections.includes(cat) ? [] : [cat],
                }))
              }
              className={`flex-shrink-0 px-5 py-2 text-[11px] uppercase tracking-[2px] font-semibold
                          border transition-all duration-200
                          ${
                            filters.collections.includes(cat)
                              ? "bg-[#5E6B58] border-[#5E6B58] text-[#F8F5EE]"
                              : "border-[#D5CFC6] text-[#666] hover:border-[#5E6B58] hover:text-[#5E6B58]"
                          }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Toolbar ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between border-b border-[#E4E0D8]">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[2px] font-semibold
                     text-[#2D2D2D] border border-[#D5CFC6] px-4 py-2 hover:border-[#5E6B58]
                     hover:text-[#5E6B58] transition-colors lg:hidden"
        >
          <SlidersHorizontal size={13} strokeWidth={1.5} />
          Filters {activeCount > 0 && `(${activeCount})`}
        </button>

        <p className="hidden lg:block text-[12px] text-[#999]">
          {filtered.length} products
        </p>

        {/* Sort */}
        <div className="relative ml-auto">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[2px] font-semibold
                       text-[#2D2D2D] border border-[#D5CFC6] px-4 py-2 hover:border-[#5E6B58]
                       hover:text-[#5E6B58] transition-colors"
          >
            Sort: {SORT_OPTIONS.find((o) => o.value === sort)?.label}
            <ChevronDown size={12} strokeWidth={2} />
          </button>
          {sortOpen && (
            <ul
              className="absolute right-0 top-full mt-1 bg-white border border-[#E4E0D8]
                           shadow-lg z-30 w-48 py-1"
            >
              {SORT_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => {
                      setSort(opt.value);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[12px] transition-colors
                                ${
                                  sort === opt.value
                                    ? "bg-[#F0EDE8] text-[#5E6B58] font-semibold"
                                    : "text-[#555] hover:bg-[#F8F5EE] hover:text-[#5E6B58]"
                                }`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── Main Layout ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex gap-10">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onClear={() => setFilters(EMPTY_FILTERS)}
            totalResults={filtered.length}
            accessoryCategories={CATEGORIES}
          />
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
              <p
                className="text-[22px] text-[#5E6B58]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                No products found
              </p>
              <p className="text-[13px] text-[#999]">
                Try adjusting or clearing your filters.
              </p>
              <button
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="mt-2 px-6 py-2.5 border border-[#5E6B58] text-[#5E6B58] text-[11px]
                           uppercase tracking-[2px] font-semibold hover:bg-[#5E6B58]
                           hover:text-[#F8F5EE] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-14">
                <button
                  className="px-10 py-3 border border-[#5E6B58] text-[#5E6B58] text-[11px]
                             uppercase tracking-[3px] font-semibold hover:bg-[#5E6B58]
                             hover:text-[#F8F5EE] transition-all duration-200"
                >
                  Load More
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile Sidebar Drawer ─────────────────────────────── */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-[#F8F5EE] z-50 lg:hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4E0D8]">
              <p className="text-[11px] uppercase tracking-[3px] font-bold text-[#2D2D2D]">
                Filters
              </p>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={18} strokeWidth={1.5} className="text-[#5E6B58]" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-6 py-4">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onClear={() => setFilters(EMPTY_FILTERS)}
                totalResults={filtered.length}
                accessoryCategories={CATEGORIES}
              />
            </div>
            <div className="px-6 py-5 border-t border-[#E4E0D8]">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-full py-3 bg-[#5E6B58] text-[#F8F5EE] text-[11px] uppercase
                           tracking-[3px] font-semibold hover:bg-[#4a5546] transition-colors"
              >
                View {filtered.length} Products
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
