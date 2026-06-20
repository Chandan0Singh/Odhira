// app/admin/edit-product/[id]/page.js

'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

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

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          price: res.data.price || "",
          gender: res.data.gender || "",
          category: res.data.category || "",
          age: res.data.age || "",
          sale: res.data.sale || "",
          image: res.data.image || "",
        });

      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };

    fetchProduct();
  }, [id]);

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
      await axios.put(`/api/products/${id}`, form);

      alert("✅ Product updated!");

      router.push("/admin/all-products");

    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-semibold mb-4">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          className="w-full border p-2"
          name="title"
          value={form.title || ""}
          placeholder="Title"
          onChange={handleChange}
        />

        <textarea
          className="w-full border p-2"
          name="description"
          value={form.description || ""}
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2"
          name="price"
          type="number"
          value={form.price || ""}
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2"
          name="gender"
          value={form.gender || ""}
          placeholder="Gender"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2"
          name="category"
          value={form.category || ""}
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2"
          name="age"
          value={form.age || ""}
          placeholder="Age"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2"
          name="sale"
          value={form.sale || ""}
          placeholder="[15%]"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2"
          name="image"
          value={form.image || ""}
          placeholder="Image URL"
          onChange={handleChange}
        />

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="h-32 object-cover border"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>

      </form>
    </div>
  );
}