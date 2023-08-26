const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    // _id: Number,
    name: String,
    type: String,
    genre: String,
    level: String,
    // ingredients: Array,
    // steps: Array,
  },
  { timestamps: true }
);

const recipe = mongoose.model("recipes", recipeSchema);

module.exports = recipe;
