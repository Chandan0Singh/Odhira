"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  Heart, ShoppingBag, Truck, ShieldCheck,
  Star, RefreshCw, ChevronDown, ChevronUp,
  ArrowLeft, Share2
} from "lucide-react";

const API = "http://localhost:5000/api";

export default function ProductDetailsPage() {
  const { slug }   = useParams();
  const router     = useRouter();

  // ─── STATE ──────────────────────────────────────────────────────────────────
  const [product,       setProduct]       = useState(null);
  const [related,       setRelated]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize,  setSelectedSize]  = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity,      setQuantity]      = useState(1);
  const [wishlisted,    setWishlisted]    = useState(false);
  const [addedToCart,   setAddedToCart]   = useState(false);
  const [activeTab,     setActiveTab]     = useState("description"); // description | details | reviews
  const [expandedFaq,   setExpandedFaq]   = useState(null);

  // ─── FETCH PRODUCT ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        // try slug first, fall back to ID
        let data;
        try {
          const res = await axios.get(`${API}/products/slug/${slug}`);
          data = res.data;
        } catch {
          const res = await axios.get(`${API}/products/${slug}`);
          data = res.data;
        }

        setProduct(data);

        // increment view count (fire & forget)
        axios.patch(`${API}/products/${data._id}/view`).catch(() => {});

        // auto-select first available size + color
        if (data.variants?.length) {
          const first = data.variants.find((v) => v.stock > 0) || data.variants[0];
          if (first.size)  setSelectedSize(first.size);
          if (first.color) setSelectedColor(first.color);
        }

        // fetch related by same category
        if (data.category?._id) {
          const rel = await axios.get(`${API}/products/category/${data.category._id}`);
          setRelated((rel.data?.products || rel.data || []).filter((p) => p._id !== data._id).slice(0, 4));
        }
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // ─── HELPERS ─────────────────────────────────────────────────────────────────
  const images = product?.images?.length
    ? product.images
    : [{ url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900", alt: "" }];

  const coverImage = (p) => {
    if (p?.images?.length) {
      const primary = p.images.find((img) => img.isPrimary);
      return primary?.url || p.images[0]?.url;
    }
    return `https://picsum.photos/400/500?random=${p?._id?.slice(-3) || 1}`;
  };

  // get unique sizes and colors from variants
  const availableSizes  = [...new Set(product?.variants?.map((v) => v.size).filter(Boolean))];
  const availableColors = [...new Set(product?.variants?.map((v) => v.color).filter(Boolean))];

  // get stock for selected combo
  const selectedVariant = product?.variants?.find(
    (v) => v.size === selectedSize && (availableColors.length === 0 || v.color === selectedColor)
  );
  const stockForVariant = selectedVariant?.stock ?? product?.totalStock ?? 0;

  const discountPercent = product?.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  const displayPrice = product?.discountedPrice || product?.price;

  // ─── ACTIONS ─────────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!selectedSize && availableSizes.length > 0) {
      alert("Please select a size.");
      return;
    }
    // TODO: dispatch to cart context/store
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  // ─── LOADING SKELETON ────────────────────────────────────────────────────────
  if (loading) return (
    <div className="bg-[#F8F5EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="w-full h-[600px] bg-gray-200 animate-pulse" />
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-4 pt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-${i === 1 ? 10 : 4} bg-gray-200 animate-pulse rounded w-${i % 2 === 0 ? "3/4" : "1/2"}`} />
          ))}
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="bg-[#F8F5EE] min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
      <p className="text-lg">Product not found.</p>
      <button onClick={() => router.push("/products")} className="text-[#5E6B58] underline text-sm">
        ← Back to Products
      </button>
    </div>
  );

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#F8F5EE] min-h-screen">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#5E6B58] transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#5E6B58] transition">Products</Link>
          {product.category?.name && (
            <>
              <span>/</span>
              <span className="hover:text-[#5E6B58] transition cursor-pointer">{product.category.name}</span>
            </>
          )}
          <span>/</span>
          <span className="text-gray-600 line-clamp-1">{product.title}</span>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* ── LEFT: Images ──────────────────────────────────────────────── */}
          <div>
            {/* Main Image */}
            <div className="relative bg-white border border-[#E4E0D8] overflow-hidden">
              <img
                src={images[selectedImage]?.url}
                alt={images[selectedImage]?.alt || product.title}
                className="w-full h-[620px] object-cover transition duration-300"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900"; }}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewArrival && (
                  <span className="bg-[#5E6B58] text-white text-xs px-3 py-1 tracking-wider">NEW</span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1">{discountPercent}% OFF</span>
                )}
                {product.isBestSeller && (
                  <span className="bg-amber-500 text-white text-xs px-3 py-1">BEST SELLER</span>
                )}
              </div>

              {/* Back button */}
              <button
                onClick={() => router.back()}
                className="absolute top-4 right-4 bg-white border border-gray-200 p-2 rounded-full hover:bg-gray-50 transition"
              >
                <ArrowLeft size={16} className="text-gray-600" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`border overflow-hidden transition ${
                      selectedImage === i ? "border-[#5E6B58] border-2" : "border-[#E4E0D8] hover:border-[#5E6B58]"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || `View ${i + 1}`}
                      className="w-full h-24 object-cover"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300"; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info ───────────────────────────────────────────────── */}
          <div>

            {/* Category + Collection */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[3px] text-[#888]">
              {product.category?.name && <span>{product.category.name}</span>}
              {product.category?.name && product.collection?.name && <span>·</span>}
              {product.collection?.name && <span>{product.collection.name}</span>}
            </div>

            {/* Title */}
            <h1
              className="text-4xl mt-3 text-[#2D2D2D] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.title}
            </h1>

            {/* Rating */}
            {product.totalReviews > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s} size={14}
                      className={s <= Math.round(product.averageRating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.averageRating?.toFixed(1)} ({product.totalReviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-3xl font-semibold text-[#5E6B58]">₹{displayPrice}</span>
              {product.discountedPrice && (
                <>
                  <span className="line-through text-gray-400 text-lg">₹{product.price}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-medium">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            {product.gst > 0 && (
              <p className="text-xs text-gray-400 mt-1">Inclusive of {product.gst}% GST</p>
            )}

            {/* Short Description */}
            {product.shortDescription && (
              <p className="mt-5 text-[#666] leading-relaxed text-sm">{product.shortDescription}</p>
            )}

            <hr className="my-6 border-[#E4E0D8]" />

            {/* Color Selector */}
            {availableColors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
                  Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {availableColors.map((color) => {
                    const variant = product.variants.find((v) => v.color === color);
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        className={`w-8 h-8 rounded-full border-2 transition ${
                          selectedColor === color ? "border-[#5E6B58] scale-110" : "border-gray-300 hover:border-[#5E6B58]"
                        }`}
                        style={{ backgroundColor: variant?.colorHex || "#ccc" }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">Size</h3>
                  <button className="text-xs text-[#5E6B58] underline">Size Guide</button>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {availableSizes.map((size) => {
                    const variant = product.variants.find(
                      (v) => v.size === size && (availableColors.length === 0 || v.color === selectedColor)
                    );
                    const outOfStock = variant?.stock === 0;
                    return (
                      <button
                        key={size}
                        onClick={() => !outOfStock && setSelectedSize(size)}
                        disabled={outOfStock}
                        className={`w-12 h-12 border text-sm transition relative ${
                          selectedSize === size
                            ? "bg-[#5E6B58] text-white border-[#5E6B58]"
                            : outOfStock
                            ? "border-gray-200 text-gray-300 cursor-not-allowed line-through"
                            : "border-[#D8D2C8] hover:border-[#5E6B58]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {stockForVariant > 0 && stockForVariant <= 5 && (
                  <p className="text-red-500 text-xs mt-2">⚠ Only {stockForVariant} left in this size!</p>
                )}
                {stockForVariant === 0 && selectedSize && (
                  <p className="text-red-500 text-xs mt-2">This combination is out of stock.</p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">Quantity</h3>
              <div className="flex items-center border border-[#D8D2C8] w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                >−</button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(stockForVariant || 10, q + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                >+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={stockForVariant === 0}
                className={`flex-1 py-4 uppercase tracking-[2px] text-sm font-semibold flex items-center justify-center gap-2 transition ${
                  stockForVariant === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-[#5E6B58] text-white hover:bg-[#4a5546]"
                }`}
              >
                <ShoppingBag size={18} />
                {stockForVariant === 0 ? "Out of Stock" : addedToCart ? "Added!" : "Add to Cart"}
              </button>

              <button
                onClick={() => setWishlisted((w) => !w)}
                className={`w-14 border flex items-center justify-center transition ${
                  wishlisted ? "bg-red-50 border-red-300 text-red-500" : "border-[#D8D2C8] hover:border-[#5E6B58]"
                }`}
              >
                <Heart size={20} className={wishlisted ? "fill-red-500" : ""} />
              </button>

              <button
                onClick={handleShare}
                className="w-14 border border-[#D8D2C8] flex items-center justify-center hover:border-[#5E6B58] transition"
              >
                <Share2 size={18} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={stockForVariant === 0}
              className="w-full mt-3 border border-[#5E6B58] py-4 text-[#5E6B58] uppercase tracking-[2px] text-sm font-semibold hover:bg-[#5E6B58] hover:text-white transition disabled:opacity-40"
            >
              Buy Now
            </button>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: <Truck size={16} />,      text: "Free Shipping Across India" },
                { icon: <ShieldCheck size={16} />, text: "Secure Payments" },
                { icon: <RefreshCw size={16} />,  text: "14-Day Easy Returns" },
                { icon: <Star size={16} />,        text: "Premium Quality Assured" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-gray-600 bg-white border border-[#E4E0D8] px-3 py-2">
                  <span className="text-[#5E6B58]">{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* SKU */}
            {selectedVariant?.sku && (
              <p className="text-xs text-gray-400 mt-4">SKU: {selectedVariant.sku}</p>
            )}
          </div>
        </div>

        {/* ── TABS: Description / Details / Reviews ────────────────────────── */}
        <div className="mt-16 border-t border-[#E4E0D8]">
          <div className="flex gap-8 mt-8 border-b border-[#E4E0D8]">
            {["description", "details", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm capitalize tracking-wider uppercase transition border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#5E6B58] text-[#5E6B58] font-semibold"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab} {tab === "reviews" && product.totalReviews > 0 && `(${product.totalReviews})`}
              </button>
            ))}
          </div>

          <div className="py-8 max-w-3xl">

            {/* Description */}
            {activeTab === "description" && (
              <div className="text-[#555] leading-relaxed space-y-4">
                <p>{product.description || product.shortDescription || "No description available."}</p>
                {product.styleNotes && (
                  <div className="bg-[#F0EDE6] border-l-4 border-[#5E6B58] px-5 py-4 italic text-sm text-[#5E6B58]">
                    💡 Style Tip: {product.styleNotes}
                  </div>
                )}
                {product.occasion?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-sm font-medium text-gray-700 mr-1">Occasions:</span>
                    {product.occasion.map((o) => (
                      <span key={o} className="text-xs bg-[#E8EBE7] text-[#5E6B58] px-3 py-1 rounded-full">{o}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Details */}
            {activeTab === "details" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Fabric",        value: product.fabric },
                  { label: "Handwork",      value: product.handwork },
                  { label: "Sleeve Type",   value: product.sleeveType },
                  { label: "Neckline",      value: product.neckline },
                  { label: "Fit",           value: product.fit },
                  { label: "Customizable",  value: product.customizable ? "Yes" : "No" },
                  { label: "Care",          value: product.careInstructions },
                  { label: "Brand",         value: product.brand },
                ].filter((row) => row.value).map(({ label, value }) => (
                  <div key={label} className="flex gap-3 py-3 border-b border-[#EEE]">
                    <span className="text-sm text-gray-400 w-32 shrink-0">{label}</span>
                    <span className="text-sm text-gray-700 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div>
                {product.reviews?.length > 0 ? (
                  <div className="space-y-6">
                    {/* Average */}
                    <div className="flex items-center gap-4 p-5 bg-white border border-[#E4E0D8]">
                      <span className="text-5xl font-bold text-[#5E6B58]">{product.averageRating?.toFixed(1)}</span>
                      <div>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} size={16} className={s <= Math.round(product.averageRating) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{product.totalReviews} reviews</p>
                      </div>
                    </div>

                    {/* Review list */}
                    {product.reviews.map((review, i) => (
                      <div key={i} className="border-b border-[#EEE] pb-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#5E6B58] text-white flex items-center justify-center text-sm font-medium">
                            {review.user?.name?.[0] || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{review.user?.name || "Customer"}</p>
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map((s) => (
                                <Star key={s} size={11} className={s <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                              ))}
                            </div>
                          </div>
                        </div>
                        {review.comment && <p className="text-sm text-gray-600 ml-11">{review.comment}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No reviews yet. Be the first to review this product.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-6 pb-16">
            <h2
              className="text-3xl text-center mb-10 text-[#2D2D2D]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              You May Also Like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p._id} href={`/products/${p.slug || p._id}`} className="group">
                  <div className="bg-white border border-[#E4E0D8] overflow-hidden hover:shadow-md transition">
                    <div className="overflow-hidden">
                      <img
                        src={coverImage(p)}
                        alt={p.title}
                        className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => { e.target.src = `https://picsum.photos/400/500?random=${p._id?.slice(-3)}`; }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#5E6B58] uppercase tracking-wide mb-1">{p.category?.name}</p>
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{p.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[#5E6B58] font-semibold">₹{p.discountedPrice || p.price}</span>
                        {p.discountedPrice && (
                          <span className="text-xs text-gray-400 line-through">₹{p.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}