export default function AboutPage() {
  return (
    <main className="bg-[#F8F5EE]">

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
          alt="About Brand"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <div>
            <p className="uppercase tracking-[5px] text-white mb-4">
              About Us
            </p>

            <h1 className="font-serif text-6xl md:text-7xl text-white">
              Crafted With Elegance
            </h1>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-[#C5A46D] uppercase tracking-[4px] mb-4">
                Our Story
              </p>

              <h2 className="text-5xl font-serif text-[#4B5A43] mb-8">
                Fashion Inspired By Timeless Beauty
              </h2>

              <p className="text-gray-600 leading-8 mb-6">
                Our brand was founded with a vision to create
                clothing that celebrates elegance, confidence,
                and individuality. Every collection is carefully
                designed to blend modern aesthetics with timeless
                craftsmanship.
              </p>

              <p className="text-gray-600 leading-8">
                We believe fashion should feel luxurious,
                effortless, and meaningful. From premium fabrics
                to thoughtful details, each piece reflects our
                commitment to quality and sophistication.
              </p>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
                alt=""
                className="rounded-lg h-[650px] w-full object-cover"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-10">

            <div className="border border-[#E5E0D8] p-10">
              <h3 className="font-serif text-4xl text-[#4B5A43] mb-6">
                Our Mission
              </h3>

              <p className="text-gray-600 leading-8">
                To empower individuals through thoughtfully
                designed fashion that combines luxury,
                comfort, and sustainability.
              </p>
            </div>

            <div className="border border-[#E5E0D8] p-10">
              <h3 className="font-serif text-4xl text-[#4B5A43] mb-6">
                Our Vision
              </h3>

              <p className="text-gray-600 leading-8">
                To become a globally admired fashion brand
                known for timeless elegance, craftsmanship,
                and responsible innovation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="text-[#C5A46D] uppercase tracking-[4px]">
              Our Values
            </p>

            <h2 className="font-serif text-5xl text-[#4B5A43] mt-4">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 border border-[#E5E0D8] text-center">
              <h3 className="font-serif text-2xl text-[#4B5A43] mb-4">
                Premium Quality
              </h3>

              <p className="text-gray-600">
                Carefully selected fabrics and meticulous craftsmanship.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#E5E0D8] text-center">
              <h3 className="font-serif text-2xl text-[#4B5A43] mb-4">
                Sustainability
              </h3>

              <p className="text-gray-600">
                Responsible sourcing and ethical production practices.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#E5E0D8] text-center">
              <h3 className="font-serif text-2xl text-[#4B5A43] mb-4">
                Timeless Design
              </h3>

              <p className="text-gray-600">
                Elegant collections designed to transcend trends.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Sustainability */}
      <section className="bg-[#4B5A43] text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[4px] text-[#C5A46D] mb-4">
            Sustainability
          </p>

          <h2 className="font-serif text-5xl mb-8">
            Fashion With Purpose
          </h2>

          <p className="text-lg leading-8 text-gray-200">
            We are committed to creating a positive impact through
            sustainable materials, responsible manufacturing,
            and long-lasting designs that reduce waste and
            encourage mindful consumption.
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">

          <h2 className="font-serif text-5xl text-[#4B5A43] mb-6">
            Join Our Journey
          </h2>

          <p className="text-gray-600 mb-8">
            Discover collections crafted for modern elegance and
            timeless style.
          </p>

          <a
            href="/collections"
            className="inline-block bg-[#4B5A43] text-white px-10 py-4 uppercase tracking-widest hover:bg-[#C5A46D] transition"
          >
            Explore Collection
          </a>

        </div>
      </section>

    </main>
  );
}