const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    // _id: Number,
    name: String,
    category: String,
  },
  { timestamps: true }
);

const ingredient = mongoose.model("ingredients", ingredientSchema);

module.exports = ingredient;
