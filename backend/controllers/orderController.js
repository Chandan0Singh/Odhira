const Order = require("../models/orderSchema");
const User = require("../models/User");

const getAllOrders = async (req, res) => {
  try {
    const response = await Order.find()
      .populate("userId")
      .populate("productId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: response,
      OrderLength: response.lenght,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const filterOrders = async (req, res) => {
  try {
    const { search, deliveryStatus, paymentStatus } = req.query;

    const query = {};

    // SEARCH USER NAME OR EMAIL
    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }).select("_id");

      query.userId = {
        $in: users.map((user) => user._id),
      };
    }

    // DELIVERY STATUS
    if (deliveryStatus && deliveryStatus !== "All Status") {
      query.orderStatus = deliveryStatus;
    }

    // PAYMENT STATUS
    if (paymentStatus && paymentStatus !== "Payment Status") {
      query.paymentStatus = paymentStatus;
    }

    const orders = await Order.find(query)
      .populate("userId", "name email")
      .populate("productId", "name price image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCharge,
      discount,
      totalAmount,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCharge,
      discount,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("userId", "name email")
      .populate("items.productId", "title images");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  filterOrders,
  getOrderById,
};
