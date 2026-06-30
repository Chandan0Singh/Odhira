"use client";

import { useState, useEffect } from "react";
import { MapPin, Plus, Pencil, Trash2, X, Loader2, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // adjust path if your context lives elsewhere

constAPI_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const EMPTY_FORM = {
  type: "Home",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

export default function AddressesPage() {
  const { user, token } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const userId = user?.id || user?._id;

  const authHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  useEffect(() => {
    if (!userId) return;

    const fetchAddresses = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/user/${userId}/addresses`, {
          headers: authHeaders,
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.message || "Could not load addresses");
        } else {
          setAddresses(data.addresses || []);
        }
      } catch (err) {
        setError("Something went wrong while loading addresses.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userId]);

  const openAddForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setFormOpen(true);
  };

  const openEditForm = (addr) => {
    setEditingId(addr._id);
    setForm({
      type: addr.type || "Home",
      fullName: addr.fullName || "",
      phone: addr.phone || "",
      address: addr.address || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      isDefault: addr.isDefault || false,
    });
    setFormError("");
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.fullName.trim()) return setFormError("Full name is required");
    if (!form.phone.trim()) return setFormError("Phone number is required");
    if (!form.address.trim()) return setFormError("Address is required");
    if (!form.city.trim()) return setFormError("City is required");
    if (!form.state.trim()) return setFormError("State is required");
    if (!form.pincode.trim()) return setFormError("Pincode is required");

    setSaving(true);

    try {
      const isEditing = !!editingId;
      const res = await fetch(
        `${API_BASE}/api/user/address`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: authHeaders,
          body: JSON.stringify({
            userId,
            ...(isEditing ? { addressId: editingId } : {}),
            ...form,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.message || "Could not save address");
        setSaving(false);
        return;
      }

      setAddresses(data.addresses || []);
      closeForm();
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (addressId) => {
    setDeletingId(addressId);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/user/address`, {
        method: "DELETE",
        headers: authHeaders,
        body: JSON.stringify({ userId, addressId }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Could not delete address");
      } else {
        setAddresses(data.addresses || []);
      }
    } catch (err) {
      setError("Something went wrong while deleting the address.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetDefault = async (addressId) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/user/address/default`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({ userId, addressId }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Could not set default address");
      } else {
        setAddresses(data.addresses || []);
      }
    } catch (err) {
      setError("Something went wrong while updating the default address.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero */}
      <section className="bg-[#5E6B58] py-14 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="uppercase tracking-[4px] text-xs opacity-80">
            My Account
          </p>

          <h1
            className="text-4xl md:text-5xl mt-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Saved Addresses
          </h1>

          <p className="mt-4 text-white/80">
            Manage your shipping and billing addresses.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Add Address Button */}
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-6 py-3 bg-[#5E6B58]
                     text-white uppercase tracking-[2px] text-xs
                     font-semibold hover:bg-[#4d5849] transition"
        >
          <Plus size={16} />
          Add New Address
        </button>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-2 text-[#777] mt-10">
            <Loader2 size={18} className="animate-spin" />
            Loading addresses…
          </div>
        )}

        {/* Address Grid */}
        {!loading && addresses.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="bg-white border border-[#E4E0D8] p-6 relative"
              >
                {address.isDefault && (
                  <span
                    className="absolute top-4 right-4 bg-[#5E6B58]
                               text-white text-[10px] uppercase
                               tracking-[2px] px-3 py-1"
                  >
                    Default
                  </span>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <MapPin size={20} className="text-[#5E6B58]" />

                  <h3 className="font-semibold text-[#2D2D2D]">
                    {address.type}
                  </h3>
                </div>

                <p className="font-medium text-[#2D2D2D]">
                  {address.fullName}
                </p>

                <p className="text-[#777] mt-2">{address.phone}</p>

                <p className="text-[#777] mt-4 leading-relaxed">
                  {address.address}, {address.city}, {address.state},{" "}
                  {address.pincode}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={() => openEditForm(address)}
                    className="flex items-center gap-2 border border-[#5E6B58]
                               px-4 py-2 text-[#5E6B58] text-xs uppercase
                               tracking-[1.5px] font-semibold hover:bg-[#5E6B58]
                               hover:text-white transition"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(address._id)}
                    disabled={deletingId === address._id}
                    className="flex items-center gap-2 border border-red-500
                               px-4 py-2 text-red-500 text-xs uppercase
                               tracking-[1.5px] font-semibold hover:bg-red-500
                               hover:text-white transition disabled:opacity-60"
                  >
                    {deletingId === address._id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                    Delete
                  </button>

                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address._id)}
                      className="flex items-center gap-2 border border-[#D8D2C8]
                                 px-4 py-2 text-[#666] text-xs uppercase
                                 tracking-[1.5px] font-semibold hover:bg-[#F8F5EE]
                                 transition"
                    >
                      <Star size={14} />
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && addresses.length === 0 && (
          <div className="bg-white border border-[#E4E0D8] p-16 text-center mt-8">
            <MapPin size={50} className="mx-auto text-[#5E6B58]" />

            <h2
              className="text-3xl mt-6 text-[#2D2D2D]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No Address Found
            </h2>

            <p className="text-[#777] mt-3">
              Add your first address to speed up checkout.
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white border border-[#E4E0D8] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#E4E0D8]">
              <h3
                className="text-2xl text-[#2D2D2D]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {editingId ? "Edit Address" : "Add New Address"}
              </h3>

              <button
                onClick={closeForm}
                className="text-[#999] hover:text-[#2D2D2D] transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
                  {formError}
                </div>
              )}

              {/* Type */}
              <div>
                <label className="block text-sm text-[#666] mb-2">
                  Address Type
                </label>
                <div className="flex gap-3">
                  {["Home", "Office", "Other"].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setForm((prev) => ({ ...prev, type: t }))}
                      className={`px-4 py-2 text-xs uppercase tracking-[1.5px] font-semibold border transition ${
                        form.type === t
                          ? "bg-[#5E6B58] text-white border-[#5E6B58]"
                          : "border-[#D8D2C8] text-[#666] hover:bg-[#F8F5EE]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Field
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleFormChange}
              />

              <Field
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
              />

              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={handleFormChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleFormChange}
                />
                <Field
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleFormChange}
                />
              </div>

              <Field
                label="Pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleFormChange}
              />

              <label className="flex items-center gap-2 text-sm text-[#666]">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleFormChange}
                  className="accent-[#5E6B58]"
                />
                Set as default address
              </label>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold hover:bg-[#4c5848] transition disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving…
                    </>
                  ) : editingId ? (
                    "Save Changes"
                  ) : (
                    "Add Address"
                  )}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="px-8 py-3 border border-[#5E6B58] text-[#5E6B58] uppercase tracking-[2px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-[#666] mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-[#D8D2C8] px-4 py-3 outline-none focus:border-[#5E6B58]"
      />
    </div>
  );
}