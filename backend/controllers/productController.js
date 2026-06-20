// controllers/productController.js
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log("all product :", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

const getProductsByGender = async (req, res) => {
  try {
    const products = await Product.find({ gender: req.params.gender });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getSaleProducts = async (req, res) => {
  try {
    const products = await Product.find({
      sale: { $exists: true, $ne: null },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getExploreData = async (req, res) => {
  try {
    const products = await Product.find({});
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
      if (added) {
        exploreData.all.push(product);
      }
    }

    res.json(exploreData);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getNewArrivals = async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const newProducts = await Product.find({
      arrivalDate: {
        $gte: thirtyDaysAgo.toISOString(), // ISO date string
      },
    });

    res.json(newProducts);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
};

// ✅ Update Product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

// ✅ Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

module.exports = {
  getAllProducts,
  getProductsByGender,
  getSaleProducts,
  getExploreData,
  getNewArrivals,
  getProductById,

  createProduct,
  updateProduct,
  deleteProduct,
};
