"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useRouter } from "next/navigation";
import ConfirmPopup from "@/app/Components/confimationpopup";

const EMPTY_DOC = `
  <h1>Start Writing Your Blog...</h1>
  <p>Add headings, paragraphs, images and lists.</p>
`;

export default function BlogsDashboard() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("All Categories");
  const [searchStatus, setSearchStatus] = useState("All Status");
  const [blogCount, setBlogCount] = useState("");
  const [views, setViews] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [editBlog, setEditBlog] = useState(false);
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: EMPTY_DOC,
  });

  const addImage = () => {
    const url = prompt("Paste Image URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setFeaturedImage("");
    editor?.commands.setContent(EMPTY_DOC);
  };

  // ─── FETCH ALL BLOGS (used on load and after create/delete) ───────
  const getAllBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blog");

      setBlogs(response.data.data);
      setBlogCount(response.data.count);
      setViews(response.data.totalViews);
    } catch (error) {
      console.log("error while geting blog : ", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  // ─── CREATE BLOG (matches createBlog controller: title, category,
  //     content, status required; description, featuredImage optional) ──
  const saveBlog = async (blogStatus) => {
    setSaveError("");

    const blogContent = editor.getHTML();

    if (!title.trim()) {
      return setSaveError("Blog title is required");
    }
    if (!category) {
      return setSaveError("Please select a category");
    }
    if (!blogContent || blogContent === EMPTY_DOC.trim()) {
      return setSaveError("Blog content cannot be empty");
    }

    setSaving(true);
    try {
      await axios.post("http://localhost:5000/api/blog/create", {
        title,
        category,
        description,
        content: blogContent,
        status: blogStatus,
        featuredImage,
      });

      alert(`Blog ${blogStatus} Successfully`);

      resetForm();
      setEditBlog(false);

      // refresh the list + stats so the new blog shows up immediately
      await getAllBlogs();
    } catch (error) {
      console.log(error);
      setSaveError(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (value) => {
    // close popup
    setShowPopup(false);

    // cancel
    if (!value) return;

    try {
      await axios.delete("http://localhost:5000/api/blog/delete", {
        data: {
          blogid: selectedBlogId,
        },
      });

      // reflect deletion immediately + refresh stats
      setBlogs((prev) => prev.filter((b) => b._id !== selectedBlogId));
      getAllBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  const filtersearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blog/search",
        {
          params: {
            search: searchTerm,
            category: searchCategory,
            status: searchStatus,
          },
        },
      );

      setBlogs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filtersearch();
  }, [searchTerm, searchCategory, searchStatus]);

  const draftCount = blogs.filter((blog) => blog.status === "Draft").length;

  const publishCount = blogs.filter(
    (blog) => blog.status === "Published",
  ).length;

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Blogs Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage blogs, articles, categories and publishing status.
            </p>
          </div>

          <button
            onClick={() => {
              setSaveError("");
              setEditBlog(!editBlog);
            }}
            className="bg-black text-white px-5 py-3 rounded-2xl shadow hover:scale-105 transition"
          >
            + Create Blog
          </button>
        </div>

        {editBlog && (
          <div className="bg-white rounded-3xl mb-[4rem] border shadow-sm p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Create New Blog
            </h2>

            {saveError && (
              <div className="mb-5 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                {saveError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-xl px-4 py-3 outline-none"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-xl px-4 py-3 outline-none"
              >
                <option value="">Select Category</option>
                <option>Fashion</option>
                <option>Style</option>
                <option>Travel</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Blog Description
              </label>

              <textarea
                placeholder="Write short blog description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={300}
                className="w-full border rounded-2xl px-4 py-3 outline-none resize-none"
              />

              <p className="text-sm text-gray-500 mt-2">
                {description.length}/300 characters
              </p>
            </div>

            {/* Featured Image */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Featured Image URL
              </label>

              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 bg-white outline-none"
              />

              {featuredImage && (
                <img
                  src={featuredImage}
                  alt="Preview"
                  onError={(e) => (e.target.style.display = "none")}
                  onLoad={(e) => (e.target.style.display = "block")}
                  className="h-32 mt-3 object-cover border rounded-xl"
                />
              )}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-3 p-4 border rounded-t-2xl bg-gray-50">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="bg-black text-white px-4 py-2 rounded-xl"
              >
                Bold
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="bg-black text-white px-4 py-2 rounded-xl"
              >
                Italic
              </button>

              <button
                type="button"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className="bg-black text-white px-4 py-2 rounded-xl"
              >
                H1
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="bg-black text-white px-4 py-2 rounded-xl"
              >
                List
              </button>

              <button
                type="button"
                onClick={addImage}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                Add Image
              </button>
            </div>

            {/* Editor */}
            <div className="border border-t-0 rounded-b-2xl overflow-hidden">
              <EditorContent
                editor={editor}
                className="prose max-w-none p-6 min-h-[400px] focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={() => saveBlog("Published")}
                disabled={saving}
                className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition disabled:opacity-50"
              >
                {saving ? "Publishing..." : "Publish Blog"}
              </button>

              <button
                onClick={() => saveBlog("Draft")}
                disabled={saving}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Draft"}
              </button>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setSaveError("");
                  setEditBlog(false);
                }}
                className="border px-6 py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <p className="text-gray-500 text-sm">Total Blogs</p>
            <h2 className="text-4xl font-bold mt-2">{blogCount}</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <p className="text-gray-500 text-sm">Published</p>
            <h2 className="text-4xl font-bold mt-2">{publishCount}</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <p className="text-gray-500 text-sm">Drafts</p>
            <h2 className="text-4xl font-bold mt-2">{draftCount}</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <p className="text-gray-500 text-sm">Total Views</p>
            <h2 className="text-4xl font-bold mt-2">{views}</h2>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border mb-6 flex flex-col lg:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full lg:w-1/3 outline-none"
          />

          <div className="flex flex-wrap gap-3">
            <select
              value={searchCategory}
              onChange={(e) => {
                setSearchCategory(e.target.value);
              }}
              className="border rounded-xl px-4 py-3 outline-none"
            >
              <option>All Categories</option>
              <option>Fashion</option>
              <option>Style</option>
              <option>Travel</option>
            </select>

            <select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              className="border rounded-xl px-4 py-3 outline-none"
            >
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-5 text-sm font-semibold text-gray-600">
                    Blog Title
                  </th>

                  <th className="text-left p-5 text-sm font-semibold text-gray-600">
                    Author
                  </th>

                  <th className="text-left p-5 text-sm font-semibold text-gray-600">
                    Category
                  </th>

                  <th className="text-left p-5 text-sm font-semibold text-gray-600">
                    Views
                  </th>

                  <th className="text-left p-5 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-left p-5 text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="text-left p-5 text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-5">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {blog.title}
                        </h3>
                      </td>

                      <td className="p-5 text-gray-700">{blog.author}</td>

                      <td className="p-5">
                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                          {blog.category}
                        </span>
                      </td>

                      <td className="p-5 font-semibold text-gray-800">
                        {blog.views}
                      </td>

                      <td className="p-5">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            blog.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>

                      <td className="p-5 text-gray-600">
                        {new Date(blog.updatedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="p-5">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => router.push(`/journal/${blog._id}`)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              router.push(`/admin/blogs/edit/${blog._id}`)
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              setSelectedBlogId(blog._id);
                              setShowPopup(true);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      No Blogs Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPopup && (
        <ConfirmPopup
          message="Are you sure you want to delete this blog?"
          onClose={handleDelete}
        />
      )}
    </>
  );
}