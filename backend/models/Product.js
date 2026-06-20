// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    image: String,
    price: Number,
    gender: String,
    age: String,
    tags: [String],
    sale: String,
    arrivalDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
