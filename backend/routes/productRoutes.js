/*
 * ╔══════════════════════════════════════════════════════════════╗
 * ║               PRODUCT API ROUTES — /api/products            ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  PUBLIC                                                      ║
 * ║  GET    /                        All products (filter+sort)  ║
 * ║  GET    /search?q=               Search by title/tags/fabric ║
 * ║  GET    /featured                Featured products           ║
 * ║  GET    /sale                    Products on sale            ║
 * ║  GET    /new-arrivals            New arrival products        ║
 * ║  GET    /best-sellers            Best selling products       ║
 * ║  GET    /explore                 Products grouped by tags    ║
 * ║  GET    /collection/:id          Products by collection ID   ║
 * ║  GET    /category/:id            Products by category ID     ║
 * ║  GET    /slug/:slug              Single product by slug      ║
 * ║  GET    /:id                     Single product by ID        ║
 * ║  PATCH  /:id/view                Increment product views     ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  PROTECTED (user must be logged in)                          ║
 * ║  POST   /:id/reviews             Add a review               ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  ADMIN ONLY                                                  ║
 * ║  POST   /add                     Create new product          ║
 * ║  PUT    /:id                     Update product              ║
 * ║  DELETE /:id                     Delete product              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ─── PUBLIC ───────────────────────────────────────────────────────────────────
router.get("/",                      getAllProducts);
router.get("/search",                searchProducts);
router.get("/featured",              getFeaturedProducts);
router.get("/sale",                  getSaleProducts);
router.get("/new-arrivals",          getNewArrivals);
router.get("/best-sellers",          getBestSellers);
router.get("/explore",               getExploreData);
router.get("/collection/:collectionId", getProductsByCollection);
router.get("/category/:categoryId",  getProductsByCategory);
router.get("/slug/:slug",            getProductBySlug);
router.get("/:id",                   getProductById);
router.patch("/:id/view",            incrementViews);

// ─── PROTECTED (logged in users) ──────────────────────────────────────────────
router.post("/:id/reviews",          protect, addReview);

// ─── ADMIN ONLY ───────────────────────────────────────────────────────────────
router.post("/add",                  protect, adminOnly, createProduct);
router.put("/:id",                   protect, adminOnly, updateProduct);
router.delete("/:id",                protect, adminOnly, deleteProduct);

module.exports = router;