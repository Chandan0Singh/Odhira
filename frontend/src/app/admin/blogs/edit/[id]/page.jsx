"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    status: "Draft",
    featuredImage: "",
  });

  /* ---------------- FETCH SINGLE BLOG ---------------- */

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/blog/${id}`
      );

      setBlogData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- UPDATE BLOG ---------------- */

  const updateBlog = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:5000/api/blog/update/${id}`,
        blogData
      );

      alert("Blog updated successfully");

      router.push("/admin/blogs");
    } catch (error) {
      console.log(error);
      alert("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border">

        <h1 className="text-3xl font-bold mb-8">
          Edit Blog
        </h1>

        <form onSubmit={updateBlog} className="space-y-6">

          {/* TITLE */}

          <div>
            <label className="block mb-2 font-medium">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={blogData.description}
              onChange={handleChange}
              placeholder="Short description"
              rows={3}
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category"
              value={blogData.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Fashion">Fashion</option>
              <option value="Style">Style</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          {/* CONTENT */}

          <div>
            <label className="block mb-2 font-medium">
              Content
            </label>

            <textarea
              name="content"
              value={blogData.content}
              onChange={handleChange}
              placeholder="Write blog content..."
              rows={10}
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* FEATURED IMAGE */}

          <div>
            <label className="block mb-2 font-medium">
              Featured Image URL
            </label>

            <input
              type="text"
              name="featuredImage"
              value={blogData.featuredImage}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* STATUS */}

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              name="status"
              value={blogData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="border px-6 py-3 rounded-xl"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}