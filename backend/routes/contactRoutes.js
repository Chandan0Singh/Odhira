const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  sendContactMessage,
} = require("../controllers/contactController");

router.post("/", sendMessage);

router.get("/", getMessages);

router.post("/send", sendContactMessage);

module.exports = router;