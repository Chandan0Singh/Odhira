const treks = [
  "Kedarkantha Trek",
  "Brahmatal Trek",
  "Har Ki Dun",
  "Dayara Bugyal",
];

export default function FeaturedTreks() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        <div className="mb-12 text-center">
          <span className="text-orange-500">
            Popular Adventures
          </span>

          <h2 className="mt-2 font-serif text-5xl">
            Featured Treks
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {treks.map((trek) => (
            <div
              key={trek}
              className="overflow-hidden rounded-3xl bg-white shadow-lg"
            >
              <div className="h-64 bg-gray-200" />

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {trek}
                </h3>

                <button className="mt-4 text-green-700">
                  View Details →
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}