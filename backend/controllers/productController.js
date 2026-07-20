const mongoose = require("mongoose");
const Product = require("../models/Product");
require("../models/Category");
require("../models/Collection");

// ─── GET ALL PRODUCTS ─────────────────────────────────────────────────────────
// Supports filters: ?category=&collection=&status=&isFeatured=&isSale=&isBestSeller=&isNewArrival=
// Supports sort:   ?sort=price_asc | price_desc | newest | popular
// Supports pagination: ?page=1&limit=20
const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      collection,
      status,
      isFeatured,
      isSale,
      isBestSeller,
      isNewArrival,
      sort,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (collection) filter.collection = collection;
    if (status) filter.status = status;
    if (isFeatured) filter.isFeatured = isFeatured === "true";
    if (isSale) filter.isSale = isSale === "true";
    if (isBestSeller) filter.isBestSeller = isBestSeller === "true";
    if (isNewArrival) filter.isNewArrival = isNewArrival === "true";

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      newest: { createdAt: -1 },
      popular: { sold: -1 },
    };
    const sortQuery = sortMap[sort] || { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("collection", "name slug")
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── GET PRODUCT BY SLUG ──────────────────────────────────────────────────────
// const getProductBySlug = async (req, res) => {
//   try {
//     const product = await Product.findOne({ slug: req.params.slug })
//       .populate("category", "name slug")
//       .populate("collection", "name slug")
//       .populate("reviews.user", "name profileImage");

//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category", "name slug")
      .populate("collection", "name slug")
      .populate("reviews.user", "name profileImage");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      status: "Active",
    })
      .populate("category", "name slug")
      .populate("collection", "name slug")
      .limit(8);

    res.status(200).json({
      success: true,
      product,
      relatedProducts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// ─── GET PRODUCT BY ID ────────────────────────────────────────────────────────
const getProductById = async (req, res) => {
  try {

    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id)
      .populate("category", "name slug")
      .populate("collection", "name slug")
      .lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {

    console.log("error :", err)
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── GET SALE PRODUCTS ────────────────────────────────────────────────────────
const getSaleProducts = async (req, res) => {
  try {
    const products = await Product.find({ isSale: true, status: "Active" })
      .populate("category", "name slug")
      .populate("collection", "name slug");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── GET NEW ARRIVALS ─────────────────────────────────────────────────────────
const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({
      isNewArrival: true,
      status: "Active",
    })
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .limit(12);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── GET BEST SELLERS ─────────────────────────────────────────────────────────
const getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({
      isBestSeller: true,
      status: "Active",
    })
      .populate("category", "name slug")
      .sort({ sold: -1 })
      .limit(12);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── GET FEATURED PRODUCTS ────────────────────────────────────────────────────
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, status: "Active" })
      .populate("category", "name slug")
      .populate("collection", "name slug")
      .limit(8);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── GET EXPLORE DATA (by tags) ───────────────────────────────────────────────
const getExploreData = async (req, res) => {
  try {
    const products = await Product.find({ status: "Active" }).populate(
      "category",
      "name slug",
    );

    const tags = ["classic", "premium", "trending", "popular"];
    const exploreData = {
      classic: [],
      premium: [],
      trending: [],
      popular: [],
      all: [],
    };

    for (const product of products) {
      let added = false;
      for (const tag of tags) {
        if (product.tags.includes(tag)) {
          exploreData[tag].push(product);
          added = true;
        }
      }
      if (added) exploreData.all.push(product);
    }

    res.json(exploreData);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── GET PRODUCTS BY COLLECTION ───────────────────────────────────────────────
const getProductsByCollection = async (req, res) => {
  try {
    const products = await Product.find({
      collection: req.params.collectionId,
      status: "Active",
    }).populate("category", "name slug");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── GET PRODUCTS BY CATEGORY ─────────────────────────────────────────────────
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
      status: "Active",
    }).populate("collection", "name slug");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── SEARCH PRODUCTS ──────────────────────────────────────────────────────────
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query is required" });

    const products = await Product.find({
      status: "Active",
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { fabric: { $regex: q, $options: "i" } },
      ],
    }).populate("category", "name slug");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── INCREMENT VIEWS ──────────────────────────────────────────────────────────
const incrementViews = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json({ message: "View counted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── ADD REVIEW ───────────────────────────────────────────────────────────────
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyReviewed = product.reviews.find(
      (r) => r.user?.toString() === req.user._id.toString(),
    );
    if (alreadyReviewed)
      return res.status(400).json({ message: "Already reviewed" });

    product.reviews.push({ user: req.user._id, rating, comment });
    await product.save();
    res.status(201).json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── CREATE PRODUCT (Admin) ───────────────────────────────────────────────────
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: err.message });
  }
};

// ─── UPDATE PRODUCT (Admin) ───────────────────────────────────────────────────
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: err.message });
  }
};

// ─── DELETE PRODUCT (Admin) ───────────────────────────────────────────────────
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  getProductById,
  getSaleProducts,
  getNewArrivals,
  getBestSellers,
  getFeaturedProducts,
  getExploreData,
  getProductsByCollection,
  getProductsByCategory,
  searchProducts,
  incrementViews,
  addReview,
  createProduct,
  updateProduct,
  deleteProduct,
};
