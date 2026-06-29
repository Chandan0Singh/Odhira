// ============================================================
// controllers/collectionController.js
// ============================================================

const Product    = require("../models/Product");
const Category   = require("../models/Category");
const Collection = require("../models/Collection");
 
// ─── Helpers ─────────────────────────────────────────────────────────────────
 
const SORT_MAP = {
  price_asc:  { price: 1 },
  price_desc: { price: -1 },
  newest:     { createdAt: -1 },
  popular:    { sold: -1 },
};
 
function buildPagination(query) {
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(50, parseInt(query.limit) || 20);
  const skip  = (page - 1) * limit;
  const sort  = SORT_MAP[query.sort] || { createdAt: -1 };
  return { page, limit, skip, sort };
}
 
function buildPriceFilter(query) {
  const filter = {};
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  return filter;
}
 
async function paginateProducts(filter, { page, limit, skip, sort }) {
  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .populate("category",   "name slug")
      .populate("collection", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit),
  ]);
  return { total, products, page, pages: Math.ceil(total / limit) };
}
 
// ─── CATEGORY-BASED pages (men / women / kids / teen / elder / unisex) ───────
 
async function getCategoryPage(categorySlug, meta, req, res) {
  try {
    const category = await Category.findOne({ slug: categorySlug, status: "Active" });
    if (!category) {
      return res.status(404).json({ message: `Category "${categorySlug}" not found` });
    }
 
    const { page, limit, skip, sort } = buildPagination(req.query);
    const priceFilter = buildPriceFilter(req.query);
 
    const filter = {
      category:  category._id,
      status:    "Active",
      ...priceFilter,
    };
 
    const result = await paginateProducts(filter, { page, limit, skip, sort });
 
    res.json({
      pageTitle:       meta.title       || category.name,
      pageDescription: meta.description || category.description || "",
      categoryId:      category._id,
      categorySlug:    category.slug,
      filters: {
        sort:     req.query.sort || "newest",
        minPrice: req.query.minPrice || null,
        maxPrice: req.query.maxPrice || null,
      },
      ...result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}
 
// ─── COLLECTION-BASED pages (new-arrivals / sale / best-sellers / trending) ──
 
async function getCollectionPage(collectionSlug, meta, req, res) {
  try {
    const collection = await Collection.findOne({ slug: collectionSlug, status: "Active" });
    if (!collection) {
      return res.status(404).json({ message: `Collection "${collectionSlug}" not found` });
    }
 
    const { page, limit, skip, sort } = buildPagination(req.query);
    const priceFilter = buildPriceFilter(req.query);
 
    const filter = {
      collection: collection._id,
      status:     "Active",
      ...priceFilter,
    };
 
    const result = await paginateProducts(filter, { page, limit, skip, sort });
 
    res.json({
      pageTitle:        meta.title       || collection.name,
      pageDescription:  meta.description || collection.description || "",
      collectionId:     collection._id,
      collectionSlug:   collection.slug,
      banner:           collection.banner || null,
      filters: {
        sort:     req.query.sort || "newest",
        minPrice: req.query.minPrice || null,
        maxPrice: req.query.maxPrice || null,
      },
      ...result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}
 
// ─── FLAG-BASED pages (isSale / isNewArrival / isBestSeller / isFeatured) ────
 
async function getFlagPage(flagKey, meta, req, res) {
  try {
    const { page, limit, skip, sort } = buildPagination(req.query);
    const priceFilter = buildPriceFilter(req.query);
 
    const filter = {
      [flagKey]: true,
      status:    "Active",
      ...priceFilter,
    };
 
    const result = await paginateProducts(filter, { page, limit, skip, sort });
 
    res.json({
      pageTitle:       meta.title,
      pageDescription: meta.description || "",
      filters: {
        sort:     req.query.sort || "newest",
        minPrice: req.query.minPrice || null,
        maxPrice: req.query.maxPrice || null,
      },
      ...result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}
 
// ─── EXPORTED HANDLERS ───────────────────────────────────────────────────────
 
// Category pages
const getMenPage = (req, res) =>
  getCategoryPage("men-bags", {
    title:       "Men's Bags",
    description: "Laptop bags, messenger bags, backpacks and duffels for men.",
  }, req, res);
 
const getWomenPage = (req, res) =>
  getCategoryPage("women-bags", {
    title:       "Women's Bags",
    description: "Stylish totes, clutches, satchels and handbags for women.",
  }, req, res);
 
const getKidsPage = (req, res) =>
  getCategoryPage("kids-bags", {
    title:       "Kids' Bags",
    description: "Fun, colourful bags designed for children.",
  }, req, res);
 
const getTeenPage = (req, res) =>
  getCategoryPage("teen-bags", {
    title:       "Teen Bags",
    description: "Trendy backpacks, slings and totes for teenagers.",
  }, req, res);
 
const getElderPage = (req, res) =>
  getCategoryPage("elder-bags", {
    title:       "Elder Bags",
    description: "Classic, comfortable bags suited for mature users.",
  }, req, res);
 
const getUnisexPage = (req, res) =>
  getCategoryPage("unisex-bags", {
    title:       "Unisex Bags",
    description: "Gender-neutral bags for everyday use.",
  }, req, res);
 
// Accessories = alias for unisex (adjust slug if you add a dedicated category)
const getAccessoriesPage = (req, res) =>
  getCategoryPage("unisex-bags", {
    title:       "Accessories",
    description: "Complete your look with our premium bag accessories.",
  }, req, res);
 
// Collection pages (DB-driven)
const getNewArrivalsPage = (req, res) =>
  getCollectionPage("new-arrivals", {
    title:       "New Arrivals",
    description: "Fresh styles added to the store.",
  }, req, res);
 
const getSalePage = (req, res) =>
  getCollectionPage("sale", {
    title:       "Sale",
    description: "Special discounts — limited time only.",
  }, req, res);
 
const getBestSellersPage = (req, res) =>
  getCollectionPage("best-sellers", {
    title:       "Best Sellers",
    description: "Our most-loved bags chosen by customers.",
  }, req, res);
 
const getLimitedEditionPage = (req, res) =>
  getCollectionPage("limited-edition", {
    title:       "Limited Edition",
    description: "Exclusive designs available in small quantities.",
  }, req, res);
 
const getTrendingPage = (req, res) =>
  getCollectionPage("trending-now", {
    title:       "Trending Now",
    description: "What people are buying right now.",
  }, req, res);
 
// Flag-based pages (direct boolean flag on product)
const getFeaturedPage = (req, res) =>
  getFlagPage("isFeatured", {
    title:       "Featured",
    description: "Hand-picked favourites from our catalogue.",
  }, req, res);

// GET /api/collections  — all active collections
const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ status: "Active" }).sort({ name: 1 });
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET /api/collections/:id  — single collection by ID
const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json(collection);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET /api/collections/slug/:slug  — single collection by slug
const getCollectionBySlug = async (req, res) => {
  try {
    const collection = await Collection.findOne({ slug: req.params.slug });
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json(collection);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// POST /api/collections  — create (admin)
const createCollection = async (req, res) => {
  try {
    const { name, description, banner, status } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const collection = new Collection({ name, slug, description, banner, status });
    const saved = await collection.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to create collection", error: err.message });
  }
};

// PUT /api/collections/:id  — update (admin)
const updateCollection = async (req, res) => {
  try {
    const updated = await Collection.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Collection not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update collection", error: err.message });
  }
};

// DELETE /api/collections/:id  — delete (admin)
const deleteCollection = async (req, res) => {
  try {
    const deleted = await Collection.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Collection not found" });
    res.json({ message: "Collection deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete collection", error: err.message });
  }
};

module.exports = {

  getMenPage,
  getWomenPage,
  getKidsPage,
  getTeenPage,
  getElderPage,
  getUnisexPage,
  getAccessoriesPage,
  getNewArrivalsPage,
  getSalePage,
  getBestSellersPage,
  getLimitedEditionPage,
  getTrendingPage,
  getFeaturedPage,

  getAllCollections,
  getCollectionById,
  getCollectionBySlug,
  createCollection,
  updateCollection,
  deleteCollection,
};



// ============================================================
// In your app.js / server.js — add this line:
// ============================================================
/*

*/