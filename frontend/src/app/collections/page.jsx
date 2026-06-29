"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Static hero images mapped by collection slug (fallback if no banner)
const COLLECTION_IMAGES = {
  "new-arrivals":   "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  "best-sellers":   "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80",
  "sale":           "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80",
  "limited-edition":"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
  "trending-now":   "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80",
};

const COLLECTION_BADGES = {
  "new-arrivals":    { label: "Just In",        color: "#5E6B58" },
  "best-sellers":    { label: "Most Loved",     color: "#8B6F47" },
  "sale":            { label: "Up to 25% Off",  color: "#C0392B" },
  "limited-edition": { label: "Limited Stock",  color: "#2C3E50" },
  "trending-now":    { label: "Trending",       color: "#7D6B91" },
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-[#E4E0D8] overflow-hidden animate-pulse">
      <div className="w-full h-[420px] bg-[#E4E0D8]" />
      <div className="p-8 text-center space-y-3">
        <div className="h-8 bg-[#E4E0D8] rounded w-2/3 mx-auto" />
        <div className="h-4 bg-[#E4E0D8] rounded w-3/4 mx-auto" />
        <div className="h-4 bg-[#E4E0D8] rounded w-1/2 mx-auto" />
        <div className="h-10 bg-[#E4E0D8] rounded w-1/3 mx-auto mt-4" />
      </div>
    </div>
  );
}

// ─── Collection Card ──────────────────────────────────────────────────────────
function CollectionCard({ collection, productCount }) {
  const image =
    collection.banner || COLLECTION_IMAGES[collection.slug] || COLLECTION_IMAGES["new-arrivals"];
  const badge = COLLECTION_BADGES[collection.slug];

  return (
    <a
      href={`/collections/${collection.slug}?id=${collection._id}`}
      className="group bg-white border border-[#E4E0D8] overflow-hidden block"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={collection.name}
          className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-500" />

        {/* Badge */}
        {badge && (
          <span
            className="absolute top-4 left-4 px-3 py-1 text-white text-xs uppercase tracking-[2px] font-semibold"
            style={{ backgroundColor: badge.color }}
          >
            {badge.label}
          </span>
        )}

        {/* Product count pill */}
        {productCount !== undefined && (
          <span className="absolute bottom-4 right-4 bg-white/90 text-[#2D2D2D] text-xs px-3 py-1 uppercase tracking-[1px]">
            {productCount} {productCount === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-8 text-center">
        <h2
          className="text-4xl text-[#2D2D2D]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {collection.name}
        </h2>

        {collection.description && (
          <p className="mt-3 text-[#666] leading-relaxed">{collection.description}</p>
        )}

        <button className="mt-6 px-8 py-3 border border-[#5E6B58] text-[#5E6B58] uppercase tracking-[3px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition">
          Explore
        </button>
      </div>
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CollectionsPage() {
  const [collections, setCollections]   = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  // 1. Fetch all active collections
  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/collections`);
        if (!res.ok) throw new Error(`Failed to fetch collections (${res.status})`);

        const data = await res.json();

        // Support both { collections: [] } and plain array responses
        const list = Array.isArray(data) ? data : data.collections || [];
        const active = list.filter((c) => c.status === "Active");
        setCollections(active);

        // 2. Fetch product counts for each collection in parallel
        const counts = await Promise.all(
          active.map(async (col) => {
            try {
              const r = await fetch(
                `${API_BASE}/products/collection/${col._id}`
              );
              if (!r.ok) return { id: col._id, count: 0 };
              const products = await r.json();
              const list = Array.isArray(products)
                ? products
                : products.products || [];
              return { id: col._id, count: list.length };
            } catch {
              return { id: col._id, count: 0 };
            }
          })
        );

        const countMap = {};
        counts.forEach(({ id, count }) => { countMap[id] = count; });
        setProductCounts(countMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return (
    <div className="bg-[#F8F5EE] min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[350px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80"
          alt="Collections"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
          <p className="uppercase tracking-[4px] text-sm mb-3">Explore</p>
          <h1
            className="text-5xl md:text-7xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Collections
          </h1>
          <p className="mt-4 max-w-2xl text-gray-200">
            Discover our curated collections designed for every occasion.
          </p>
        </div>
      </section>

      {/* ── Collection Grid ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-[#C0392B] text-lg mb-2">Could not load collections</p>
            <p className="text-[#999] text-sm mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-[#5E6B58] text-[#5E6B58] uppercase tracking-[2px] text-xs hover:bg-[#5E6B58] hover:text-white transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && !error && (
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Collections Grid */}
        {!loading && !error && collections.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {collections.map((col) => (
              <CollectionCard
                key={col._id}
                collection={col}
                productCount={productCounts[col._id]}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && collections.length === 0 && (
          <div className="text-center py-20">
            <p
              className="text-3xl text-[#2D2D2D] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No Collections Yet
            </p>
            <p className="text-[#999]">Check back soon — something beautiful is coming.</p>
          </div>
        )}
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#EFE8DE] py-24 text-center">
        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Crafted For Every Style
        </h2>
        <p className="mt-4 text-[#666] max-w-xl mx-auto">
          Explore luxury fashion collections designed with timeless elegance.
        </p>
        <a
          href="/shop"
          className="inline-block mt-8 px-10 py-4 bg-[#5E6B58] text-white uppercase tracking-[3px] text-sm hover:bg-[#4a5546] transition"
        >
          Shop All
        </a>
      </section>
    </div>
  );
}