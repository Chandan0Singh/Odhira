const express = require("express");
const router = express.Router();

const {
  getHomePage,
  createHomePage,
  updateHomePage,
} = require("../controllers/homeController");

// Public
router.get("/", getHomePage);

// Admin
router.post("/", createHomePage);
router.put("/:id", updateHomePage);

module.exports = router;