const Order = require("../models/orderSchema");
const User = require("../models/User")

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
    const order = Order.create(req.body);
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

module.exports = {
  getAllOrders,
  createOrder,
  filterOrders,
};
