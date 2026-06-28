"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, PackagePlus, ChevronDown } from "lucide-react";

const API = "http://localhost:5000/api";

const SIZES     = ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "Custom"];
const OCCASIONS = ["Bridal", "Festive", "Casual", "Party", "Wedding Guest", "Daily Wear"];
const STATUSES  = ["Draft", "Active", "Inactive", "Archived"];

const emptyVariant = { sku: "", size: "", color: "", colorHex: "", stock: 0, price: "", discountedPrice: "" };
const emptyImage   = { url: "", alt: "", isPrimary: false };

export default function AddProduct() {
  // ─── REMOTE DATA ────────────────────────────────────────────────────────────
  const [categories,  setCategories]  = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get(`${API}/categories`).then(({ data }) => setCategories(data)).catch(console.error);
    axios.get(`${API}/collections`).then(({ data }) => setCollections(data)).catch(console.error);
  }, []);

  // ─── FORM STATE ─────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    // Basic
    title:            "",
    shortDescription: "",
    description:      "",
    brand:            "Odhira",
    status:           "Draft",
    // Refs
    category:         "",
    collection:       "",
    // Pricing
    price:            "",
    discountedPrice:  "",
    gst:              0,
    // Details
    fabric:           "",
    handwork:         "",
    sleeveType:       "",
    neckline:         "",
    fit:              "",
    careInstructions: "",
    customizable:     false,
    occasion:         [],
    // Shipping
    weight: "", length: "", width: "", height: "",
    // Flags
    isFeatured:   false,
    isBestSeller: false,
    isNewArrival: false,
    isSale:       false,
    // SEO
    metaTitle:       "",
    metaDescription: "",
    metaKeywords:    "",
    // Lookbook
    lookbookImages: "",
    styleNotes:     "",
    // Tags
    tags: "",
  });

  const [variants, setVariants] = useState([{ ...emptyVariant }]);
  const [images,   setImages]   = useState([{ ...emptyImage }]);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab,  setActiveTab]  = useState("basic"); // basic | details | variants | images | seo

  // ─── HANDLERS ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleOccasion = (occ) => {
    setForm((prev) => ({
      ...prev,
      occasion: prev.occasion.includes(occ)
        ? prev.occasion.filter((o) => o !== occ)
        : [...prev.occasion, occ],
    }));
  };

  // Variants
  const addVariant    = () => setVariants((v) => [...v, { ...emptyVariant }]);
  const removeVariant = (i) => setVariants((v) => v.filter((_, idx) => idx !== i));
  const updateVariant = (i, field, value) =>
    setVariants((v) => v.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  // Images
  const addImage    = () => setImages((v) => [...v, { ...emptyImage }]);
  const removeImage = (i) => setImages((v) => v.filter((_, idx) => idx !== i));
  const updateImage = (i, field, value) =>
    setImages((v) => v.map((item, idx) => {
      if (idx !== i) return field === "isPrimary" ? { ...item, isPrimary: false } : item;
      return { ...item, [field]: value };
    }));
  const setPrimary = (i) =>
    setImages((v) => v.map((img, idx) => ({ ...img, isPrimary: idx === i })));

  // ─── SUBMIT ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) return alert("Please select a category.");
    if (!images.some((img) => img.url)) return alert("Add at least one image URL.");

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        tags:          form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        metaKeywords:  form.metaKeywords.split(",").map((t) => t.trim()).filter(Boolean),
        lookbookImages: form.lookbookImages.split(",").map((t) => t.trim()).filter(Boolean),
        price:         Number(form.price),
        discountedPrice: form.discountedPrice ? Number(form.discountedPrice) : undefined,
        gst:           Number(form.gst),
        weight:        form.weight ? Number(form.weight) : undefined,
        length:        form.length ? Number(form.length) : undefined,
        width:         form.width  ? Number(form.width)  : undefined,
        height:        form.height ? Number(form.height) : undefined,
        variants: variants
          .filter((v) => v.size || v.color)
          .map((v) => ({ ...v, stock: Number(v.stock), price: v.price ? Number(v.price) : undefined, discountedPrice: v.discountedPrice ? Number(v.discountedPrice) : undefined })),
        images: images.filter((img) => img.url),
      };

      await axios.post(`${API}/products/add`, payload);
      alert("✅ Product added successfully!");

      // reset
      setForm({ title: "", shortDescription: "", description: "", brand: "Odhira", status: "Draft", category: "", collection: "", price: "", discountedPrice: "", gst: 0, fabric: "", handwork: "", sleeveType: "", neckline: "", fit: "", careInstructions: "", customizable: false, occasion: [], weight: "", length: "", width: "", height: "", isFeatured: false, isBestSeller: false, isNewArrival: false, isSale: false, metaTitle: "", metaDescription: "", metaKeywords: "", lookbookImages: "", styleNotes: "", tags: "" });
      setVariants([{ ...emptyVariant }]);
      setImages([{ ...emptyImage }]);
      setActiveTab("basic");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── UI HELPERS ─────────────────────────────────────────────────────────────
  const inputCls = "w-full border border-gray-200 bg-gray-50 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1";
  const tabs     = ["basic", "details", "variants", "images", "seo"];

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-black text-white p-3 rounded-2xl">
            <PackagePlus size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
            <p className="text-gray-500 text-sm">Fill in the details below to list a new product.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Tab Nav */}
          <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-fit px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${
                  activeTab === tab ? "bg-black text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-sm border p-6 space-y-5">

            {/* ── TAB: BASIC ───────────────────────────────────────────────── */}
            {activeTab === "basic" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className={labelCls}>Title *</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Sage Bloom Anarkali" className={inputCls} required />
                  </div>

                  <div>
                    <label className={labelCls}>Category *</label>
                    <div className="relative">
                      <select name="category" value={form.category} onChange={handleChange} className={inputCls + " appearance-none pr-10"} required>
                        <option value="">Select category</option>
                        {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Collection</label>
                    <div className="relative">
                      <select name="collection" value={form.collection} onChange={handleChange} className={inputCls + " appearance-none pr-10"}>
                        <option value="">Select collection</option>
                        {collections.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Price (₹) *</label>
                    <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 4500" className={inputCls} required />
                  </div>

                  <div>
                    <label className={labelCls}>Discounted Price (₹)</label>
                    <input name="discountedPrice" type="number" value={form.discountedPrice} onChange={handleChange} placeholder="Leave empty if no discount" className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>GST (%)</label>
                    <input name="gst" type="number" value={form.gst} onChange={handleChange} placeholder="e.g. 5" className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>Brand</label>
                    <input name="brand" value={form.brand} onChange={handleChange} className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>Status</label>
                    <div className="relative">
                      <select name="status" value={form.status} onChange={handleChange} className={inputCls + " appearance-none pr-10"}>
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Tags <span className="text-gray-400 font-normal">(comma separated)</span></label>
                    <input name="tags" value={form.tags} onChange={handleChange} placeholder="classic, premium, bridal" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Short Description</label>
                  <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="One-line summary for product cards" className={inputCls} />
                </div>

                <div>
                  <label className={labelCls}>Full Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Detailed product description..." className={inputCls} />
                </div>

                {/* Flags */}
                <div>
                  <label className={labelCls}>Product Flags</label>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {[
                      { name: "isFeatured",   label: "Featured" },
                      { name: "isBestSeller", label: "Best Seller" },
                      { name: "isNewArrival", label: "New Arrival" },
                      { name: "isSale",       label: "On Sale" },
                      { name: "customizable", label: "Customizable" },
                    ].map(({ name, label }) => (
                      <label key={name} className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl cursor-pointer hover:border-black transition text-sm">
                        <input type="checkbox" name={name} checked={!!form[name]} onChange={handleChange} className="accent-black" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── TAB: DETAILS ─────────────────────────────────────────────── */}
            {activeTab === "details" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { name: "fabric",     label: "Fabric",      placeholder: "e.g. Georgette, Silk" },
                    { name: "handwork",   label: "Handwork",    placeholder: "e.g. Zardozi, Mirror Work" },
                    { name: "sleeveType", label: "Sleeve Type", placeholder: "e.g. Full, Half, Sleeveless" },
                    { name: "neckline",   label: "Neckline",    placeholder: "e.g. Round, V-neck, Boat" },
                    { name: "fit",        label: "Fit",         placeholder: "e.g. Regular, Flared, Fitted" },
                    { name: "careInstructions", label: "Care Instructions", placeholder: "e.g. Dry clean only" },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label className={labelCls}>{label}</label>
                      <input name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className={inputCls} />
                    </div>
                  ))}
                </div>

                {/* Occasion */}
                <div>
                  <label className={labelCls}>Occasion</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {OCCASIONS.map((occ) => (
                      <button
                        key={occ} type="button"
                        onClick={() => toggleOccasion(occ)}
                        className={`px-4 py-1.5 rounded-full text-sm border transition ${
                          form.occasion.includes(occ)
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-600 border-gray-300 hover:border-black"
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shipping */}
                <div>
                  <label className={labelCls}>Shipping Dimensions</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-1">
                    {["weight", "length", "width", "height"].map((field) => (
                      <div key={field}>
                        <label className="text-xs text-gray-500 capitalize mb-1 block">{field} {field === "weight" ? "(g)" : "(cm)"}</label>
                        <input name={field} type="number" value={form[field]} onChange={handleChange} placeholder="0" className={inputCls} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style Notes */}
                <div>
                  <label className={labelCls}>Style Notes</label>
                  <textarea name="styleNotes" value={form.styleNotes} onChange={handleChange} rows={2} placeholder="e.g. Pair with ivory palazzo and gold jhumkas" className={inputCls} />
                </div>

                <div>
                  <label className={labelCls}>Lookbook Image URLs <span className="text-gray-400 font-normal">(comma separated)</span></label>
                  <input name="lookbookImages" value={form.lookbookImages} onChange={handleChange} placeholder="https://..., https://..." className={inputCls} />
                </div>
              </>
            )}

            {/* ── TAB: VARIANTS ────────────────────────────────────────────── */}
            {activeTab === "variants" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Add size/color combinations with individual stock counts.</p>

                {variants.map((v, i) => (
                  <div key={i} className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Variant {i + 1}</span>
                      {variants.length > 1 && (
                        <button type="button" onClick={() => removeVariant(i)} className="text-red-500 hover:text-red-700 transition">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <label className={labelCls}>Size</label>
                        <div className="relative">
                          <select value={v.size} onChange={(e) => updateVariant(i, "size", e.target.value)} className={inputCls + " appearance-none pr-8"}>
                            <option value="">Select</option>
                            {SIZES.map((s) => <option key={s}>{s}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Color</label>
                        <input value={v.color} onChange={(e) => updateVariant(i, "color", e.target.value)} placeholder="e.g. Sage Green" className={inputCls} />
                      </div>

                      <div>
                        <label className={labelCls}>Color Hex</label>
                        <div className="flex gap-2 items-center">
                          <input type="color" value={v.colorHex || "#ffffff"} onChange={(e) => updateVariant(i, "colorHex", e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                          <input value={v.colorHex} onChange={(e) => updateVariant(i, "colorHex", e.target.value)} placeholder="#A8B2A1" className={inputCls} />
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Stock</label>
                        <input type="number" value={v.stock} onChange={(e) => updateVariant(i, "stock", e.target.value)} placeholder="0" className={inputCls} />
                      </div>

                      <div>
                        <label className={labelCls}>Variant Price (₹)</label>
                        <input type="number" value={v.price} onChange={(e) => updateVariant(i, "price", e.target.value)} placeholder="Override base price" className={inputCls} />
                      </div>

                      <div>
                        <label className={labelCls}>SKU</label>
                        <input value={v.sku} onChange={(e) => updateVariant(i, "sku", e.target.value)} placeholder="e.g. OD-ANK-S-GRN" className={inputCls} />
                      </div>
                    </div>
                  </div>
                ))}

                <button type="button" onClick={addVariant} className="flex items-center gap-2 text-sm border border-dashed border-gray-300 px-4 py-2.5 rounded-2xl text-gray-600 hover:border-black hover:text-black transition w-full justify-center">
                  <Plus size={16} /> Add Variant
                </button>
              </div>
            )}

            {/* ── TAB: IMAGES ──────────────────────────────────────────────── */}
            {activeTab === "images" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Add image URLs. Mark one as primary — it shows on listing cards.</p>

                {images.map((img, i) => (
                  <div key={i} className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Image {i + 1}</span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                          <input type="radio" name="primaryImage" checked={img.isPrimary} onChange={() => setPrimary(i)} className="accent-black" />
                          Primary
                        </label>
                        {images.length > 1 && (
                          <button type="button" onClick={() => removeImage(i)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Image URL *</label>
                        <input value={img.url} onChange={(e) => updateImage(i, "url", e.target.value)} placeholder="https://example.com/image.jpg" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Alt Text</label>
                        <input value={img.alt} onChange={(e) => updateImage(i, "alt", e.target.value)} placeholder="e.g. Sage Bloom Anarkali front view" className={inputCls} />
                      </div>
                    </div>

                    {img.url && (
                      <img src={img.url} alt={img.alt || "preview"} className="w-32 h-32 object-cover rounded-xl border" onError={(e) => (e.target.style.display = "none")} />
                    )}
                  </div>
                ))}

                <button type="button" onClick={addImage} className="flex items-center gap-2 text-sm border border-dashed border-gray-300 px-4 py-2.5 rounded-2xl text-gray-600 hover:border-black hover:text-black transition w-full justify-center">
                  <Plus size={16} /> Add Image
                </button>
              </div>
            )}

            {/* ── TAB: SEO ─────────────────────────────────────────────────── */}
            {activeTab === "seo" && (
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Meta Title</label>
                  <input name="metaTitle" value={form.metaTitle} onChange={handleChange} placeholder="SEO page title" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Meta Description</label>
                  <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} rows={3} placeholder="Brief description for search engines (150-160 chars)" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Meta Keywords <span className="text-gray-400 font-normal">(comma separated)</span></label>
                  <input name="metaKeywords" value={form.metaKeywords} onChange={handleChange} placeholder="anarkali, ethnic wear, bridal" className={inputCls} />
                </div>

                {/* Preview */}
                {(form.metaTitle || form.metaDescription) && (
                  <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Google Preview</p>
                    <p className="text-blue-600 text-base font-medium">{form.metaTitle || form.title || "Page Title"}</p>
                    <p className="text-green-700 text-xs">odhira.com/products/{form.title?.toLowerCase().replace(/\s+/g, "-") || "product-slug"}</p>
                    <p className="text-gray-600 text-sm mt-1">{form.metaDescription || "Meta description will appear here..."}</p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Submit */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-400">* Required fields</p>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-black hover:bg-gray-900 disabled:opacity-50 text-white px-8 py-3 rounded-2xl shadow transition font-medium"
            >
              <Plus size={18} />
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}