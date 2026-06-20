const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // CHECK PASSWORD
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // CHECK BLOCKED USER
    if (user.status === "blocked") {
      return res.status(403).json({
        message: "Your account has been blocked",
      });
    }

    // GENERATE TOKEN
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
      message: "Login success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  // NAME VALIDATION
  if (!name || name.length < 2) {
    return res.status(400).json({
      message: "Name must be at least 2 characters long",
    });
  }

  if (!/^[A-Za-z\s]+$/.test(name)) {
    return res.status(400).json({
      message: "Name can only contain letters and spaces",
    });
  }

  // EMAIL VALIDATION
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      message: "Invalid email address",
    });
  }

  // PASSWORD VALIDATION
  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    // CHECK EXISTING USER
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // HASH PASSWORD
    const hashed = await bcrypt.hash(password, 10);

    // CREATE USER
    const newUser = new User({
      name,
      email,
      password: hashed,
      role,
      status: "active",
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (err) {
    console.log("SIGNUP ERROR:", err);

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);

      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    return res.status(500).json({
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
    const { userId, name, email, role, phone, address } = req.body;


    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const updateData = {};

    if (name?.trim()) updateData.name = name;
    if (email?.trim()) updateData.email = email;
    if (role?.trim()) updateData.role = role;
    if (phone?.trim()) updateData.phone = phone;
    if (address?.trim()) updateData.address = address;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
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
