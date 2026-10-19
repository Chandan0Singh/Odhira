"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Tags,
  Star,
  CheckCircle2,
  XCircle,
  X,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/categories`;

const EMPTY_FORM = {
  name: "",
  slug: "",
  image: "",
  description: "",
  sortOrder: 0,
  isFeatured: false,
  status: "Active",
};

function makeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [autoSlug, setAutoSlug] = useState(true);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (filter === "active") params.status = "Active";
      if (filter === "inactive") params.status = "Inactive";
      if (filter === "featured") params.isFeatured = true;

      const { data } = await axios.get(API, { params });

      const list = Array.isArray(data)
        ? data
        : data.categories || [];

      setCategories(list);
    } catch (err) {
      console.error("Fetch Categories Error:", err);

      setError(
        err.response?.data?.message ||
          "Categories could not be loaded. Check the API URL and backend."
      );
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Open create form
  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setAutoSlug(true);
    setError("");
    setNotice("");
    setModalOpen(true);
  };

  // Open edit form
  const openEdit = (category) => {
    setEditingId(category._id);

    setForm({
      name: category.name || "",
      slug: category.slug || "",
      image: category.image || "",
      description: category.description || "",
      sortOrder: category.sortOrder ?? 0,
      isFeatured: Boolean(category.isFeatured),
      status: category.status || "Active",
    });

    setAutoSlug(false);
    setError("");
    setNotice("");
    setModalOpen(true);
  };

  // Update form fields
  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value };

      if (field === "name" && autoSlug) {
        next.slug = makeSlug(value);
      }

      return next;
    });
  };

  // Create or update category
  const handleSave = async (event) => {
    event.preventDefault();

    setError("");
    setNotice("");

    if (!form.name.trim()) {
      setError("Please enter a category name.");
      return;
    }

    const token = getToken();

    if (!token) {
      setError("Admin token not found. Please log in again.");
      return;
    }

    const payload = {
      ...form,
      name: form.name.trim(),
      slug: form.slug.trim() || makeSlug(form.name),
      sortOrder: Number(form.sortOrder) || 0,
    };

    try {
      setSaving(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingId) {
        await axios.put(
          `${API}/${editingId}`,
          payload,
          config
        );

        setNotice("Category updated successfully.");
      } else {
        await axios.post(API, payload, config);

        setNotice("Category created successfully.");
      }

      setModalOpen(false);
      await fetchCategories();
    } catch (err) {
      console.error("Save Category Error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Could not save category. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete category
  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Delete "${category.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      setError("Admin token not found. Please log in again.");
      return;
    }

    try {
      setError("");
      setNotice("");

      await axios.delete(`${API}/${category._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories((current) =>
        current.filter((item) => item._id !== category._id)
      );

      setNotice(`"${category.name}" deleted successfully.`);
    } catch (err) {
      console.error("Delete Category Error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Could not delete category. Check whether products use this category."
      );
    }
  };

  // Search
  const visibleCategories = categories.filter((category) => {
    const term = search.toLowerCase();

    return (
      (category.name || "").toLowerCase().includes(term) ||
      (category.slug || "").toLowerCase().includes(term) ||
      (category.description || "").toLowerCase().includes(term)
    );
  });

  const activeCount = categories.filter(
    (c) => c.status === "Active"
  ).length;

  const inactiveCount = categories.filter(
    (c) => c.status === "Inactive"
  ).length;

  const featuredCount = categories.filter(
    (c) => c.isFeatured
  ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">
              ADMIN / CATALOG
            </p>

            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Categories
            </h1>

            <p className="mt-1 text-gray-500">
              Create, edit and organize your store categories.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* Error message */}
        {error && !modalOpen && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <XCircle size={18} className="mt-0.5 shrink-0" />

            <span>{error}</span>

            <button
              className="ml-auto"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Success message */}
        {notice && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <CheckCircle2 size={18} />

            {notice}

            <button
              className="ml-auto"
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Stats cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Categories",
              value: categories.length,
              icon: <Tags size={22} />,
              tone: "bg-blue-50 text-blue-700",
            },
            {
              label: "Active",
              value: activeCount,
              icon: <CheckCircle2 size={22} />,
              tone: "bg-green-50 text-green-700",
            },
            {
              label: "Inactive",
              value: inactiveCount,
              icon: <XCircle size={22} />,
              tone: "bg-gray-100 text-gray-600",
            },
            {
              label: "Featured",
              value: featuredCount,
              icon: <Star size={22} />,
              tone: "bg-purple-50 text-purple-700",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-3xl border bg-white p-5 shadow-sm"
            >
              <div>
                <p className="text-sm text-gray-500">
                  {stat.label}
                </p>

                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>

              <div className={`rounded-2xl p-3 ${stat.tone}`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Search and filters */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm">
            <Search size={18} className="text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by category name, slug or description..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All"],
              ["active", "Active"],
              ["inactive", "Inactive"],
              ["featured", "Featured"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                  filter === value
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                {label}
              </button>
            ))}

            <button
              onClick={fetchCategories}
              title="Refresh categories"
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-gray-600 hover:border-gray-400"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {/* Categories table */}
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="border-b bg-gray-50">
                <tr>
                  {[
                    "Category",
                    "Slug",
                    "Sort Order",
                    "Featured",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="p-4 text-left text-sm font-semibold text-gray-600"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-16 text-center text-gray-500"
                    >
                      <RefreshCw
                        size={24}
                        className="mx-auto mb-2 animate-spin"
                      />

                      Loading categories...
                    </td>
                  </tr>
                ) : visibleCategories.length ? (
                  visibleCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      {/* Category details */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-14 w-14 rounded-xl border object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                              <ImageIcon size={21} />
                            </div>
                          )}

                          <div className="max-w-xs">
                            <p className="font-semibold text-gray-900">
                              {category.name}
                            </p>

                            <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                              {category.description || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="p-4 text-sm text-gray-600">
                        {category.slug || "—"}
                      </td>

                      {/* Sort order */}
                      <td className="p-4 text-sm text-gray-700">
                        {category.sortOrder ?? 0}
                      </td>

                      {/* Featured */}
                      <td className="p-4">
                        {category.isFeatured ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
                            <Star size={12} />
                            Featured
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">
                            —
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            category.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {category.status || "Active"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(category)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(category)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-16 text-center text-gray-500"
                    >
                      <Tags
                        size={30}
                        className="mx-auto mb-2 text-gray-300"
                      />

                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t bg-gray-50 px-5 py-3 text-sm text-gray-500">
            Showing {visibleCategories.length} of {categories.length} categories
          </div>
        </div>
      </div>

      {/* Add/Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? "Edit Category" : "Add Category"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add category details for your storefront.
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSave}
              className="space-y-5 p-5 sm:p-6"
            >
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <label className="block text-sm font-medium text-gray-700">
                  Category Name *

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-gray-500"
                    placeholder="e.g. Sarees"
                  />
                </label>

                {/* Slug */}
                <label className="block text-sm font-medium text-gray-700">
                  Slug *

                  <input
                    required
                    value={form.slug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      updateField("slug", makeSlug(e.target.value));
                    }}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-gray-500"
                    placeholder="e.g. sarees"
                  />

                  <span className="mt-1 block text-xs font-normal text-gray-400">
                    Generated from the name; you can edit it.
                  </span>
                </label>
              </div>

              {/* Image URL */}
              <label className="block text-sm font-medium text-gray-700">
                Image URL

                <input
                  type="url"
                  value={form.image}
                  onChange={(e) =>
                    updateField("image", e.target.value)
                  }
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-gray-500"
                  placeholder="https://..."
                />
              </label>

              {/* Image preview */}
              {form.image && (
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <img
                    src={form.image}
                    alt="Category preview"
                    className="h-16 w-16 rounded-lg border object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <span className="text-sm text-gray-500">
                    Image preview
                  </span>
                </div>
              )}

              {/* Description */}
              <label className="block text-sm font-medium text-gray-700">
                Description

                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  className="mt-1.5 w-full resize-y rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-gray-500"
                  placeholder="Short category description..."
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Sort order */}
                <label className="block text-sm font-medium text-gray-700">
                  Sort Order

                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) =>
                      updateField("sortOrder", e.target.value)
                    }
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-gray-500"
                  />
                </label>

                {/* Status */}
                <label className="block text-sm font-medium text-gray-700">
                  Status

                  <select
                    value={form.status}
                    onChange={(e) =>
                      updateField("status", e.target.value)
                    }
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-gray-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
              </div>

              {/* Featured toggle */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    updateField("isFeatured", e.target.checked)
                  }
                  className="h-4 w-4 accent-black"
                />

                <span>
                  <span className="block text-sm font-semibold text-gray-800">
                    Featured category
                  </span>

                  <span className="block text-xs text-gray-500">
                    Mark this category as featured on the storefront where supported.
                  </span>
                </span>
              </label>

              {/* Form actions */}
              <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Save Changes"
                    : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}