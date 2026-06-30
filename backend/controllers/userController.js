const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Find User
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // User Not Found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check Blocked User
    if (user.status === "blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        profileImage: user.profileImage,
        address: user.address,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
};

const signupUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    role = "user",
  } = req.body;

  const name = `${firstName} ${lastName}`.trim();

  // First Name Validation
  if (!firstName || firstName.length < 2) {
    return res.status(400).json({
      message: "First name must be at least 2 characters long",
    });
  }

  // Last Name Validation
  if (!lastName || lastName.length < 2) {
    return res.status(400).json({
      message: "Last name must be at least 2 characters long",
    });
  }

  // Email Validation
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      message: "Invalid email address",
    });
  }

  // Phone Validation
  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return res.status(400).json({
      message: "Invalid phone number",
    });
  }

  // Password Validation
  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  // Confirm Password Validation
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  try {
    const exist = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (exist) {
      return res.status(400).json({
        message: "Email or phone already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      status: "active",
    });

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: err.message,
    });
  }
};

/* ---------------- GET ALL USERS ---------------- */
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      success: true,
      users,
      totalUsers,
      currentPage: Number(page),
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- GET USER BY ID ---------------- */
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- CHANGE USER ROLE ---------------- */
const changeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "userId and role are required",
      });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- DELETE USER ---------------- */
const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- UPDATE USER ---------------- */
const updateUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, phone, address, role } =
      req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields
    if (firstName !== undefined) user.firstName = firstName.trim();
    if (lastName !== undefined) user.lastName = lastName.trim();

    // Automatically update full name
    user.name = `${user.firstName} ${user.lastName}`.trim();

    if (email !== undefined) user.email = email.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (address !== undefined) user.address = address.trim();

    // Optional (mainly for admin panel)
    if (role !== undefined) user.role = role;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- BLOCK / UNBLOCK USER ---------------- */
const blockUser = async (req, res) => {
  try {
    const { userId, status } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: status === "blocked" ? "User blocked" : "User unblocked",
      user,
    });
  } catch (error) {
    console.log("erroe :", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFilteredUsers = async (req, res) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;

    let query = {};

    // SEARCH
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // ROLE FILTER
    if (role && role !== "All Roles") {
      query.role = role.toLowerCase().replace(" ", "");
    }

    // STATUS FILTER
    if (status && status !== "All Status") {
      query.status = status.toLowerCase();
    }

    // PAGINATION
    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalUsers = await User.countDocuments(query);

    return res.status(200).json({
      success: true,
      users,
      totalUsers,
      currentPage: Number(page),
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ---------------- EXPORTS ---------------- */
module.exports = {
  signupUser,
  getAllUsers,
  getUserById,
  changeUserRole,
  deleteAccount,
  updateUser,
  blockUser,
  loginUser,
  getFilteredUsers,
};
