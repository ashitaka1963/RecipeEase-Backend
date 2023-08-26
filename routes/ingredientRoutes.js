const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");

router.get("/ingredients", ingredientController.getIngredient);
router.post("/ingredients", ingredientController.createIngredient);
router.patch(
  "/ingredients/:ingredientId",
  ingredientController.updateIngredient
);
router.delete(
  "/ingredients/:ingredientId",
  ingredientController.deleteIngredient
);

module.exports = router;
