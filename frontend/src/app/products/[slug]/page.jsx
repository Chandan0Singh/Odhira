"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API = "http://localhost:5000/api";

export default function ProductPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/products/slug/${slug}`);
        const data = await res.json();

        console.log("Product Data:", data);

        if (data.success) {
          setProduct(data.product);
          setRelatedProducts(data.relatedProducts || []);

          // set initial image + variant from the fetched data
          setSelectedImage(data.product.images?.[0]?.url || null);

          const firstInStock =
            data.product.variants?.find((v) => v.stock > 0) ||
            data.product.variants?.[0] ||
            null;
          setSelectedVariant(firstInStock);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-20 text-2xl">Product not found</div>;
  }

  // price resolves from the selected variant first, falling back to the product-level price
  const displayPrice =
    selectedVariant?.discountedPrice ??
    selectedVariant?.price ??
    product.discountedPrice ??
    product.price;

  const originalPrice =
    (selectedVariant?.discountedPrice ? selectedVariant?.price : null) ??
    (product.discountedPrice ? product.price : null);

  const outOfStock = selectedVariant ? selectedVariant.stock <= 0 : true;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <img
            src={selectedImage || "/placeholder.png"}
            alt={product.title}
            className="w-full h-[650px] object-cover rounded-lg"
          />

          <div className="flex gap-4 mt-4">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt || product.title}
                onClick={() => setSelectedImage(img.url)}
                className={`h-24 w-24 rounded border object-cover cursor-pointer ${
                  selectedImage === img.url
                    ? "ring-2 ring-black"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="text-gray-500 mt-2">
            ⭐ {product.averageRating} ({product.totalReviews} Reviews)
          </p>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-3xl font-bold">₹{displayPrice}</span>

            {originalPrice && (
              <span className="line-through text-gray-400">
                ₹{originalPrice}
              </span>
            )}
          </div>

          <p className="mt-6 text-gray-700">{product.shortDescription}</p>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Available Variants</h3>

            {product.variants?.map((v) => {
              const isSelected = selectedVariant?.sku === v.sku;
              const isOut = v.stock <= 0;

              return (
                <button
                  key={v.sku}
                  disabled={isOut}
                  onClick={() => setSelectedVariant(v)}
                  className={`w-full border rounded p-3 mb-3 flex justify-between text-left transition
                    ${isSelected ? "border-black ring-1 ring-black" : "border-gray-200"}
                    ${isOut ? "opacity-40 cursor-not-allowed" : "hover:border-black"}`}
                >
                  <div className="flex items-center gap-2">
                    {v.colorHex && (
                      <span
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    )}
                    {v.color} / {v.size}
                  </div>
                  <div>{isOut ? "Out of stock" : `${v.stock} in stock`}</div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              disabled={outOfStock}
              className="bg-black text-white px-8 py-3 rounded disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>

            <button
              disabled={outOfStock}
              className="border px-8 py-3 rounded disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p>{product.description}</p>
      </section>

      {/* Product Details */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category?.name}</p>
          <p><strong>Collection:</strong> {product.collection?.name}</p>
          <p><strong>Fabric:</strong> {product.fabric}</p>
          {product.handwork && <p><strong>Handwork:</strong> {product.handwork}</p>}
          {product.sleeveType && <p><strong>Sleeve:</strong> {product.sleeveType}</p>}
          {product.neckline && <p><strong>Neckline:</strong> {product.neckline}</p>}
          {product.fit && <p><strong>Fit:</strong> {product.fit}</p>}
          <p><strong>Care:</strong> {product.careInstructions}</p>
          <p><strong>Customizable:</strong> {product.customizable ? "Yes" : "No"}</p>
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Related Products</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <a
              key={item._id}
              href={`/products/${item.slug}`}
              className="border rounded-lg overflow-hidden block"
            >
              <img
                src={item.images?.[0]?.url || "/placeholder.png"}
                alt={item.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 font-bold">
                  ₹{item.discountedPrice || item.price}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}