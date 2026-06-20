// controllers/cartController.js
const Cart = require("../models/Cart");

// 🛒 Add to Cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input
    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Missing userId, productId, or quantity" });
    }

    // Ensure quantity is a number
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number" });
    }

    // Find existing cart for user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({ userId, items: [{ productId, quantity: qty }] });
    } else {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += qty;
      } else {
        // Add new item
        cart.items.push({ productId, quantity: qty });
      }
    }

    // Save cart
    await cart.save();

    return res.status(200).json({ message: "✅ Item added to cart", cart });
  } catch (err) {
    console.error("❌ Add to cart error:", err);
    return res.status(500).json({
      message: "Server error while adding to cart",
      error: err.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  const { cartItemId, userId } = req.body;

  try {
    if (!cartItemId || !userId) {
      return res.status(400).json({ message: "Missing inputs" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter((item) => item._id.toString() !== cartItemId);

    await cart.save();

    res.status(200).json({
      message: "Item removed successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🧾 Get Cart for User
const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "items.productId",
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Get cart failed", error: err.message });
  }
};

module.exports = { addToCart, removeFromCart, getUserCart };
