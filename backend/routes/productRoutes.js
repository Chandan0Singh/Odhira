// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductsByGender,
  getSaleProducts,
  getExploreData,
  getNewArrivals,
  getProductById,
  createProduct,       // ✅ new
  updateProduct,       // ✅ new
  deleteProduct  
} = require("../controllers/productController");

router.get("/", getAllProducts); // /api/products
router.get("/gender/:gender", getProductsByGender); // /api/products/gender/male
router.get("/sale", getSaleProducts); 
router.get("/explore", getExploreData); 
router.get("/new", getNewArrivals);
router.get("/:id", getProductById);

router.post("/add", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;
