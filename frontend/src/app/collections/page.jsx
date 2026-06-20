export default function CollectionsPage() {
  const collections = [
    {
      title: "Women",
      href: "/collections/women",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
      description: "Elegant styles crafted for modern women.",
    },
    {
      title: "Men",
      href: "/collections/men",
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80",
      description: "Timeless ethnic and contemporary menswear.",
    },
    {
      title: "Accessories",
      href: "/collections/accessories",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80",
      description: "Complete your look with premium accessories.",
    },
    {
      title: "New Arrivals",
      href: "/collections/new-arrivals",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
      description: "Fresh arrivals curated for the season.",
    },
    {
      title: "Sale",
      href: "/collections/sale",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80",
      description: "Exclusive discounts on selected collections.",
    },
  ];

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero */}
      <section className="relative h-[350px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80"
          alt="Collections"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
          <p className="uppercase tracking-[4px] text-sm mb-3">
            Explore
          </p>

          <h1
            className="text-5xl md:text-7xl"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Collections
          </h1>

          <p className="mt-4 max-w-2xl text-gray-200">
            Discover our curated collections designed for every occasion.
          </p>
        </div>
      </section>

      {/* Collection Cards */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {collections.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group bg-white border border-[#E4E0D8] overflow-hidden"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              <div className="p-8 text-center">
                <h2
                  className="text-4xl text-[#2D2D2D]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {item.title}
                </h2>

                <p className="mt-3 text-[#666]">
                  {item.description}
                </p>

                <button className="mt-6 px-8 py-3 border border-[#5E6B58] text-[#5E6B58] uppercase tracking-[3px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition">
                  Explore
                </button>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EFE8DE] py-24 text-center">
        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Crafted For Every Style
        </h2>

        <p className="mt-4 text-[#666] max-w-xl mx-auto">
          Explore luxury fashion collections designed with timeless elegance.
        </p>

        <button className="mt-8 px-10 py-4 bg-[#5E6B58] text-white uppercase tracking-[3px] text-sm">
          Shop Collection
        </button>
      </section>
    </div>
  );
}