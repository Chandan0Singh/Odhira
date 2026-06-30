const express = require("express");

const router = express.Router();

const {
  getLookbook,
  getLookBySlug,
} = require("../controllers/lookbookController");

router.get("/", getLookbook);

router.get("/:slug", getLookBySlug);

module.exports = router;