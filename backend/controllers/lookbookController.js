const Lookbook = require("../models/Lookbook");
const fs = require("fs");
const path = require("path");

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* -------------------- USER (PUBLIC) -------------------- */

// Get all active looks
const getLookbook = async (req, res) => {
  try {
    const looks = await Lookbook.find({ status: "Active" }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: looks.length,
      data: looks,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single active look by slug
const getLookBySlug = async (req, res) => {
  try {
    const look = await Lookbook.findOne({
      slug: req.params.slug,
      status: "Active",
    });

    if (!look) {
      return res.status(404).json({ success: false, message: "Look not found" });
    }

    res.status(200).json({ success: true, data: look });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------- ADMIN -------------------- */

// Get all looks (Active + Inactive)
const getAllLooksAdmin = async (req, res) => {
  try {
    const looks = await Lookbook.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: looks.length,
      data: looks,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single look by ID
const getLookByIdAdmin = async (req, res) => {
  try {
    const look = await Lookbook.findById(req.params.id);

    if (!look) {
      return res.status(404).json({ success: false, message: "Look not found" });
    }

    res.status(200).json({ success: true, data: look });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a look
const createLook = async (req, res) => {
  try {
    const { title, description, status, featured } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const slug = slugify(title);

    const existing = await Lookbook.findOne({ slug });
    if (existing) {
      return res.status(409).json({ success: false, message: "A look with this title already exists" });
    }

    const look = await Lookbook.create({
      title,
      description,
      slug,
      status: status || "Active",
      featured: featured === "true" || featured === true,
      image: `/uploads/lookbook/${req.file.filename}`,
    });

    res.status(201).json({ success: true, data: look });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a look
const updateLook = async (req, res) => {
  try {
    const look = await Lookbook.findById(req.params.id);

    if (!look) {
      return res.status(404).json({ success: false, message: "Look not found" });
    }

    const { title, description, status, featured } = req.body;

    if (title && title !== look.title) {
      const newSlug = slugify(title);
      const existing = await Lookbook.findOne({ slug: newSlug, _id: { $ne: look._id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "A look with this title already exists" });
      }
      look.title = title;
      look.slug = newSlug;
    }

    if (description !== undefined) look.description = description;
    if (status !== undefined) look.status = status;
    if (featured !== undefined) look.featured = featured === "true" || featured === true;

    // Replace image if a new one was uploaded
    if (req.file) {
      if (look.image) {
        const oldPath = path.join(__dirname, "..", look.image);
        fs.unlink(oldPath, () => {}); // ignore errors if file missing
      }
      look.image = `/uploads/lookbook/${req.file.filename}`;
    }

    await look.save();

    res.status(200).json({ success: true, data: look });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a look
const deleteLook = async (req, res) => {
  try {
    const look = await Lookbook.findById(req.params.id);

    if (!look) {
      return res.status(404).json({ success: false, message: "Look not found" });
    }

    if (look.image) {
      const imgPath = path.join(__dirname, "..", look.image);
      fs.unlink(imgPath, () => {});
    }

    await look.deleteOne();

    res.status(200).json({ success: true, message: "Look deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  // user
  getLookbook,
  getLookBySlug,
  // admin
  getAllLooksAdmin,
  getLookByIdAdmin,
  createLook,
  updateLook,
  deleteLook,
};