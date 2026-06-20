const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      // required: true,
      trim: true,
      maxlength: 300,
    },

    category: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    featuredImage: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Draft",
    },

    author: {
      type: String,
      default: "Chandan Singh",
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Blog", blogSchema);
