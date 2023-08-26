const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

router.get("/recipes", recipeController.getRecipe);
router.post("/recipes", recipeController.createRecipe);
router.patch("/recipes/:recipeId", recipeController.updateRecipe);
router.delete("/recipes/:recipeId", recipeController.deleteRecipe);

module.exports = router;
