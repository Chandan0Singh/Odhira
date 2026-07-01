// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try {
//     // Get token from headers
//     const authHeader = req.headers.authorization;

//     // Check if token exists
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "No token provided",
//       });
//     }

//     // Extract token
//     const token = authHeader.split(" ")[1];

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach decoded data to request
//     req.user = decoded;

//     next();
//   } catch (err) {
//     console.log("err :", err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;

// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("console.log(req.headers);", req.headers);
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token from headers:", token); // Debugging line
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    console.log("Authenticated user:", req.user); // Debugging line

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin" || req.user?.role === "superadmin") {
    return next();
  }
  res.status(403).json({ message: "Admin access required" });
};

module.exports = { protect, adminOnly };
