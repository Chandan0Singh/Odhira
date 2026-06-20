export default function Hero() {
  return (
    <section className="relative h-screen">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b')",
        }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 container mx-auto flex h-full items-center px-4">

        <div className="max-w-3xl text-white">

          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
            Explore Nature Like Never Before
          </span>

          <h1 className="mb-6 font-serif text-6xl font-bold leading-tight">
            From Mountain Trails
            <br />
            To Memorable Journeys
          </h1>

          <p className="mb-8 max-w-xl text-lg text-gray-200">
            Discover breathtaking treks, guided adventures,
            and unforgettable travel experiences across India.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-green-800 px-8 py-4 text-white">
              Explore Treks
            </button>

            <button className="rounded-full border border-white px-8 py-4">
              View Tours
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}