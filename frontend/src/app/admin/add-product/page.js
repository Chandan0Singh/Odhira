'use client';

import { useState } from "react";
import axios from "axios";

export default function AddProduct() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    gender: "",
    category: "",
    age: "",
    sale: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/products/add", form);

      alert("✅ Product added!");

      setForm({
        title: "",
        description: "",
        price: "",
        gender: "",
        category: "",
        age: "",
        sale: "",
        image: "",
      });

    } catch (err) {
      console.error(err);

      alert("❌ Error while adding product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">

      <h2 className="text-2xl font-semibold mb-6">
        🆕 Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <div>
          <label className="block font-medium mb-1">
            Title
          </label>

          <input
            name="title"
            value={form.title}
            placeholder="Product title"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            placeholder="Product description"
            rows="4"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block font-medium mb-1">
              Price (₹)
            </label>

            <input
              name="price"
              type="number"
              value={form.price}
              placeholder="Price"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Gender
            </label>

            <input
              name="gender"
              value={form.gender}
              placeholder="Male / Female / Unisex"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div>
          <label className="block font-medium mb-1">
            Category
          </label>

          <input
            name="category"
            value={form.category}
            placeholder="Category"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Age
          </label>

          <input
            name="age"
            value={form.age}
            placeholder="Kids / Adult / Teen"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Sale Percentage
          </label>

          <input
            name="sale"
            value={form.sale}
            placeholder="[15%]"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Image URL
          </label>

          <input
            name="image"
            value={form.image}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />

          {form.image && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                🔍 Preview:
              </p>

              <img
                src={form.image}
                alt="Preview"
                className="w-48 h-auto border rounded shadow"
                onError={(e) => (
                  e.target.style.display = "none"
                )}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition duration-200"
        >
          ➕ Add Product
        </button>

      </form>
    </div>
  );
}