"use client";

import { useEffect, useState } from "react";

export default function LookbookPage() {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLookbook = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/lookbook");

      if (!response.ok) {
        throw new Error("Failed to fetch lookbook");
      }

      const result = await response.json();

      console.log("Lookbook data:", result.data); // Log the fetched data for debugging

      setLooks(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLookbook();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero */}
      <section className="relative h-[350px] md:h-[550px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80"
          alt="Lookbook"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
          <p className="uppercase tracking-[4px] text-sm mb-3">
            Editorial Collection
          </p>

          <h1
            className="text-5xl md:text-7xl"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Lookbook
          </h1>

          <p className="mt-5 max-w-2xl text-gray-200">
            Discover inspiring looks curated from our latest collections.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto text-center px-6 py-20">
        <p className="uppercase tracking-[4px] text-[#5E6B58] text-sm mb-4">
          Style Journal
        </p>

        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Fashion That Tells A Story
        </h2>

        <p className="mt-6 text-[#666] leading-relaxed">
          Explore carefully curated looks showcasing timeless elegance,
          contemporary silhouettes, and luxurious craftsmanship.
        </p>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {looks.map((look) => (
            <div
              key={look._id}
              className="break-inside-avoid bg-white overflow-hidden border border-[#E4E0D8] group"
            >
              <div className="overflow-hidden">
                <img
                  src={`http://localhost:5000${look.image}`}
                  alt={look.title}
                  className="w-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              <div className="p-6 text-center">
                <h3
                  className="text-2xl text-[#2D2D2D]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {look.title}
                </h3>

                <p className="mt-3 text-gray-600 text-sm">{look.description}</p>

                <button className="mt-5 text-[#5E6B58] uppercase tracking-[3px] text-xs font-semibold">
                  View Look
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EFE8DE] py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="uppercase tracking-[4px] text-[#5E6B58] mb-3">
            Discover More
          </p>

          <h2
            className="text-4xl md:text-5xl text-[#2D2D2D]"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Explore Our Collections
          </h2>

          <p className="mt-5 text-[#666]">
            Find the perfect style from our curated fashion collections.
          </p>

          <a
            href="/collections"
            className="inline-block mt-8 px-10 py-4 bg-[#5E6B58] text-white uppercase tracking-[3px] text-sm"
          >
            Shop Collection
          </a>
        </div>
      </section>
    </div>
  );
}
