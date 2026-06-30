"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const API = "http://localhost:5000/api/blog";

export default function JournalPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API}/published`);
      const data = await res.json();

      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(blogs.map((b) => b.category).filter(Boolean)),
    ];
  }, [blogs]);

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  const featured = blogs[0];

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Header */}

      <section className="text-center py-16 border-b">
        <p className="uppercase tracking-[5px] text-xs text-[#5E6B58]">
          Stories & Ideas
        </p>

        <h1 className="text-5xl mt-4 font-serif">
          The Journal
        </h1>
      </section>

      {/* Featured */}

      {featured && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 bg-white border">

            <img
              src={`${featured.featuredImage}`}
              className="w-full h-full object-cover"
            />

            <div className="p-10 flex flex-col justify-center">

              <p className="uppercase text-xs tracking-[4px] text-[#5E6B58]">
                Featured • {featured.category}
              </p>

              <h2 className="text-4xl mt-4 font-serif">
                {featured.title}
              </h2>

              <p className="mt-5 text-gray-600">
                {featured.description}
              </p>

              <div className="mt-8 flex justify-between items-center">

                <div>
                  <p>{featured.author}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(
                      featured.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <Link
                  href={`/blog/${featured._id}`}
                  className="bg-[#5E6B58] text-white px-6 py-3 flex items-center gap-2"
                >
                  Read Story
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}

      <section className="max-w-7xl mx-auto px-6 pb-8 flex gap-3 flex-wrap">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 border uppercase text-xs tracking-[2px]
            ${
              activeCategory === cat
                ? "bg-[#5E6B58] text-white"
                : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Blogs */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        {loading ? (
          <div className="text-center py-20">
            Loading...
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

            {filteredBlogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white border overflow-hidden"
              >
                <img
                  src={`${blog.featuredImage}`}
                  className="h-72 w-full object-cover"
                />

                <div className="p-6">

                  <div className="flex justify-between mb-3">

                    <span className="uppercase text-xs tracking-[3px] text-[#5E6B58]">
                      {blog.category}
                    </span>

                    <span className="flex items-center gap-1 text-xs">
                      <Clock size={12} />
                      {blog.views} views
                    </span>

                  </div>

                  <h3 className="text-2xl font-serif mb-4">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-3">
                    {blog.description}
                  </p>

                  <div className="mt-6 flex justify-between items-center">

                    <div>
                      <p className="font-semibold">
                        {blog.author}
                      </p>

                      <p className="text-xs text-gray-500">
                        {new Date(
                          blog.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <Link
                      href={`/journal/${blog._id}`}
                      className="flex items-center gap-2 text-[#5E6B58]"
                    >
                      Read
                      <ArrowRight size={15} />
                    </Link>

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}
      </section>
    </div>
  );
}