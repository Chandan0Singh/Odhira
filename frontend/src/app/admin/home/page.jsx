"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const emptyForm = {
  hero: {
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    images: [],
  },
  brandStory: {
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    image: "",
  },
  instagram: [],
  newsletter: {
    title: "",
    description: "",
  },
};

export default function AdminHomePage() {
  const [form, setForm] = useState(emptyForm);
  const [homeId, setHomeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text }

  useEffect(() => {
    fetchHome();
  }, []);

  async function fetchHome() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/home`, { cache: "no-store" });
      const data = await res.json();

      if (data?.home) {
        setHomeId(data.home._id);
        setForm({
          hero: {
            title: data.home.hero?.title || "",
            subtitle: data.home.hero?.subtitle || "",
            buttonText: data.home.hero?.buttonText || "",
            buttonLink: data.home.hero?.buttonLink || "",
            images: data.home.hero?.images?.length
              ? data.home.hero.images
              : [],
          },
          brandStory: {
            title: data.home.brandStory?.title || "",
            description: data.home.brandStory?.description || "",
            buttonText: data.home.brandStory?.buttonText || "",
            buttonLink: data.home.brandStory?.buttonLink || "",
            image: data.home.brandStory?.image || "",
          },
          instagram: data.home.instagram || [],
          newsletter: {
            title: data.home.newsletter?.title || "",
            description: data.home.newsletter?.description || "",
          },
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to load home content." });
    } finally {
      setLoading(false);
    }
  }

  // ---------- generic field helpers ----------

  function updateField(section, field, value) {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }

  // ---------- hero images ----------

  function addHeroImage() {
    setForm((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        images: [...prev.hero.images, { image: "", alt: "" }],
      },
    }));
  }

  function updateHeroImage(index, field, value) {
    setForm((prev) => {
      const images = [...prev.hero.images];
      images[index] = { ...images[index], [field]: value };
      return { ...prev, hero: { ...prev.hero, images } };
    });
  }

  function removeHeroImage(index) {
    setForm((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        images: prev.hero.images.filter((_, i) => i !== index),
      },
    }));
  }

  // ---------- instagram posts ----------

  function addInstagramPost() {
    setForm((prev) => ({
      ...prev,
      instagram: [...prev.instagram, { image: "", link: "" }],
    }));
  }

  function updateInstagramPost(index, field, value) {
    setForm((prev) => {
      const instagram = [...prev.instagram];
      instagram[index] = { ...instagram[index], [field]: value };
      return { ...prev, instagram };
    });
  }

  function removeInstagramPost(index) {
    setForm((prev) => ({
      ...prev,
      instagram: prev.instagram.filter((_, i) => i !== index),
    }));
  }

  // ---------- submit ----------

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const url = homeId
        ? `${API_BASE}/api/home/${homeId}`
        : `${API_BASE}/api/home`;
      const method = homeId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Save failed");
      }

      if (!homeId && data.data?._id) {
        setHomeId(data.data._id);
      }

      setMessage({ type: "success", text: "Home page updated successfully." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading home page content…
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-serif text-[#4B5A43] mb-8">
        Home Page Settings
      </h1>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* HERO */}
        <section className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-medium text-[#4B5A43] mb-4">Hero</h2>

          <div className="grid gap-4">
            <Field
              label="Title"
              value={form.hero.title}
              onChange={(v) => updateField("hero", "title", v)}
            />
            <Field
              label="Subtitle"
              value={form.hero.subtitle}
              onChange={(v) => updateField("hero", "subtitle", v)}
              textarea
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Button Text"
                value={form.hero.buttonText}
                onChange={(v) => updateField("hero", "buttonText", v)}
              />
              <Field
                label="Button Link"
                value={form.hero.buttonLink}
                onChange={(v) => updateField("hero", "buttonLink", v)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Hero Images
                </label>
                <button
                  type="button"
                  onClick={addHeroImage}
                  className="text-sm text-[#4B5A43] underline"
                >
                  + Add image
                </button>
              </div>

              <div className="space-y-3">
                {form.hero.images.map((img, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start border border-gray-100 p-3 rounded"
                  >
                    {img.image && (
                      <img
                        src={img.image}
                        alt={img.alt}
                        className="h-16 w-16 object-cover rounded flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 grid gap-2">
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={img.image}
                        onChange={(e) =>
                          updateHeroImage(i, "image", e.target.value)
                        }
                        className="border border-gray-300 px-3 py-2 text-sm w-full"
                      />
                      <input
                        type="text"
                        placeholder="Alt text"
                        value={img.alt}
                        onChange={(e) =>
                          updateHeroImage(i, "alt", e.target.value)
                        }
                        className="border border-gray-300 px-3 py-2 text-sm w-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHeroImage(i)}
                      className="text-red-500 text-sm px-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {form.hero.images.length === 0 && (
                  <p className="text-sm text-gray-400">No hero images yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* BRAND STORY */}
        <section className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-medium text-[#4B5A43] mb-4">
            Brand Story
          </h2>

          <div className="grid gap-4">
            <Field
              label="Title"
              value={form.brandStory.title}
              onChange={(v) => updateField("brandStory", "title", v)}
            />
            <Field
              label="Description"
              value={form.brandStory.description}
              onChange={(v) => updateField("brandStory", "description", v)}
              textarea
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Button Text"
                value={form.brandStory.buttonText}
                onChange={(v) => updateField("brandStory", "buttonText", v)}
              />
              <Field
                label="Button Link"
                value={form.brandStory.buttonLink}
                onChange={(v) => updateField("brandStory", "buttonLink", v)}
              />
            </div>
            <Field
              label="Image URL"
              value={form.brandStory.image}
              onChange={(v) => updateField("brandStory", "image", v)}
            />
            {form.brandStory.image && (
              <img
                src={form.brandStory.image}
                alt="Brand story preview"
                className="h-40 w-40 object-cover rounded"
              />
            )}
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-[#4B5A43]">
              Instagram Feed
            </h2>
            <button
              type="button"
              onClick={addInstagramPost}
              className="text-sm text-[#4B5A43] underline"
            >
              + Add post
            </button>
          </div>

          <div className="space-y-3">
            {form.instagram.map((post, i) => (
              <div
                key={i}
                className="flex gap-3 items-start border border-gray-100 p-3 rounded"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt="Instagram preview"
                    className="h-16 w-16 object-cover rounded flex-shrink-0"
                  />
                )}
                <div className="flex-1 grid gap-2">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={post.image}
                    onChange={(e) =>
                      updateInstagramPost(i, "image", e.target.value)
                    }
                    className="border border-gray-300 px-3 py-2 text-sm w-full"
                  />
                  <input
                    type="text"
                    placeholder="Post link"
                    value={post.link}
                    onChange={(e) =>
                      updateInstagramPost(i, "link", e.target.value)
                    }
                    className="border border-gray-300 px-3 py-2 text-sm w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeInstagramPost(i)}
                  className="text-red-500 text-sm px-2"
                >
                  Remove
                </button>
              </div>
            ))}

            {form.instagram.length === 0 && (
              <p className="text-sm text-gray-400">No Instagram posts yet.</p>
            )}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-medium text-[#4B5A43] mb-4">
            Newsletter
          </h2>

          <div className="grid gap-4">
            <Field
              label="Title"
              value={form.newsletter.title}
              onChange={(v) => updateField("newsletter", "title", v)}
            />
            <Field
              label="Description"
              value={form.newsletter.description}
              onChange={(v) => updateField("newsletter", "description", v)}
              textarea
            />
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#4B5A43] text-white px-8 py-3 uppercase tracking-widest text-sm disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, textarea = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="border border-gray-300 px-3 py-2 text-sm w-full"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-sm w-full"
        />
      )}
    </div>
  );
}