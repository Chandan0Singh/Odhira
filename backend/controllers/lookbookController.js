const Lookbook = require("../models/Lookbook");

// Get all looks
const getLookbook = async (req, res) => {
  try {
    const looks = await Lookbook.find({
      status: "Active",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: looks.length,
      data: looks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get single look
const getLookBySlug = async (req, res) => {
  try {
    const look = await Lookbook.findOne({
      slug: req.params.slug,
      status: "Active",
    });

    if (!look) {
      return res.status(404).json({
        success: false,
        message: "Look not found",
      });
    }

    res.status(200).json({
      success: true,
      data: look,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getLookbook,
  getLookBySlug,
};