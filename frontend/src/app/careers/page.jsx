"use client";

import Link from "next/link";
import {
  Briefcase,
  Heart,
  Users,
  Sparkles,
  ArrowRight,
  Mail,
} from "lucide-react";

const openings = [
  {
    title: "Fashion Designer",
    department: "Design",
    location: "Gurugram, India",
    type: "Full Time",
    description:
      "Create contemporary fashion pieces that reflect Odhira's timeless and elegant design philosophy.",
  },
  {
    title: "Social Media Executive",
    department: "Marketing",
    location: "Gurugram, India",
    type: "Full Time",
    description:
      "Build and manage engaging social media campaigns that tell the Odhira story.",
  },
  {
    title: "Customer Experience Executive",
    department: "Customer Experience",
    location: "Gurugram, India",
    type: "Full Time",
    description:
      "Deliver thoughtful and personalized experiences to every Odhira customer.",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Creativity",
    text: "We believe great ideas come from curiosity, experimentation and an appreciation for beautiful details.",
  },
  {
    icon: Heart,
    title: "Passion",
    text: "Everything we create is driven by genuine passion for fashion, craftsmanship and our customers.",
  },
  {
    icon: Users,
    title: "Together",
    text: "We work as one team, celebrate different perspectives and grow by learning from each other.",
  },
  {
    icon: Briefcase,
    title: "Excellence",
    text: "From the smallest detail to the final experience, we always strive to do our best.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE]">

      {/* HERO */}
      <section className="relative h-[420px] md:h-[560px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1800&q=85"
          alt="Careers at Odhira"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <p className="uppercase tracking-[5px] text-xs md:text-sm mb-5">
            Join Our Journey
          </p>

          <h1
            className="text-5xl md:text-7xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Careers
          </h1>

          <p className="mt-6 max-w-2xl text-white/85 leading-relaxed">
            Be part of a creative team shaping the future of contemporary
            fashion with timeless elegance.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          <div>
            <p className="uppercase tracking-[4px] text-xs text-[#5E6B58] mb-4">
              Work With Us
            </p>

            <h2
              className="text-4xl md:text-5xl text-[#2D2D2D] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Create Something
              <br />
              Beautiful Together
            </h2>
          </div>

          <div className="text-[#666] leading-8">
            <p>
              At Odhira, we believe fashion is more than what you wear.
              It is about confidence, individuality and the stories we tell.
            </p>

            <p className="mt-5">
              We're always looking for passionate, curious and creative people
              who want to contribute to a growing fashion brand and make an
              impact through their work.
            </p>
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#EFE8DE] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <p className="uppercase tracking-[4px] text-xs text-[#5E6B58] mb-4">
              Our Culture
            </p>

            <h2
              className="text-4xl md:text-5xl text-[#2D2D2D]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What We Value
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="bg-white p-8 text-center border border-[#E4E0D8]"
                >
                  <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#F8F5EE] text-[#5E6B58]">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  <h3
                    className="mt-6 text-2xl text-[#2D2D2D]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm text-[#777] leading-6">
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">

        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-xs text-[#5E6B58] mb-4">
            Opportunities
          </p>

          <h2
            className="text-4xl md:text-5xl text-[#2D2D2D]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Open Positions
          </h2>

          <p className="mt-4 text-[#777] max-w-xl mx-auto">
            Explore opportunities to become part of the Odhira team.
          </p>
        </div>

        <div className="space-y-5">
          {openings.map((job) => (
            <div
              key={job.title}
              className="bg-white border border-[#E4E0D8] p-6 md:p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-[#F8F5EE] text-[#5E6B58]">
                  <Briefcase size={24} strokeWidth={1.5} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className="text-2xl text-[#2D2D2D]"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {job.title}
                    </h3>

                    <span className="px-3 py-1 bg-[#EFE8DE] text-[#5E6B58] text-[10px] uppercase tracking-[1.5px]">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-xs text-[#888] uppercase tracking-[1px]">
                    <span>{job.department}</span>
                    <span>{job.location}</span>
                  </div>

                  <p className="mt-4 text-sm text-[#777] leading-6 max-w-2xl">
                    {job.description}
                  </p>
                </div>

                <a
                  href={`mailto:careers@odhira.com?subject=Application for ${job.title}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#5E6B58] text-[#5E6B58] uppercase tracking-[2px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition"
                >
                  Apply Now
                  <ArrowRight size={15} />
                </a>

              </div>
            </div>
          ))}
        </div>

      </section>

      {/* DON'T SEE A ROLE */}
      <section className="bg-[#5E6B58] py-20 md:py-24 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">

          <Mail
            size={40}
            strokeWidth={1.3}
            className="mx-auto mb-6"
          />

          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Don't See Your Role?
          </h2>

          <p className="mt-5 text-white/75 leading-7">
            We're always interested in meeting talented people. Send us your
            resume and tell us how you could contribute to Odhira.
          </p>

          <a
            href="mailto:careers@odhira.com?subject=General Career Application"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-[#5E6B58] uppercase tracking-[2px] text-xs font-semibold hover:bg-[#F8F5EE] transition"
          >
            Send Your Resume
            <ArrowRight size={16} />
          </a>

        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-[#EFE8DE] py-12 text-center">
        <p className="text-[#777] text-sm">
          Looking for something else?
        </p>

        <Link
          href="/contact"
          className="inline-block mt-3 text-[#5E6B58] uppercase tracking-[2px] text-xs font-semibold border-b border-[#5E6B58] pb-1"
        >
          Contact Us
        </Link>
      </section>

    </div>
  );
}