"use client";
import { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";

export default function NewArrivalsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/collections/new-arrivals"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();
    setData(result);
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}

      <section className="relative h-[450px]">

        <img
          src={data.banner}
          alt={data.pageTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">

          <p className="uppercase tracking-[5px] text-sm">
            Latest Collection
          </p>

          <h1 className="text-6xl font-light mt-4">
            {data.pageTitle}
          </h1>

          <p className="mt-4 max-w-2xl">
            {data.pageDescription}
          </p>

        </div>

      </section>

      {/* Header */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex justify-between border-b pb-5">

          <div>
            <h2 className="text-3xl font-light">
              Fresh Drops
            </h2>

            <p className="text-gray-500 mt-2">
              Explore our latest arrivals.
            </p>

          </div>

          <p>{data.total} Products</p>

        </div>

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {data.products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      </section>

    </div>
  );
}