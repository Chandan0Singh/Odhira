"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

const API = "http://localhost:5000/api";

const SORT_OPTIONS = [
  { label: "Newest First",   value: "newest" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Most Popular",  value: "popular" },
];

export default function ProductsPage() {
  const [products,    setProducts]    = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [total,       setTotal]       = useState(0);
  const [page,        setPage]        = useState(1);
  const [pages,       setPages]       = useState(1);

  // Filters
  const [search,     setSearch]     = useState("");
  const [sort,       setSort]       = useState("newest");
  const [category,   setCategory]   = useState("");
  const [collection, setCollection] = useState("");
  const [onlyFlag,   setOnlyFlag]   = useState(""); // "isSale" | "isNewArrival" | "isFeatured" | ""
  const [showFilter, setShowFilter] = useState(false);

  // ─── FETCH ────────────────────────────────────────────────────────────────
  const fetchProducts = useCallback(async (resetPage = false) => {
    try {
      setLoading(true);
      const currentPage = resetPage ? 1 : page;
      if (resetPage) setPage(1);

      const params = { sort, page: currentPage, limit: 12, status: "Active" };
      if (category)   params.category   = category;
      if (collection) params.collection = collection;
      if (onlyFlag)   params[onlyFlag]  = true;

      const { data } = await axios.get(`${API}/products`, { params });

      console.log("Fetched products:", data.products);

      setProducts(data.products || []);
      console.log("dsafc", data.products);
      setTotal(data.total   || 0);
      setPages(data.pages   || 1);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [sort, page, category, collection, onlyFlag]);

  // fetch categories + collections once
  useEffect(() => {
    axios.get(`${API}/categories`).then(({ data }) => setCategories(data)).catch(console.error);
    axios.get(`${API}/collections`).then(({ data }) => setCollections(data)).catch(console.error);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ─── SEARCH (debounced, hits /search endpoint) ───────────────────────────
  useEffect(() => {
    if (!search.trim()) { fetchProducts(true); return; }
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/products/search`, { params: { q: search } });
        setProducts(data || []);
        setTotal(data.length || 0);
        setPages(1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

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

  const clearFilters = () => {
    setCategory(""); setCollection(""); setOnlyFlag(""); setSort("newest"); setSearch("");
  };

  const hasActiveFilters = category || collection || onlyFlag || sort !== "newest" || search;

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#F8F5EE] min-h-screen">

      {/* Hero */}
      <section className="bg-[#5E6B58] text-white py-20 text-center px-6">
        <h1 className="text-5xl mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
          Our Collection
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Explore our curated collection of fashion, accessories and timeless
          designs crafted for modern lifestyles.
        </p>

        {/* Search bar in hero */}
        <div className="mt-8 max-w-xl mx-auto flex items-center bg-white rounded-full px-5 py-3 gap-3 shadow">
          <Search size={18} className="text-[#5E6B58]" />
          <input
            type="text"
            placeholder="Search products, fabrics, styles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-gray-700 text-sm bg-transparent"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={16} className="text-gray-400 hover:text-gray-700" />
            </button>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">

        {/* Filter / Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-500">{total} products</span>

            {/* Quick flags */}
            {[
              { label: "New Arrivals", value: "isNewArrival" },
              { label: "Sale",         value: "isSale" },
              { label: "Featured",     value: "isFeatured" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => { setOnlyFlag(onlyFlag === f.value ? "" : f.value); setPage(1); }}
                className={`text-sm px-4 py-1.5 border transition ${
                  onlyFlag === f.value
                    ? "bg-[#5E6B58] text-white border-[#5E6B58]"
                    : "border-gray-300 text-gray-600 hover:border-[#5E6B58]"
                }`}
              >
                {f.label}
              </button>
            ))}

            {/* Filter toggle */}
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
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
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
          <div className="bg-white border border-gray-200 p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                  className="w-full appearance-none border border-gray-200 px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:border-[#5E6B58]"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Collection</label>
              <div className="relative">
                <select
                  value={collection}
                  onChange={(e) => { setCollection(e.target.value); setPage(1); }}
                  className="w-full appearance-none border border-gray-200 px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:border-[#5E6B58]"
                >
                  <option value="">All Collections</option>
                  {collections.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
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
            <p className="text-lg">No products found.</p>
            <button onClick={clearFilters} className="mt-4 text-sm text-[#5E6B58] underline">
              Clear filters
            </button>
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
                    href={`/shop/${p._id}`}
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
        {pages > 1 && !search && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 text-sm text-gray-600 hover:border-[#5E6B58] disabled:opacity-40 transition"
            >
              ← Prev
            </button>

            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
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
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
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