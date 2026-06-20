"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Search, Plus, Pencil, Trash2, Package } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      // If backend sends { products: [] }
      setProducts(data.products || data || []);
    } catch (error) {
      console.log("Fetch Products Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      // Remove deleted product instantly
      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search Filter
  const filteredProducts = products.filter((product) =>
    product?.title
      ?.toLowerCase()
      ?.includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Products Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your products from one place.
          </p>
        </div>

        <Link href="/admin/add-product">
          <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl hover:scale-105 transition duration-300 shadow-md">
            <Plus size={18} />
            Add Product
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Products
              </p>

              <h2 className="text-4xl font-bold mt-2 text-gray-800">
                {products.length}
              </h2>
            </div>

            <div className="bg-gray-100 p-4 rounded-2xl">
              <Package size={32} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <p className="text-gray-500 text-sm">
            Active Products
          </p>

          <h2 className="text-4xl font-bold mt-2 text-gray-800">
            {products.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <p className="text-gray-500 text-sm">
            Today's Added
          </p>

          <h2 className="text-4xl font-bold mt-2 text-gray-800">
            5
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border mb-6 flex items-center gap-3">
        <Search className="text-gray-400" size={20} />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Price
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Gender
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Age
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Product */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-16 h-16 rounded-2xl object-cover border"
                        />

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {p.title}
                          </h3>

                          <p className="text-sm text-gray-500">
                            Product ID:{" "}
                            {p._id?.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-5 font-semibold text-gray-700">
                      ₹{p.price}
                    </td>

                    {/* Gender */}
                    <td className="p-5 text-gray-600">
                      {p.gender}
                    </td>

                    {/* Age */}
                    <td className="p-5 text-gray-600">
                      {p.age}
                    </td>

                    {/* Actions */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/edit-product/${p._id}`}
                        >
                          <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition">
                            <Pencil size={16} />
                            Edit
                          </button>
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(p._id)
                          }
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-16 text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
