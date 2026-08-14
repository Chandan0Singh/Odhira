const Newsletter = require("../models/Newsletter");

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existingEmail = await Newsletter.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const subscriber = await Newsletter.create({ email });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: subscriber,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};