"use client";
import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import FilterSidebar from "../../components/FilterSidebar";

/* ── Mock Products ──────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, name: "Zari Potli Bag", category: "Bags", price: 2800, originalPrice: 3500, badge: "New",
    colors: [{ name: "Gold", hex: "#C8A96B" }, { name: "Ivory", hex: "#F5F0E8" }],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    ],
  },
  {
    id: 2, name: "Hand-Embroidered Clutch", category: "Bags", price: 1900,
    colors: [{ name: "Sage", hex: "#A8B2A1" }, { name: "Blush", hex: "#E8C5B0" }],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    ],
  },
  {
    id: 3, name: "Ajrakh Block Print Stole", category: "Stoles & Dupattas", price: 1200, originalPrice: 1600,
    colors: [{ name: "Rust", hex: "#9E4A2F" }, { name: "Charcoal", hex: "#3D3D3D" }],
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    ],
  },
  {
    id: 4, name: "Silk Chanderi Dupatta", category: "Stoles & Dupattas", price: 2200, badge: "Best Seller",
    colors: [{ name: "Ivory", hex: "#F5F0E8" }, { name: "Sage", hex: "#A8B2A1" }, { name: "Gold", hex: "#C8A96B" }],
    images: [
      "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&q=80",
      "https://images.unsplash.com/photo-1617022678019-8d0dc0700f6d?w=600&q=80",
    ],
  },
  {
    id: 5, name: "Kundan Drop Earrings", category: "Jewellery", price: 950,
    colors: [{ name: "Gold", hex: "#C8A96B" }],
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    ],
  },
  {
    id: 6, name: "Oxidised Silver Bangles (Set of 6)", category: "Jewellery", price: 1400, originalPrice: 1800,
    colors: [{ name: "Charcoal", hex: "#3D3D3D" }],
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
    ],
  },
  {
    id: 7, name: "Hand-Painted Potli — Florals", category: "Bags", price: 3200, badge: "New",
    colors: [{ name: "Blush", hex: "#E8C5B0" }, { name: "Ivory", hex: "#F5F0E8" }],
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
      "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=600&q=80",
    ],
  },
  {
    id: 8, name: "Ikat Woven Belt", category: "Belts", price: 850,
    colors: [{ name: "Taupe", hex: "#B7A99A" }, { name: "Rust", hex: "#9E4A2F" }],
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
    ],
  },
  {
    id: 9, name: "Kantha Stitch Hair Scarf", category: "Stoles & Dupattas", price: 680,
    colors: [{ name: "Sage", hex: "#A8B2A1" }, { name: "Gold", hex: "#C8A96B" }],
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
    ],
  },
];

const CATEGORIES = ["Bags", "Stoles & Dupattas", "Jewellery", "Belts"];

const SORT_OPTIONS = [
  { label: "Featured",       value: "featured" },
  { label: "Price: Low–High", value: "price-asc" },
  { label: "Price: High–Low", value: "price-desc" },
  { label: "Newest First",   value: "newest" },
];

const EMPTY_FILTERS = { colors: [], sizes: [], price: null, collections: [] };

function priceInRange(price, range) {
  if (!range) return true;
  const [min, max] = range.split("-").map(Number);
  return price >= min && price <= max;
}

/* ── Page ───────────────────────────────────────────────────── */
export default function AccessoriesPage() {
  const [filters, setFilters]       = useState(EMPTY_FILTERS);
  const [sort, setSort]             = useState("featured");
  const [sortOpen, setSortOpen]     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile

  function handleFilterChange(key, value) {
    setFilters((prev) => {
      if (key === "price") return { ...prev, price: value };
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (filters.collections.length && !filters.collections.includes(p.category)) return false;
      if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c.name))) return false;
      if (!priceInRange(p.price, filters.price)) return false;
      return true;
    });

    if (sort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "newest")     list = [...list].reverse();

    return list;
  }, [filters, sort]);

  const activeCount = [
    filters.colors.length,
    filters.sizes.length,
    filters.price ? 1 : 0,
    filters.collections.length,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-[#F8F5EE] min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── Hero Banner ───────────────────────────────────── */}
      <section className="relative h-56 md:h-72 overflow-hidden bg-[#5E6B58]">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80"
          alt="Accessories"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[10px] uppercase tracking-[4px] text-[#A8B2A1] font-semibold mb-3">
            Collections
          </p>
          <h1
            className="text-[40px] md:text-[52px] leading-tight text-[#F8F5EE]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}
          >
            Accessories
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <span className="w-12 h-px bg-[#A8B2A1]/60" />
            <span className="text-[#A8B2A1] text-sm">✦</span>
            <span className="w-12 h-px bg-[#A8B2A1]/60" />
          </div>
          <p className="text-[13px] text-[#c8cfc5] mt-4 max-w-md leading-relaxed">
            Bags, dupattas, jewellery and more — the details that complete an outfit.
          </p>
        </div>
      </section>

      {/* ── Breadcrumb ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-2 text-[11px] text-[#999] uppercase tracking-wider">
          <a href="/" className="hover:text-[#5E6B58] transition-colors">Home</a>
          <span>/</span>
          <a href="/collections" className="hover:text-[#5E6B58] transition-colors">Collections</a>
          <span>/</span>
          <span className="text-[#5E6B58] font-semibold">Accessories</span>
        </nav>
      </div>

      {/* ── Toolbar ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between border-b border-[#E4E0D8]">
        {/* Mobile filter toggle */}
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
            <ul className="absolute right-0 top-full mt-1 bg-white border border-[#E4E0D8]
                           shadow-lg z-30 w-48 py-1">
              {SORT_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => { setSort(opt.value); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-[12px] transition-colors
                                ${sort === opt.value
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

      {/* ── Main Layout ───────────────────────────────────── */}
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
              <p className="text-[13px] text-[#999]">Try adjusting or clearing your filters.</p>
              <button
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="mt-2 px-6 py-2.5 border border-[#5E6B58] text-[#5E6B58] text-[11px]
                           uppercase tracking-[2px] font-semibold hover:bg-[#5E6B58] hover:text-[#F8F5EE]
                           transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Sidebar Drawer ─────────────────────────── */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-72 bg-[#F8F5EE] z-50 lg:hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4E0D8]">
              <p className="text-[11px] uppercase tracking-[3px] font-bold text-[#2D2D2D]">Filters</p>
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