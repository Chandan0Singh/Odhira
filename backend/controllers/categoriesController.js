const Category = require("../models/Category");
const slugify = require("slugify");

// ─── GET ALL CATEGORIES ───────────────────────────────────────────────────────
// Supports: ?status=Active&isFeatured=true
const getAllCategories = async (req, res) => {
  try {
    const { status, isFeatured } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (isFeatured) filter.isFeatured = isFeatured === "true";

    const categories = await Category.find(filter).sort({ sortOrder: 1, name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── GET CATEGORY BY ID ───────────────────────────────────────────────────────
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─── CREATE CATEGORY (Admin) ──────────────────────────────────────────────────
const createCategory = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.name) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }

    const category = new Category(data);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to create category", error: err.message });
  }
};

// ─── UPDATE CATEGORY (Admin) ──────────────────────────────────────────────────
const updateCategory = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.name && !data.slug) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }

    const updated = await Category.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update category", error: err.message });
  }
};

// ─── DELETE CATEGORY (Admin) ──────────────────────────────────────────────────
const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category", error: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};