"use client";

import { useEffect, useState, use } from "react";
import { CalendarDays, Eye, User } from "lucide-react";
import Link from "next/link";

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/blog/${slug}`);

      const data = await res.json();

      if (data.success) {
        setBlog(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold mb-4">Blog not found</h2>

        <Link href="/journal" className="text-[#5E6B58] underline">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero Image */}

      {blog.featuredImage && (
        <div className="w-full h-[500px] overflow-hidden">
          <img
            src={`${blog.featuredImage}`}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}

      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="uppercase tracking-[3px] text-[#5E6B58] text-sm mb-4">
          {blog.category}
        </p>

        <h1 className="text-5xl font-serif text-[#2D2D2D] leading-tight mb-6">
          {blog.title}
        </h1>

        {blog.description && (
          <p className="text-xl text-gray-600 leading-8 mb-10">
            {blog.description}
          </p>
        )}

        {/* Meta */}

        <div className="flex flex-wrap gap-8 border-y py-5 mb-12 text-gray-600">
          <div className="flex items-center gap-2">
            <User size={18} />
            {blog.author}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <Eye size={18} />
            {blog.views} Views
          </div>
        </div>

        {/* Blog Content */}

        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />

        <div className="mt-16">
          <Link
            href="/journal"
            className="inline-flex px-6 py-3 bg-[#5E6B58] text-white hover:bg-[#475242] transition"
          >
            ← Back to Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
