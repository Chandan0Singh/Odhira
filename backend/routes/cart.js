// routes/cart.js
const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart,  getUserCart , clearCart} = require('../controllers/cartController');

router.post('/add', addToCart); // /api/cart/add
router.delete("/remove", removeFromCart);
router.get('/:userId', getUserCart); // /api/cart/:userId
router.delete("/clear", clearCart); // /api/cart/clear

module.exports = router;
