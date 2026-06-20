"use client"
import { useState } from "react";
import { ArrowRight, Clock, Tag } from "lucide-react";

/* ── Mock Data ──────────────────────────────────────────────── */
const CATEGORIES = ["All", "Style Notes", "Craft & Making", "Sustainable Living", "Behind the Brand", "Lookbook"];

const FEATURED = {
  id: 0,
  category: "Style Notes",
  title: "The Art of Dressing for the In-Between Seasons",
  excerpt:
    "Neither the full warmth of summer nor the cold certainty of winter — the in-between months demand a wardrobe that moves with you. We explore how to dress with intention when the weather refuses to commit.",
  author: "Priya Mehra",
  date: "June 14, 2026",
  readTime: "6 min read",
  image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
};

const POSTS = [
  {
    id: 1,
    category: "Craft & Making",
    title: "Hand-Block Printing: The 600-Year-Old Craft Behind Our Autumn Collection",
    excerpt: "Each metre of fabric passes through at least forty hands before it reaches you. We visited the artisans of Bagru to understand why that number matters.",
    author: "Ananya Singh",
    date: "June 10, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: 2,
    category: "Sustainable Living",
    title: "A Wardrobe of 30: What We Learned from the Slow Fashion Movement",
    excerpt: "Buying less but choosing better is a philosophy, not a trend. Here is how a curated wardrobe of thirty pieces can outlast a rotating wardrobe of three hundred.",
    author: "Rhea Kapoor",
    date: "June 5, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80",
  },
  {
    id: 3,
    category: "Behind the Brand",
    title: "On Starting Over: Why We Redesigned Our Packaging From Scratch",
    excerpt: "The box your order arrives in is the first physical thing you touch. We spent eight months making sure it felt like the beginning of something, not the end of a transaction.",
    author: "Priya Mehra",
    date: "May 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1553531087-b25f560be9a8?w=800&q=80",
  },
  {
    id: 4,
    category: "Lookbook",
    title: "Sage & Stone: Styling Our New Linen Edit for Warm Evenings",
    excerpt: "Linen that breathes, colours that settle into the light. Our editorial team spent a week in Pondicherry shooting the edit we've been working toward all year.",
    author: "Kavya Reddy",
    date: "May 20, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  },
  {
    id: 5,
    category: "Style Notes",
    title: "The Only Three Silhouettes You Need to Know This Season",
    excerpt: "Trend reports have a tendency to overwhelm. We've distilled this season down to three silhouettes — and why each of them is worth understanding.",
    author: "Ananya Singh",
    date: "May 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=800&q=80",
  },
  {
    id: 6,
    category: "Craft & Making",
    title: "Natural Dyes, Natural Imperfections: Embracing What the Indigo Gives",
    excerpt: "No two indigo-dyed pieces are identical. That used to be considered a flaw. We think it's the point.",
    author: "Rhea Kapoor",
    date: "May 6, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
  },
];

/* ── Sub-components ─────────────────────────────────────────── */
function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 text-[11px] uppercase tracking-[2px] font-semibold border transition-all duration-200 ${
        active
          ? "bg-[#5E6B58] border-[#5E6B58] text-[#F8F5EE]"
          : "bg-transparent border-[#D5CFC6] text-[#666666] hover:border-[#5E6B58] hover:text-[#5E6B58]"
      }`}
    >
      {label}
    </button>
  );
}

function PostCard({ post }) {
  return (
    <article className="group flex flex-col bg-white border border-[#E4E0D8] overflow-hidden hover:shadow-[0_8px_32px_rgba(94,107,88,0.12)] transition-all duration-300">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-[#E4E0D8]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category + read time */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[2.5px] font-semibold text-[#A8B2A1]">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#999] font-medium">
            <Clock size={11} strokeWidth={1.5} />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[17px] leading-snug text-[#2D2D2D] mb-3 group-hover:text-[#5E6B58] transition-colors duration-200"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[13px] text-[#777] leading-relaxed flex-1 mb-5">
          {post.excerpt}
        </p>

        {/* Author + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[#F0ECE6]">
          <div>
            <p className="text-[11px] text-[#999]">By</p>
            <p className="text-[12px] font-semibold text-[#5E6B58] tracking-wide">{post.author}</p>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-[2px] font-semibold
                       text-[#5E6B58] hover:gap-3 transition-all duration-200"
          >
            Read <ArrowRight size={12} strokeWidth={2} />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#F8F5EE] min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── Page Header ──────────────────────────────────────── */}
      <section className="pt-16 pb-12 text-center border-b border-[#E4E0D8]">
        <p className="text-[10px] uppercase tracking-[4px] text-[#A8B2A1] font-semibold mb-4">
          Stories & Ideas
        </p>
        <h1
          className="text-[48px] leading-tight text-[#5E6B58] mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}
        >
          The Journal
        </h1>
        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className="w-16 h-px bg-[#A8B2A1]" />
          <span className="text-[#A8B2A1] text-base">✦</span>
          <span className="w-16 h-px bg-[#A8B2A1]" />
        </div>
      </section>

      {/* ── Featured Post ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-12">
        <article className="grid md:grid-cols-2 gap-0 bg-white border border-[#E4E0D8] overflow-hidden group hover:shadow-[0_12px_48px_rgba(94,107,88,0.12)] transition-shadow duration-400">
          {/* Image */}
          <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-[#E4E0D8]">
            <img
              src={FEATURED.image}
              alt={FEATURED.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-10 lg:p-14">
            <span className="text-[10px] uppercase tracking-[3px] font-semibold text-[#A8B2A1] mb-2">
              Featured · {FEATURED.category}
            </span>
            <h2
              className="text-[32px] leading-tight text-[#2D2D2D] mb-5 group-hover:text-[#5E6B58] transition-colors duration-200"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}
            >
              {FEATURED.title}
            </h2>
            <p className="text-[14px] text-[#777] leading-relaxed mb-8">
              {FEATURED.excerpt}
            </p>

            <div className="flex items-center gap-6 pt-6 border-t border-[#F0ECE6]">
              <div>
                <p className="text-[11px] text-[#999]">By {FEATURED.author}</p>
                <p className="text-[11px] text-[#bbb] mt-0.5">{FEATURED.date} · {FEATURED.readTime}</p>
              </div>
              <a
                href="#"
                className="ml-auto inline-flex items-center gap-2 px-6 py-3
                           bg-[#5E6B58] text-[#F8F5EE] text-[11px] uppercase tracking-[2px] font-semibold
                           hover:bg-[#4a5546] transition-colors duration-200"
              >
                Read Story <ArrowRight size={13} strokeWidth={2} />
              </a>
            </div>
          </div>
        </article>
      </section>

      {/* ── Category Filter ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 pb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </section>

      {/* ── Post Grid ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#A8B2A1]">
            <p className="text-[13px] tracking-wide">No stories in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Load More */}
        {filtered.length > 0 && (
          <div className="text-center mt-14">
            <button
              className="px-10 py-3 border border-[#5E6B58] text-[#5E6B58] text-[11px]
                         uppercase tracking-[3px] font-semibold hover:bg-[#5E6B58] hover:text-[#F8F5EE]
                         transition-all duration-200"
            >
              Load More Stories
            </button>
          </div>
        )}
      </section>

      {/* ── Newsletter Strip ──────────────────────────────────── */}
      <section className="bg-[#5E6B58]">
        <div className="max-w-2xl mx-auto px-8 py-16 text-center">
          <p className="text-[10px] uppercase tracking-[4px] text-[#A8B2A1] font-semibold mb-4">
            Stay in the Loop
          </p>
          <h2
            className="text-[28px] text-[#F8F5EE] mb-3 leading-snug"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
          >
            Stories, straight to your inbox
          </h2>
          <p className="text-[13px] text-[#c8cfc5] mb-8 leading-relaxed">
            New journal entries, behind-the-scenes dispatches and early access to collections — once a fortnight, no more.
          </p>
          <div className="flex border border-[#A8B2A1]/50 overflow-hidden max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-12 px-4 bg-transparent text-[#F8F5EE] text-sm
                         placeholder-[#A8B2A1] outline-none"
            />
            <button
              className="px-6 h-12 bg-[#A8B2A1] text-[#5E6B58] text-[11px] uppercase
                         tracking-[2px] font-bold hover:bg-[#F8F5EE] transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}