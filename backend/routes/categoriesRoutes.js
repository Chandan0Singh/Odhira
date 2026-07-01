const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ─── PUBLIC ───────────────────────────────────────────────────────────────────
router.get("/",     getAllCategories);
router.get("/:id",  getCategoryById);

// ─── ADMIN ONLY ───────────────────────────────────────────────────────────────
router.post("/",       protect, adminOnly, createCategory);
router.put("/:id",     protect, adminOnly, updateCategory);
router.delete("/:id",  protect, adminOnly, deleteCategory);

module.exports = router;