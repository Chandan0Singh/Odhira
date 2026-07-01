// app/admin/edit-product/[id]/page.js

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const API = "http://localhost:5000/api";

const emptyVariant = { sku: "", size: "", color: "", colorHex: "", image: "", price: "", discountedPrice: "", stock: 0 };
const emptyImage = { url: "", alt: "", isPrimary: false };

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "Custom"];
const STATUSES = ["Draft", "Active", "Inactive", "Archived"];

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    collection: "",
    brand: "Odhira",
    tags: "",
    price: "",
    discountedPrice: "",
    gst: "",
    fabric: "",
    handwork: "",
    sleeveType: "",
    neckline: "",
    fit: "",
    careInstructions: "",
    customizable: false,
    occasion: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isSale: false,
    status: "Draft",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    styleNotes: "",
    lookbookImages: "",
  });

  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);

  // ─── Fetch product + supporting data ─────────────────────────────
  useEffect(() => {
    if (!id) return;

    const fetchAll = async () => {
      try {
        const [productRes, catRes, colRes] = await Promise.all([
          axios.get(`${API}/products/${id}`),
          axios.get(`${API}/categories`).catch(() => ({ data: [] })),
          axios.get(`${API}/collections`).catch(() => ({ data: [] })),
        ]);

        const p = productRes.data;

        setForm({
          title: p.title || "",
          shortDescription: p.shortDescription || "",
          description: p.description || "",
          category: p.category?._id || p.category || "",
          collection: p.collection?._id || p.collection || "",
          brand: p.brand || "Odhira",
          tags: (p.tags || []).join(", "),
          price: p.price ?? "",
          discountedPrice: p.discountedPrice ?? "",
          gst: p.gst ?? "",
          fabric: p.fabric || "",
          handwork: p.handwork || "",
          sleeveType: p.sleeveType || "",
          neckline: p.neckline || "",
          fit: p.fit || "",
          careInstructions: p.careInstructions || "",
          customizable: !!p.customizable,
          occasion: (p.occasion || []).join(", "),
          weight: p.weight ?? "",
          length: p.length ?? "",
          width: p.width ?? "",
          height: p.height ?? "",
          isFeatured: !!p.isFeatured,
          isBestSeller: !!p.isBestSeller,
          isNewArrival: !!p.isNewArrival,
          isSale: !!p.isSale,
          status: p.status || "Draft",
          metaTitle: p.metaTitle || "",
          metaDescription: p.metaDescription || "",
          metaKeywords: (p.metaKeywords || []).join(", "),
          styleNotes: p.styleNotes || "",
          lookbookImages: (p.lookbookImages || []).join(", "),
        });

        setImages(p.images?.length ? p.images : []);
        setVariants(p.variants?.length ? p.variants : []);

        setCategories(Array.isArray(catRes.data) ? catRes.data : catRes.data?.categories || []);
        setCollections(Array.isArray(colRes.data) ? colRes.data : colRes.data?.collections || []);
      } catch (err) {
        console.error("Failed to load product:", err);
        alert("❌ Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  // ─── Generic field handler ────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ─── Images array handlers ────────────────────────────────────────
  const updateImage = (index, field, value) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [field]: value } : img))
    );
  };
  const addImage = () => setImages((prev) => [...prev, { ...emptyImage }]);
  const removeImage = (index) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  // ─── Variants array handlers ──────────────────────────────────────
  const updateVariant = (index, field, value) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };
  const addVariant = () => setVariants((prev) => [...prev, { ...emptyVariant }]);
  const removeVariant = (index) =>
    setVariants((prev) => prev.filter((_, i) => i !== index));

  // ─── Submit ────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...form,
        price: form.price === "" ? undefined : Number(form.price),
        discountedPrice: form.discountedPrice === "" ? undefined : Number(form.discountedPrice),
        gst: form.gst === "" ? 0 : Number(form.gst),
        weight: form.weight === "" ? undefined : Number(form.weight),
        length: form.length === "" ? undefined : Number(form.length),
        width: form.width === "" ? undefined : Number(form.width),
        height: form.height === "" ? undefined : Number(form.height),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        occasion: form.occasion.split(",").map((t) => t.trim()).filter(Boolean),
        metaKeywords: form.metaKeywords.split(",").map((t) => t.trim()).filter(Boolean),
        lookbookImages: form.lookbookImages.split(",").map((t) => t.trim()).filter(Boolean),
        collection: form.collection || undefined,
        images,
        variants: variants.map((v) => ({
          ...v,
          price: v.price === "" ? undefined : Number(v.price),
          discountedPrice: v.discountedPrice === "" ? undefined : Number(v.discountedPrice),
          stock: v.stock === "" ? 0 : Number(v.stock),
        })),
      };

      await axios.put(`${API}/products/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Product updated!");
      router.push("/admin/all-products");
    } catch (err) {
      console.error(err);
      alert(`❌ Update failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 max-w-3xl mx-auto">Loading product…</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ─── Basic ─── */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium border-b pb-1">Basic Info</h2>

          <input
            className="w-full border p-2"
            name="title"
            value={form.title}
            placeholder="Title"
            onChange={handleChange}
            required
          />

          <input
            className="w-full border p-2"
            name="shortDescription"
            value={form.shortDescription}
            placeholder="Short Description"
            onChange={handleChange}
          />

          <textarea
            className="w-full border p-2"
            name="description"
            value={form.description}
            placeholder="Description"
            onChange={handleChange}
            rows={4}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              className="w-full border p-2"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <select
              className="w-full border p-2"
              name="collection"
              value={form.collection}
              onChange={handleChange}
            >
              <option value="">No Collection</option>
              {collections.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full border p-2"
              name="brand"
              value={form.brand}
              placeholder="Brand"
              onChange={handleChange}
            />
            <input
              className="w-full border p-2"
              name="tags"
              value={form.tags}
              placeholder="Tags (comma separated: classic, premium, trending)"
              onChange={handleChange}
            />
          </div>

          <select
            className="w-full border p-2"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </section>

        {/* ─── Pricing ─── */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium border-b pb-1">Pricing</h2>
          <div className="grid grid-cols-3 gap-4">
            <input
              className="border p-2"
              name="price"
              type="number"
              value={form.price}
              placeholder="Price"
              onChange={handleChange}
              required
            />
            <input
              className="border p-2"
              name="discountedPrice"
              type="number"
              value={form.discountedPrice}
              placeholder="Discounted Price"
              onChange={handleChange}
            />
            <input
              className="border p-2"
              name="gst"
              type="number"
              value={form.gst}
              placeholder="GST %"
              onChange={handleChange}
            />
          </div>
        </section>

        {/* ─── Product Details ─── */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium border-b pb-1">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <input className="border p-2" name="fabric" value={form.fabric} placeholder="Fabric" onChange={handleChange} />
            <input className="border p-2" name="handwork" value={form.handwork} placeholder="Handwork" onChange={handleChange} />
            <input className="border p-2" name="sleeveType" value={form.sleeveType} placeholder="Sleeve Type" onChange={handleChange} />
            <input className="border p-2" name="neckline" value={form.neckline} placeholder="Neckline" onChange={handleChange} />
            <input className="border p-2" name="fit" value={form.fit} placeholder="Fit" onChange={handleChange} />
            <input className="border p-2" name="occasion" value={form.occasion} placeholder="Occasion (comma separated)" onChange={handleChange} />
          </div>
          <textarea
            className="w-full border p-2"
            name="careInstructions"
            value={form.careInstructions}
            placeholder="Care Instructions"
            onChange={handleChange}
            rows={2}
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="customizable" checked={form.customizable} onChange={handleChange} />
            Customizable
          </label>
        </section>

        {/* ─── Shipping ─── */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium border-b pb-1">Shipping</h2>
          <div className="grid grid-cols-4 gap-4">
            <input className="border p-2" name="weight" type="number" value={form.weight} placeholder="Weight" onChange={handleChange} />
            <input className="border p-2" name="length" type="number" value={form.length} placeholder="Length" onChange={handleChange} />
            <input className="border p-2" name="width" type="number" value={form.width} placeholder="Width" onChange={handleChange} />
            <input className="border p-2" name="height" type="number" value={form.height} placeholder="Height" onChange={handleChange} />
          </div>
        </section>

        {/* ─── Flags ─── */}
        <section className="space-y-2">
          <h2 className="text-lg font-medium border-b pb-1">Flags</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} /> Featured
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isBestSeller" checked={form.isBestSeller} onChange={handleChange} /> Best Seller
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isNewArrival" checked={form.isNewArrival} onChange={handleChange} /> New Arrival
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isSale" checked={form.isSale} onChange={handleChange} /> On Sale
            </label>
          </div>
        </section>

        {/* ─── Images ─── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-1">
            <h2 className="text-lg font-medium">Images</h2>
            <button type="button" onClick={addImage} className="text-sm text-blue-600 hover:underline">
              + Add Image
            </button>
          </div>

          {images.map((img, i) => (
            <div key={i} className="border p-3 space-y-2 relative">
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 text-red-600 text-sm"
              >
                Remove
              </button>
              <input
                className="w-full border p-2"
                value={img.url}
                placeholder="Image URL"
                onChange={(e) => updateImage(i, "url", e.target.value)}
              />
              <input
                className="w-full border p-2"
                value={img.alt}
                placeholder="Alt text"
                onChange={(e) => updateImage(i, "alt", e.target.value)}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={img.isPrimary}
                  onChange={(e) => updateImage(i, "isPrimary", e.target.checked)}
                />
                Primary Image
              </label>
              {img.url && (
                <img src={img.url} alt={img.alt || "preview"} className="h-24 object-cover border" />
              )}
            </div>
          ))}
        </section>

        {/* ─── Variants ─── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-1">
            <h2 className="text-lg font-medium">Variants</h2>
            <button type="button" onClick={addVariant} className="text-sm text-blue-600 hover:underline">
              + Add Variant
            </button>
          </div>

          {variants.map((v, i) => (
            <div key={i} className="border p-3 grid grid-cols-2 gap-2 relative">
              <button
                type="button"
                onClick={() => removeVariant(i)}
                className="absolute top-2 right-2 text-red-600 text-sm"
              >
                Remove
              </button>
              <input
                className="border p-2"
                value={v.sku}
                placeholder="SKU"
                onChange={(e) => updateVariant(i, "sku", e.target.value)}
              />
              <select
                className="border p-2"
                value={v.size}
                onChange={(e) => updateVariant(i, "size", e.target.value)}
              >
                <option value="">Size</option>
                {SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                className="border p-2"
                value={v.color}
                placeholder="Color"
                onChange={(e) => updateVariant(i, "color", e.target.value)}
              />
              <input
                className="border p-2"
                value={v.colorHex}
                placeholder="Color Hex (#000000)"
                onChange={(e) => updateVariant(i, "colorHex", e.target.value)}
              />
              <input
                className="border p-2"
                value={v.image}
                placeholder="Variant Image URL"
                onChange={(e) => updateVariant(i, "image", e.target.value)}
              />
              <input
                className="border p-2"
                type="number"
                value={v.price}
                placeholder="Price"
                onChange={(e) => updateVariant(i, "price", e.target.value)}
              />
              <input
                className="border p-2"
                type="number"
                value={v.discountedPrice}
                placeholder="Discounted Price"
                onChange={(e) => updateVariant(i, "discountedPrice", e.target.value)}
              />
              <input
                className="border p-2"
                type="number"
                value={v.stock}
                placeholder="Stock"
                onChange={(e) => updateVariant(i, "stock", e.target.value)}
              />
            </div>
          ))}
        </section>

        {/* ─── SEO ─── */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium border-b pb-1">SEO & Lookbook</h2>
          <input className="w-full border p-2" name="metaTitle" value={form.metaTitle} placeholder="Meta Title" onChange={handleChange} />
          <textarea className="w-full border p-2" name="metaDescription" value={form.metaDescription} placeholder="Meta Description" onChange={handleChange} rows={2} />
          <input className="w-full border p-2" name="metaKeywords" value={form.metaKeywords} placeholder="Meta Keywords (comma separated)" onChange={handleChange} />
          <input className="w-full border p-2" name="lookbookImages" value={form.lookbookImages} placeholder="Lookbook Image URLs (comma separated)" onChange={handleChange} />
          <textarea className="w-full border p-2" name="styleNotes" value={form.styleNotes} placeholder="Style Notes" onChange={handleChange} rows={2} />
        </section>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Update Product"}
        </button>
      </form>
    </div>
  );
}