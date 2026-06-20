"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 All Products</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 border-b">Title</th>
              <th className="py-3 px-6 border-b">Gender</th>
              <th className="py-3 px-6 border-b">Price</th>
              <th className="py-3 px-6 border-b">Sale</th>
              <th className="py-3 px-6 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} className="hover:bg-gray-50">
                <td className="py-3 px-6 border-b">{prod.title}</td>
                <td className="py-3 px-6 border-b">{prod.gender}</td>
                <td className="py-3 px-6 border-b">₹{prod.price}</td>
                <td className="py-3 px-6 border-b">
                  {prod.isSale ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>
                <td className="py-3 px-6 border-b text-center space-x-2">
                  <Link href={`/admin/edit-product/${prod._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
