const express = require("express");
const router = express.Router();

const { getAllOrders, filterOrders, createOrder } = require("../controllers/orderController");

router.post("/create", createOrder);

router.get("/all", getAllOrders);

router.get("/filter", filterOrders);

module.exports = router;