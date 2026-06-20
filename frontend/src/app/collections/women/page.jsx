"use client";
import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import FilterSidebar from "../../components/FilterSidebar";

/* ── Mock Products ──────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Floral Anarkali Set",
    category: "Dresses",
    price: 4200,
    originalPrice: 5200,
    badge: "New",
    colors: [
      { name: "Blush", hex: "#E8C5B0" },
      { name: "Ivory", hex: "#F5F0E8" },
    ],
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    ],
  },
  {
    id: 2,
    name: "Banarasi Silk Saree",
    category: "Sarees",
    price: 8900,
    badge: "Best Seller",
    colors: [
      { name: "Gold", hex: "#C8A96B" },
      { name: "Rust", hex: "#9E4A2F" },
    ],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
      "https://images.unsplash.com/photo-1618244972963-dbad68f8f3b9?w=600&q=80",
    ],
  },
];

const CATEGORIES = [
  "Sarees",
  "Kurtas",
  "Dresses",
  "Co-Ords",
  "Bottoms",
  "Accessories",
];
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
export default function WomenPage() {
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
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&q=80"
          alt="Women's Collection"
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
            Women
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <span className="w-12 h-px bg-[#A8B2A1]/60" />
            <span className="text-[#A8B2A1] text-sm">✦</span>
            <span className="w-12 h-px bg-[#A8B2A1]/60" />
          </div>
          <p className="text-[13px] text-[#c8cfc5] mt-4 max-w-md leading-relaxed">
            Elegant sarees, kurtas, dresses and timeless styles — crafted for
            the modern woman.
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
          <span className="text-[#5E6B58] font-semibold">Women</span>
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
