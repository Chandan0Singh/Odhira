const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
  getLookbook,
  getLookBySlug,
  getAllLooksAdmin,
  getLookByIdAdmin,
  createLook,
  updateLook,
  deleteLook,
} = require("../controllers/lookbookController");

// Create uploads/lookbook if it doesn't exist
const uploadDir = path.join(__dirname, "..", "uploads", "lookbook");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({ storage });

/* -------------------- USER -------------------- */
router.get("/", getLookbook);
router.get("/:slug", getLookBySlug);

/* -------------------- ADMIN -------------------- */
router.get("/admin/all", getAllLooksAdmin);
router.get("/admin/:id", getLookByIdAdmin);
router.post("/admin", upload.single("image"), createLook);
router.put("/admin/:id", upload.single("image"), updateLook);
router.delete("/admin/:id", deleteLook);

module.exports = router;