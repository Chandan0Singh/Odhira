const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getLookbook,
  getLookBySlug,
  getAllLooksAdmin,
  getLookByIdAdmin,
  createLook,
  updateLook,
  deleteLook,
} = require("../controllers/lookbookController");

// Swap in your real auth middleware here, e.g.:
// const { protect, isAdmin } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

/* -------------------- USER (PUBLIC) -------------------- */
router.get("/", getLookbook);
router.get("/:slug", getLookBySlug);

/* -------------------- ADMIN -------------------- */
router.get("/admin/all", getAllLooksAdmin);
router.get("/admin/:id", getLookByIdAdmin);
router.post("/admin", upload.single("image"), createLook);
router.put("/admin/:id", upload.single("image"), updateLook);
router.delete("/admin/:id", deleteLook);

module.exports = router;