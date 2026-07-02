"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroSlider({ hero }) {
  const images = hero?.images || [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <img
        src={images[current]?.image || "/hero.jpg"}
        alt={images[current]?.alt || "Hero Banner"}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
        <div>
          <h2 className="text-7xl text-[#2D2D2D]">
            {hero?.title}
          </h2>

          <p className="mt-6 text-lg text-[#555] max-w-md">
            {hero?.subtitle}
          </p>

          <Link href={hero?.buttonLink || "/shop"}>
            <button className="mt-8 bg-[#4B5A43] text-white px-8 py-4 uppercase tracking-widest">
              {hero?.buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}