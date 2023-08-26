const Ingredient = require("../models/ingredient");

const target = "材料";

// 材料一覧取得
exports.getIngredient = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: `${target}の取得に失敗しました。` });
  }
};

// 材料作成
exports.createIngredient = async (req, res) => {
  try {
    const { name, category } = req.body;
    const newIngredient = new Ingredient({
      name,
      category,
    });
    await newIngredient.save();

    res.json({
      message: `${target}が登録されました。`,
      ingredient: newIngredient,
    });
  } catch (error) {
    res.status(500).json({ error: `${target}の登録に失敗しました。` });
  }
};

// 材料更新
exports.updateIngredient = async (req, res) => {
  try {
    const ingredientId = req.params.ingredientId;
    const updateFields = req.body;

    // 材料を更新
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      ingredientId,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedIngredient) {
      return res.status(404).json({ message: `${target}が見つかりません。` });
    }

    res.json({
      message: `${target}が更新されました。`,
      ingredient: updatedIngredient,
    });
  } catch (error) {
    res.status(500).json({ error: `${target}の更新に失敗しました。` });
  }
};

// 材料削除
exports.deleteIngredient = async (req, res) => {
  try {
    const ingredientId = req.params.ingredientId;
    const deletedIngredient = await Ingredient.findByIdAndDelete(ingredientId);

    if (!deletedIngredient) {
      return res.status(404).json({ message: `${target}が見つかりません。` });
    }

    res.json({
      message: "材料が削除されました。",
      ingredient: deletedIngredient,
    });
  } catch (error) {
    res.status(500).json({ error: `${target}の削除に失敗しました。` });
  }
};
