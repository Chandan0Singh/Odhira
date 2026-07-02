const Home = require("../models/Home");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Lookbook = require("../models/Lookbook");

const getHomePage = async (req, res) => {
  try {
    const home = await Home.findOne();

    const [
      categories,
      newArrivals,
      bestSellers,
      lookbook,
    ] = await Promise.all([
      Category.find({
        status: "Active",
        isFeatured: true,
      }).sort({ sortOrder: 1 }),

      Product.find({
        status: "Active",
        isNewArrival: true,
      })
        .populate("category", "name slug")
        .limit(8),

      Product.find({
        status: "Active",
        isBestSeller: true,
      })
        .populate("category", "name slug")
        .limit(8),

      Lookbook.find({
        status: "Active",
      }).limit(6),
    ]);

    res.status(200).json({
      success: true,
      home,
      categories,
      newArrivals,
      bestSellers,
      lookbook,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const createHomePage = async (req, res) => {
  try {
    const alreadyExists = await Home.findOne();

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Home page already exists",
      });
    }

    const home = await Home.create(req.body);

    res.status(201).json({
      success: true,
      data: home,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateHomePage = async (req, res) => {
  try {
    const home = await Home.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!home) {
      return res.status(404).json({
        success: false,
        message: "Home page not found",
      });
    }

    res.status(200).json({
      success: true,
      data: home,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getHomePage,
  createHomePage,
  updateHomePage,
};