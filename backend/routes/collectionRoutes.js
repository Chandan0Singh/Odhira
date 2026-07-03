
// ============================================================
// routes/collectionRoutes.js
// ============================================================

const express = require("express");
const router = express.Router();
const {

  getMenPage,
  getWomenProducts,
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
  getCollectionProductsBySlug,
  getAllCollections,
  getCollectionById,
  getCollectionBySlug,
  createCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");
const { protect, adminOnly } = require("../middleware/authMiddleware");


router.get("/men",          getMenPage);
router.get("/women",        getWomenProducts);
router.get("/kids",         getKidsPage);
router.get("/teen",         getTeenPage);
router.get("/elder",        getElderPage);
router.get("/unisex",       getUnisexPage);
router.get("/accessories",  getAccessoriesPage);
 
// ─── Collection-based ─────────────────────────────────────────────────────────
router.get("/new-arrivals",    getNewArrivalsPage);
router.get("/sale",            getSalePage);
router.get("/best-sellers",    getBestSellersPage);
router.get("/limited-edition", getLimitedEditionPage);
router.get("/trending",        getTrendingPage);
 
// ─── Flag-based ───────────────────────────────────────────────────────────────
router.get("/featured", getFeaturedPage);

// PUBLIC
router.get("/",              getAllCollections);
router.get("/slug/:slug",    getCollectionBySlug);
router.get("/:id",           getCollectionById);
router.get("/page/:slug", getCollectionProductsBySlug);

// ADMIN
router.post("/",             protect, adminOnly, createCollection);
router.put("/:id",           protect, adminOnly, updateCollection);
router.delete("/:id",        protect, adminOnly, deleteCollection);

module.exports = router;

