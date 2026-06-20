export default function TopDestinations() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        <div className="mb-12 text-center">
          <h2 className="font-serif text-5xl">
            Top Destinations
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div className="h-[450px] rounded-3xl bg-gray-300" />
          <div className="h-[450px] rounded-3xl bg-gray-300" />
          <div className="h-[450px] rounded-3xl bg-gray-300" />

        </div>

      </div>
    </section>
  );
}