"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  Tag,
  Star,
  TrendingUp,
} from "lucide-react";

const API = "http://localhost:5000/api/products";

export default function AdminProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | active | draft | sale | featured

  // ─── FETCH ──────────────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter === "active") params.status = "Active";
      if (filter === "draft") params.status = "Draft";
      if (filter === "sale") params.isSale = true;
      if (filter === "featured") params.isFeatured = true;

      const { data } = await axios.get(API, { params });
      setProducts(data.products || data || []);
      console.log("Fetched Products:", data);
    } catch (err) {
      console.error("Fetch Products Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  // ─── DELETE ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await axios.delete(`${API}/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // ─── DERIVED ────────────────────────────────────────────────────────────────
  const activeCount = products.filter((p) => p.status === "Active").length;
  const saleCount = products.filter((p) => p.isSale).length;
  const featuredCount = products.filter((p) => p.isFeatured).length;

  const filtered = products.filter(
    (p) =>
      p?.title?.toLowerCase().includes(search.toLowerCase()) ||
      p?.category?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p?.fabric?.toLowerCase().includes(search.toLowerCase()),
  );

  // ─── HELPERS ────────────────────────────────────────────────────────────────
  const statusBadge = (status) => {
    const map = {
      Active: "bg-green-100 text-green-700",
      Draft: "bg-yellow-100 text-yellow-700",
      Inactive: "bg-gray-100 text-gray-600",
      Archived: "bg-red-100 text-red-600",
    };
    return (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${map[status] || "bg-gray-100"}`}
      >
        {status}
      </span>
    );
  };

  const coverImage = (p) => {
    if (p.images?.length) {
      const primary = p.images.find((img) => img.isPrimary);
      return primary?.url || p.images[0]?.url;
    }
    return null;
  };

  const displayPrice = (p) =>
    p.discountedPrice ? (
      <div>
        <span className="font-semibold text-gray-800">
          ₹{p.discountedPrice}
        </span>
        <span className="text-xs text-gray-400 line-through ml-1">
          ₹{p.price}
        </span>
        <span className="text-xs text-green-600 ml-1">
          ({Math.round(((p.price - p.discountedPrice) / p.price) * 100)}% off)
        </span>
      </div>
    ) : (
      <span className="font-semibold text-gray-800">₹{p.price}</span>
    );

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 mt-1">
            Manage all your products from one place.
          </p>
        </div>
        <Link href="/admin/add-product">
          <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl hover:scale-105 transition shadow-md">
            <Plus size={18} /> Add Product
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Products",
            value: products.length,
            icon: <Package size={24} />,
            color: "bg-blue-50",
          },
          {
            label: "Active",
            value: activeCount,
            icon: <Tag size={24} />,
            color: "bg-green-50",
          },
          {
            label: "On Sale",
            value: saleCount,
            icon: <TrendingUp size={24} />,
            color: "bg-orange-50",
          },
          {
            label: "Featured",
            value: featuredCount,
            icon: <Star size={24} />,
            color: "bg-purple-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-3xl p-5 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <h2 className="text-3xl font-bold mt-1 text-gray-800">
                  {stat.value}
                </h2>
              </div>
              <div className={`${stat.color} p-3 rounded-2xl`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 bg-white rounded-2xl px-4 py-3 shadow-sm border flex items-center gap-3">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by title, category, fabric..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700 text-sm"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "active", "draft", "sale", "featured"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-2xl text-sm font-medium capitalize transition border ${
                filter === f
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                {[
                  "Product",
                  "Category",
                  "Price",
                  "Stock",
                  "Rating",
                  "Flags",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left p-4 text-sm font-semibold text-gray-600"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-16 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Package size={32} className="animate-pulse" />
                      <span>Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Product */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {coverImage(p) ? (
                          <img
                            src={coverImage(p)}
                            alt={p.title}
                            className="w-14 h-14 rounded-xl object-cover border"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                            <Package size={20} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-800 text-sm leading-tight">
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            ID: {p._id?.slice(0, 8)}
                          </p>
                          {p.fabric && (
                            <p className="text-xs text-gray-500">{p.fabric}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <p className="text-sm text-gray-700">
                        {p.category?.name || "—"}
                      </p>
                      {p.collection?.name && (
                        <p className="text-xs text-gray-400">
                          {p.collection.name}
                        </p>
                      )}
                    </td>

                    {/* Price */}
                    <td className="p-4 text-sm">{displayPrice(p)}</td>

                    {/* Stock */}
                    <td className="p-4">
                      <span
                        className={`text-sm font-medium ${p.totalStock === 0 ? "text-red-500" : "text-gray-700"}`}
                      >
                        {p.totalStock ?? 0}
                      </span>
                      {p.totalStock === 0 && (
                        <p className="text-xs text-red-400">Out of stock</p>
                      )}
                    </td>

                    {/* Rating */}
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="text-yellow-400 fill-yellow-400"
                        />
                        <span className="text-sm text-gray-700">
                          {p.averageRating?.toFixed(1) || "—"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {p.totalReviews || 0} reviews
                      </p>
                    </td>

                    {/* Flags */}
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {p.isFeatured && (
                          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full w-fit">
                            Featured
                          </span>
                        )}
                        {p.isBestSeller && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full w-fit">
                            Best Seller
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full w-fit">
                            New
                          </span>
                        )}
                        {p.isSale && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full w-fit">
                            Sale
                          </span>
                        )}
                        {!p.isFeatured &&
                          !p.isBestSeller &&
                          !p.isNewArrival &&
                          !p.isSale && (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">{statusBadge(p.status)}</td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/edit-product/${p._id}`}>
                          <button className="flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-xl text-sm transition">
                            <Pencil size={14} /> Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl text-sm transition"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-16 text-gray-400">
                    <Package size={32} className="mx-auto mb-2" />
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t bg-gray-50 text-sm text-gray-500">
            Showing {filtered.length} of {products.length} products
          </div>
        )}
      </div>
    </div>
  );
}
