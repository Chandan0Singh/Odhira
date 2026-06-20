export default function ContactPage() {
  return (
    <main className="bg-[#F8F5EE]">

      {/* Hero Section */}
      <section className="py-24 border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[5px] text-[#6B7280] mb-4">
            Get In Touch
          </p>

          <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl text-[#4B5A43] mb-6">
            Contact Us
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            We'd love to hear from you. Whether you have a question
            about products, orders, collaborations, or anything else,
            our team is ready to help.
          </p>

        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16">

            {/* Left */}
            <div>

              <p className="uppercase tracking-[4px] text-[#C5A46D] mb-4">
                Reach Us
              </p>

              <h2 className="font-[var(--font-playfair)] text-5xl text-[#4B5A43] mb-8">
                Let's Start A Conversation
              </h2>

              <div className="space-y-8">

                <div>
                  <h3 className="text-xl font-semibold text-[#4B5A43] mb-2">
                    Email
                  </h3>
                  <p className="text-gray-600">
                    support@odhira.com
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#4B5A43] mb-2">
                    Phone
                  </h3>
                  <p className="text-gray-600">
                    +91 98765 43210
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#4B5A43] mb-2">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    Odhira Fashion House,
                    <br />
                    New Delhi, India
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#4B5A43] mb-2">
                    Customer Support
                  </h3>
                  <p className="text-gray-600">
                    Monday - Saturday
                    <br />
                    10:00 AM - 7:00 PM
                  </p>
                </div>

              </div>

            </div>

            {/* Right Form */}
            <div className="bg-white border border-[#E5E0D8] p-8 md:p-10">

              <h3 className="font-[var(--font-playfair)] text-3xl text-[#4B5A43] mb-8">
                Send A Message
              </h3>

              <form className="space-y-6">

                <div>
                  <label className="block mb-2 text-sm uppercase tracking-wider text-gray-600">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-[#E5E0D8] px-4 py-3 outline-none focus:border-[#A8B2A1]"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm uppercase tracking-wider text-gray-600">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-[#E5E0D8] px-4 py-3 outline-none focus:border-[#A8B2A1]"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm uppercase tracking-wider text-gray-600">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full border border-[#E5E0D8] px-4 py-3 outline-none focus:border-[#A8B2A1]"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm uppercase tracking-wider text-gray-600">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full border border-[#E5E0D8] px-4 py-3 outline-none resize-none focus:border-[#A8B2A1]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#4B5A43] hover:bg-[#C5A46D] transition-all duration-300 text-white px-10 py-4 uppercase tracking-widest"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-[#4B5A43] text-white p-16 text-center">

            <p className="uppercase tracking-[4px] text-[#C5A46D] mb-4">
              Visit Our Studio
            </p>

            <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl mb-4">
              Odhira Fashion House
            </h2>

            <p className="text-gray-200">
              New Delhi, India
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}