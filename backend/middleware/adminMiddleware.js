const adminMiddleware = (req, res, next) => {
  try {
    // Check user role
    if (
      req.user.role !== "admin" &&
      req.user.role !== "superadmin"
    ) {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = adminMiddleware;