const express = require("express");
const router = express.Router();

const { getAllOrders, filterOrders, createOrder ,getOrderById } = require("../controllers/orderController");

router.post("/create", createOrder);

router.get("/all", getAllOrders);

router.get("/filter", filterOrders);

router.get("/:id", getOrderById);

module.exports = router;