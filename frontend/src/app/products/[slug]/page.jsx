"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronRight } from "lucide-react";

const API = "http://localhost:5000/api";

const SORT_OPTIONS = [
  { label: "Newest First",      value: "newest" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Most Popular",      value: "popular" },
];

// Slugs that map to a fixed, dedicated backend route under /api/collections/*
const FIXED_ENDPOINTS = {
  men:               "/collections/men",
  women:             "/collections/women",
  kids:              "/collections/kids",
  teen:              "/collections/teen",
  elder:             "/collections/elder",
  unisex:            "/collections/unisex",
  accessories:       "/collections/accessories",
  "new-arrivals":    "/collections/new-arrivals",
  sale:              "/collections/sale",
  "best-sellers":    "/collections/best-sellers",
  "limited-edition": "/collections/limited-edition",
  trending:          "/collections/trending",
  featured:          "/collections/featured",
};

// Slugs whose backend handler returns simple {products, count} with no server-side pagination
const NO_PAGINATION_SLUGS = new Set(["men", "accessories"]);

// Only the "women" route currently supports sub-category tag + color swatch filters
const SUPPORTS_SUBFILTERS = new Set(["women"]);

const WOMEN_TAGS = ["Sarees", "Kurtas", "Dresses", "Co-ords", "Tops", "Bottoms"];
const WOMEN_COLORS = [
  { name: "Gold",   hex: "#D4AF37" },
  { name: "Rust",   hex: "#B7410E" },
  { name: "Ivory",  hex: "#F4EDE1" },
  { name: "Maroon", hex: "#7A1F2B" },
  { name: "Teal",   hex: "#2F6E6E" },
  { name: "Black",  hex: "#1A1A1A" },
];

export default function ShopSlugPage() {
  const params = useParams();
  console.log("params:", params);
  const slug = params?.slug;

  const [pageMeta,  setPageMeta]  = useState({ title: "", description: "", banner: null });
  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [notFound,  setNotFound]  = useState(false);
  const [total,     setTotal]     = useState(0);
  const [page,      setPage]      = useState(1);
  const [pages,     setPages]     = useState(1);
  const [paginated, setPaginated] = useState(true);

  // Filters
  const [sort,       setSort]       = useState("newest");
  const [minPrice,   setMinPrice]   = useState("");
  const [maxPrice,   setMaxPrice]   = useState("");
  const [tag,        setTag]        = useState("");
  const [colors,     setColors]     = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const isFixed      = FIXED_ENDPOINTS.hasOwnProperty(slug);
  const endpointPath = isFixed ? FIXED_ENDPOINTS[slug] : `/collections/page/${slug}`;
  const noServerPagination = NO_PAGINATION_SLUGS.has(slug);
  const supportsSubfilters = SUPPORTS_SUBFILTERS.has(slug);

  const toggleColor = (name) => {
    setColors((prev) => (prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]));
    setPage(1);
  };

  const fetchPage = useCallback(async (targetPage = 1) => {
    if (!slug) return;
    try {
      setLoading(true);
      setNotFound(false);

      const query = { sort, page: targetPage, limit: 12 };
      if (minPrice) query.minPrice = minPrice;
      if (maxPrice) query.maxPrice = maxPrice;
      if (supportsSubfilters) {
        if (tag) query.tag = tag;
        if (colors.length) query.colors = colors.join(",");
      }

      const { data } = await axios.get(`${API}${endpointPath}`, { params: query });

      console.log("Fetched data:", `${API}${endpointPath}`, { params: query });

      setProducts(data.products || []);
      setPageMeta({
        title: data.pageTitle || prettify(slug),
        description: data.pageDescription || "",
        banner: data.banner || null,
      });

      if (typeof data.pages === "number") {
        setPaginated(true);
        setTotal(data.total ?? data.count ?? (data.products || []).length);
        setPages(data.pages || 1);
        setPage(data.page || targetPage);
      } else {
        setPaginated(false);
        setTotal(data.count ?? (data.products || []).length);
        setPages(1);
        setPage(1);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setNotFound(true);
        setProducts([]);
      } else {
        console.error("Fetch error:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [slug, endpointPath, sort, minPrice, maxPrice, tag, colors, supportsSubfilters]);

  useEffect(() => { fetchPage(1); }, [slug, sort, minPrice, maxPrice, tag, colors]); // eslint-disable-line react-hooks/exhaustive-deps

  const goToPage = (p) => {
    if (p < 1 || p > pages) return;
    fetchPage(p);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSort("newest"); setMinPrice(""); setMaxPrice(""); setTag(""); setColors([]);
  };

  const hasActiveFilters = sort !== "newest" || minPrice || maxPrice || tag || colors.length > 0;

  // ─── HELPERS ─────────────────────────────────────────────────────────────
  const coverImage = (p) => {
    if (p.images?.length) {
      const primary = p.images.find((img) => img.isPrimary);
      return primary?.url || p.images[0]?.url;
    }
    return "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600";
  };

  const displayPrice = (p) => (
    <div className="flex items-center gap-2">
      <span className="text-xl font-semibold text-[#5E6B58]">
        ₹{p.discountedPrice || p.price}
      </span>
      {p.discountedPrice && (
        <>
          <span className="text-sm text-gray-400 line-through">₹{p.price}</span>
          <span className="text-xs bg-[#5E6B58] text-white px-1.5 py-0.5 rounded">
            {Math.round(((p.price - p.discountedPrice) / p.price) * 100)}% off
          </span>
        </>
      )}
    </div>
  );

  // ─── NOT FOUND ───────────────────────────────────────────────────────────
  if (!loading && notFound) {
    return (
      <div className="bg-[#F8F5EE] min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-2xl text-gray-700 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            We couldn&apos;t find that page
          </p>
          <p className="text-gray-500 mb-6">
            &ldquo;{prettify(slug)}&rdquo; doesn&apos;t match anything in our collection.
          </p>
          <Link href="/shop" className="inline-block bg-[#5E6B58] text-white px-6 py-2.5 text-sm hover:opacity-90 transition">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#F8F5EE] min-h-screen">

      {/* Hero */}
      <section
        className="text-white py-20 text-center px-6 relative overflow-hidden"
        style={{
          backgroundColor: "#5E6B58",
          backgroundImage: pageMeta.banner ? `url(${pageMeta.banner})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {pageMeta.banner && <div className="absolute inset-0 bg-black/40" />}
        <div className="relative">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-1 text-xs text-gray-200 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:underline">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-white">{loading ? "…" : pageMeta.title}</span>
          </div>

          <h1 className="text-5xl mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            {loading ? prettify(slug) : pageMeta.title}
          </h1>
          {pageMeta.description && (
            <p className="text-gray-200 max-w-2xl mx-auto">{pageMeta.description}</p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">

        {/* Filter / Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-500">{total} products</span>

            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 text-sm px-4 py-1.5 border border-gray-300 text-gray-600 hover:border-[#5E6B58] transition"
            >
              <SlidersHorizontal size={15} /> Filters
            </button>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm text-red-500 hover:underline flex items-center gap-1">
                <X size={13} /> Clear all
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none text-sm border border-gray-300 bg-white px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:border-[#5E6B58] cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Expanded Filters Panel */}
        {showFilter && (
          <div className="bg-white border border-gray-200 p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#5E6B58]"
                />
                <span className="text-gray-400">—</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#5E6B58]"
                />
              </div>
            </div>

            {supportsSubfilters && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {WOMEN_TAGS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTag(tag === t ? "" : t)}
                        className={`text-xs px-3 py-1.5 border transition ${
                          tag === t
                            ? "bg-[#5E6B58] text-white border-[#5E6B58]"
                            : "border-gray-300 text-gray-600 hover:border-[#5E6B58]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Color</label>
                  <div className="flex flex-wrap gap-3">
                    {WOMEN_COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => toggleColor(c.name)}
                        title={c.name}
                        className={`w-7 h-7 rounded-full border-2 transition ${
                          colors.includes(c.name) ? "border-[#5E6B58] scale-110" : "border-gray-200"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white animate-pulse">
                <div className="w-full h-80 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-9 bg-gray-200 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Search size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-lg">No products found in {pageMeta.title}.</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="mt-4 text-sm text-[#5E6B58] underline">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition group"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={coverImage(p)}
                    alt={p.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600"; }}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {p.isNewArrival && (
                      <span className="bg-[#5E6B58] text-white text-xs px-2 py-0.5">New</span>
                    )}
                    {p.isSale && p.discountedPrice && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5">
                        {Math.round(((p.price - p.discountedPrice) / p.price) * 100)}% Off
                      </span>
                    )}
                    {p.isBestSeller && (
                      <span className="bg-amber-500 text-white text-xs px-2 py-0.5">Best Seller</span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-[#5E6B58] uppercase tracking-wide mb-1">
                    {p.category?.name || p.collection?.name || ""}
                  </p>

                  <h3 className="text-base font-medium text-gray-800 mb-2 leading-snug line-clamp-2">
                    {p.title}
                  </h3>

                  {p.fabric && (
                    <p className="text-xs text-gray-400 mb-2">{p.fabric}</p>
                  )}

                  <div className="mb-4">{displayPrice(p)}</div>

                  {/* Stock warning */}
                  {p.totalStock > 0 && p.totalStock <= 5 && (
                    <p className="text-xs text-red-500 mb-2">Only {p.totalStock} left!</p>
                  )}

                  <Link
                    href={`/shop/${p.slug || p._id}`}
                    className="block text-center border border-[#5E6B58] text-[#5E6B58] py-2 text-sm hover:bg-[#5E6B58] hover:text-white transition"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginated && !noServerPagination && pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 text-sm text-gray-600 hover:border-[#5E6B58] disabled:opacity-40 transition"
            >
              ← Prev
            </button>

            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`w-9 h-9 text-sm border transition ${
                  page === i + 1
                    ? "bg-[#5E6B58] text-white border-[#5E6B58]"
                    : "border-gray-300 text-gray-600 hover:border-[#5E6B58]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === pages}
              className="px-4 py-2 border border-gray-300 text-sm text-gray-600 hover:border-[#5E6B58] disabled:opacity-40 transition"
            >
              Next →
            </button>
          </div>
        )}

      </section>
    </div>
  );
}

function prettify(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}