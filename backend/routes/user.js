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
} = require("../controllers/userController");


/* ---------------- GET ALL USERS ---------------- */
router.get("/users", getAllUsers);

/* ---------------- UPDATE USER ---------------- */
router.put("/update", updateUser);

/* ---------------- CHANGE USER ROLE ---------------- */
router.put("/role", changeUserRole);

/* ---------------- BLOCK / UNBLOCK USER ---------------- */
router.put("/block", blockUser);

/* ---------------- DELETE USER ---------------- */
router.delete("/delete", deleteAccount);

/* ---------------- SEARCH USERS ---------------- */
router.get("/search", getFilteredUsers);

/* ---------------- GET USER BY ID ---------------- */
router.get("/:userId", getUserById);


module.exports = router;
