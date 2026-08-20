const express = require("express");
const router = express.Router();

const { getAllOrders, filterOrders, createOrder ,getOrderById, myAllOrders } = require("../controllers/orderController");

router.post("/create", createOrder);

router.get("/all", getAllOrders);
router.get("/my-orders", myAllOrders);

router.get("/filter", filterOrders);

router.get("/:id", getOrderById);

module.exports = router;