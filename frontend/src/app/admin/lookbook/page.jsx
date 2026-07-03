"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Star,
  Loader2,
  ImageOff,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const IMG_BASE = API_BASE; // images are served as relative paths like /uploads/xyz.jpg

const emptyForm = {
  title: "",
  description: "",
  status: "Active",
  featured: false,
};

export default function LookbookAdminPage() {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const fetchLooks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/api/lookbook/admin/all`);
      setLooks(res.data?.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to load lookbook entries."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLooks();
  }, [fetchLooks]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (look) => {
    setEditingId(look._id);
    setForm({
      title: look.title || "",
      description: look.description || "",
      status: look.status || "Active",
      featured: !!look.featured,
    });
    setImageFile(null);
    setImagePreview(look.image ? `${IMG_BASE}${look.image}` : null);
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.title.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (!editingId && !imageFile) {
      setFormError("Image is required.");
      return;
    }

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append("status", form.status);
    payload.append("featured", form.featured);
    if (imageFile) payload.append("image", imageFile);

    setSaving(true);
    try {
      if (editingId) {
        await axios.put(
          `${API_BASE}/api/lookbook/admin/${editingId}`,
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(`${API_BASE}/api/lookbook/admin`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setModalOpen(false);
      await fetchLooks();
    } catch (err) {
      setFormError(
        err?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this look? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE}/api/lookbook/admin/${id}`);
      setLooks((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Lookbook
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Manage the looks shown on your storefront.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <Plus size={16} />
            Add New Look
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Content */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-neutral-400">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Loading looks...</span>
            </div>
          ) : looks.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-neutral-400">
              <ImageOff size={28} />
              <p className="text-sm">No looks yet. Add your first one.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Image</th>
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Slug</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Featured</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {looks.map((look) => (
                  <tr key={look._id} className="hover:bg-neutral-50">
                    <td className="px-5 py-3">
                      {look.image ? (
                        <img
                          src={`${IMG_BASE}${look.image}`}
                          alt={look.title}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-neutral-100 text-neutral-300">
                          <ImageOff size={16} />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-neutral-800">
                      {look.title}
                    </td>
                    <td className="px-5 py-3 text-neutral-500">
                      {look.slug}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          look.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {look.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {look.featured ? (
                        <Star
                          size={16}
                          className="fill-amber-400 text-amber-400"
                        />
                      ) : (
                        <span className="text-neutral-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(look)}
                          className="rounded-md p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(look._id)}
                          disabled={deletingId === look._id}
                          className="rounded-md p-2 text-neutral-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === look._id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <h2 className="text-lg font-semibold text-neutral-900">
                {editingId ? "Edit Look" : "Add New Look"}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              {formError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {formError}
                </div>
              )}

              {/* Image upload */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Image
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 px-4 py-6 text-center transition hover:border-neutral-400">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-28 w-28 rounded-md object-cover"
                    />
                  ) : (
                    <>
                      <Upload size={20} className="text-neutral-400" />
                      <span className="text-sm text-neutral-500">
                        Click to upload an image
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Title */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
                  placeholder="e.g. Summer Breeze Collection"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full resize-none rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
                  placeholder="Short description shown with this look"
                />
              </div>

              <div className="flex items-center gap-6">
                {/* Status */}
                <div className="flex-1">
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, status: e.target.value }))
                    }
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex-1">
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Featured
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          featured: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-neutral-300"
                    />
                    Show as featured
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {editingId ? "Save Changes" : "Create Look"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}