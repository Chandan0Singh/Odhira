const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  changeUserRole,
  deleteAccount,
  updateUser,
  blockUser,
  getFilteredUsers,

  // Address Controllers
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/userController");

// Existing routes...
router.get("/users", getAllUsers);
router.put("/update", updateUser);
router.put("/role", changeUserRole);
router.put("/block", blockUser);
router.delete("/delete", deleteAccount);
router.get("/search", getFilteredUsers);

// Address Routes
router.get("/:userId/addresses", getAddresses);
router.post("/address", addAddress);
router.put("/address", updateAddress);
router.delete("/address", deleteAddress);
router.put("/address/default", setDefaultAddress);

// Keep this LAST
router.get("/:userId", getUserById);

module.exports = router;