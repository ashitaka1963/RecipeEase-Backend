const Recipe = require("../models/recipe");

const target = "レシピ";

// レシピ一覧取得
exports.getRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: `${target}の取得に失敗しました。` });
  }
};

// レシピ作成
exports.createRecipe = async (req, res) => {
  try {
    const { name, type, genre, level } = req.body;
    const newRecipe = new Recipe({
      name,
      type,
      genre,
      level,
    });
    await newRecipe.save();

    res.json({
      message: `${target}が登録されました。`,
      recipe: newRecipe,
    });
  } catch (error) {
    res.status(500).json({ error: `${target}の登録に失敗しました。` });
  }
};

// レシピ更新
exports.updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const updateFields = req.body;

    // レシピを更新
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: `${target}が見つかりません。` });
    }

    res.json({
      message: `${target}が更新されました。`,
      recipe: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({ error: `${target}の更新に失敗しました。` });
  }
};

// レシピ削除
exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: `${target}が見つかりません。` });
    }

    res.json({
      message: "レシピが削除されました。",
      recipe: deletedRecipe,
    });
  } catch (error) {
    res.status(500).json({ error: `${target}の削除に失敗しました。` });
  }
};
