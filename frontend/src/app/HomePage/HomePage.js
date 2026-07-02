import Link from "next/link";
import HeroSlider from "../Components/HeroSlider";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getHomeData() {
  const res = await fetch(`${API_BASE}/api/home`, {
    // always get fresh data on each request; swap for
    // { next: { revalidate: 60 } } if you want ISR caching instead
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load home page data");
  }

  return res.json();
}

function formatINR(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default async function Home() {
  const { home, categories, newArrivals, bestSellers, lookbook } =
    await getHomeData();

  return (
    <main className="bg-[#F8F5EE]">
      {/* HERO */}
      <HeroSlider hero={home?.hero} />

      {/* COLLECTIONS */}
      {categories?.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <p className="text-[#C5A46D] uppercase tracking-[4px]">
                Collections
              </p>

              <h2 className="text-5xl text-[#4B5A43] font-serif mt-3">
                Curated For You
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/shop?category=${cat.slug}`}
                  className="group relative overflow-hidden block"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-[500px] w-full object-cover duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-3xl text-white font-serif">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEW ARRIVALS */}
      {newArrivals?.length > 0 && (
        <section className="bg-white py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <p className="text-[#C5A46D] uppercase tracking-[4px]">
                New Arrivals
              </p>

              <h2 className="text-5xl text-[#4B5A43] font-serif mt-3">
                Fresh Drops
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {newArrivals.map((product) => {
                const primaryImage =
                  product.images?.find((img) => img.isPrimary) ||
                  product.images?.[0];

                return (
                  <Link key={product._id} href={`/product/${product.slug}`}>
                    <img
                      src={primaryImage?.url}
                      alt={primaryImage?.alt || product.title}
                      className="h-[400px] w-full object-cover"
                    />

                    <div className="mt-4">
                      <h3 className="font-medium text-lg">{product.title}</h3>

                      <div className="mt-2 flex items-center gap-3">
                        <p className="text-[#C5A46D]">
                          {formatINR(product.discountedPrice || product.price)}
                        </p>

                        {product.discountedPrice && (
                          <p className="text-gray-400 line-through text-sm">
                            {formatINR(product.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* BRAND STORY */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <img
              src={home?.brandStory?.image || "/brand-story.jpg"}
              alt={home?.brandStory?.title || "Brand story"}
              className="h-[700px] w-full object-cover"
            />

            <div>
              <p className="text-[#C5A46D] uppercase tracking-[4px]">
                Our Story
              </p>

              <h2 className="mt-4 text-5xl font-serif text-[#4B5A43]">
                {home?.brandStory?.title || "Fashion That Speaks Grace"}
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                {home?.brandStory?.description ||
                  "Inspired by heritage craftsmanship and modern silhouettes, our collections blend luxury, comfort and timeless beauty."}
              </p>

              <Link href={home?.brandStory?.buttonLink || "/about"}>
                <button className="mt-8 bg-[#4B5A43] text-white px-8 py-4">
                  {home?.brandStory?.buttonText || "Discover More"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      {bestSellers?.length > 0 && (
        <section className="bg-white py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <p className="text-[#C5A46D] uppercase tracking-[4px]">
                Best Sellers
              </p>

              <h2 className="text-5xl font-serif text-[#4B5A43] mt-3">
                Customer Favorites
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {bestSellers.map((product) => {
                const primaryImage =
                  product.images?.find((img) => img.isPrimary) ||
                  product.images?.[0];

                return (
                  <Link key={product._id} href={`/product/${product.slug}`}>
                    <img
                      src={primaryImage?.url}
                      alt={primaryImage?.alt || product.title}
                      className="h-[400px] w-full object-cover"
                    />

                    <h3 className="mt-4">{product.title}</h3>

                    <div className="mt-2 flex items-center gap-3">
                      <p className="text-[#C5A46D]">
                        {formatINR(product.discountedPrice || product.price)}
                      </p>

                      {product.discountedPrice && (
                        <p className="text-gray-400 line-through text-sm">
                          {formatINR(product.price)}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* LOOKBOOK */}
      {lookbook?.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <p className="text-[#C5A46D] uppercase tracking-[4px]">
                Lookbook
              </p>

              <h2 className="text-5xl font-serif text-[#4B5A43] mt-3">
                Editorial Styles
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {lookbook.map((item) => (
                <Link
                  key={item._id}
                  href={`/lookbook/${item.slug}`}
                  className="group relative block overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[550px] w-full object-cover duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl text-white font-serif">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INSTAGRAM */}
      {home?.instagram?.length > 0 && (
        <section className="bg-white py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-5xl font-serif text-[#4B5A43] mb-16">
              Follow On Instagram
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {home.instagram.map((post) => (
                <a
                  key={post._id}
                  href={post.link || "https://instagram.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={post.image}
                    alt="Instagram post"
                    className="h-[250px] w-full object-cover"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-serif text-[#4B5A43]">
            {home?.newsletter?.title || "Join Our Community"}
          </h2>

          <p className="mt-6 text-gray-600">
            {home?.newsletter?.description ||
              "Get exclusive access to new arrivals, promotions and fashion inspiration."}
          </p>

          <form className="flex mt-8">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 border border-gray-300 px-4 py-4"
            />

            <button type="submit" className="bg-[#4B5A43] text-white px-8">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
