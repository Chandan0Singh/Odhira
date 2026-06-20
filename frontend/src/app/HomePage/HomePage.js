export default function Home() {
  return (
    <main className="bg-[#F8F5EE]">
      {/* HERO */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src="/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
          <div>
            <h2 className="text-7xl text-[#2D2D2D] leading-none">
              Timeless <br /> Elegance
            </h2>

            <p className="mt-6 text-lg text-[#555] max-w-md">
              Discover handcrafted luxury designed for modern elegance.
            </p>

            <button className="mt-8 bg-[#4B5A43] text-white px-8 py-4 uppercase tracking-widest">
              Shop Collection
            </button>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
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
            {["Women", "Men", "Accessories"].map((item) => (
              <div key={item} className="group relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
                  alt=""
                  className="h-[500px] w-full object-cover duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl text-white font-serif">{item}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
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
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                  alt=""
                  className="h-[400px] w-full object-cover"
                />

                <div className="mt-4">
                  <h3 className="font-medium text-lg">Linen Summer Dress</h3>

                  <p className="text-[#C5A46D] mt-2">₹4,999</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
              alt=""
              className="h-[700px] w-full object-cover"
            />

            <div>
              <p className="text-[#C5A46D] uppercase tracking-[4px]">
                Our Story
              </p>

              <h2 className="mt-4 text-5xl font-serif text-[#4B5A43]">
                Fashion That Speaks Grace
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                Inspired by heritage craftsmanship and modern silhouettes, our
                collections blend luxury, comfort and timeless beauty.
              </p>

              <button className="mt-8 bg-[#4B5A43] text-white px-8 py-4">
                Discover More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
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
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
                  alt=""
                  className="h-[400px] w-full object-cover"
                />

                <h3 className="mt-4">Premium Designer Wear</h3>

                <p className="text-[#C5A46D] mt-2">₹6,999</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="text-[#C5A46D] uppercase tracking-[4px]">Lookbook</p>

            <h2 className="text-5xl font-serif text-[#4B5A43] mt-3">
              Editorial Styles
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <img
                key={item}
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
                alt=""
                className="h-[550px] w-full object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-5xl font-serif text-[#4B5A43] mb-16">
            Follow On Instagram
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <img
                key={item}
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
                alt=""
                className="h-[250px] w-full object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-serif text-[#4B5A43]">
            Join Our Community
          </h2>

          <p className="mt-6 text-gray-600">
            Get exclusive access to new arrivals, promotions and fashion
            inspiration.
          </p>

          <div className="flex mt-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 px-4 py-4"
            />

            <button className="bg-[#4B5A43] text-white px-8">Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
}
