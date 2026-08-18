const express = require("express");
const router = express.Router();

const { signupUser, loginUser, verifyEmail } = require("../controllers/userController");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail);

module.exports = router;
