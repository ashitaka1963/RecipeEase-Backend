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
    // 重複登録チェックのため、材料一覧を取得
    const ingredients = await Ingredient.find();

    let newIngredient = null;
    if (req.body.hasOwnProperty("_rawValue")) {
      for (const ingredient of req.body._rawValue) {
        const { name, category, unit } = ingredient;

        if (duplicateCheck(ingredients, name)) {
          return res.status(400).json({ error: `${name}は既に存在します。` });
        }

        newIngredient = new Ingredient({
          name,
          category,
          unit,
        });
        await newIngredient.save();
      }
    } else {
      const { name, category, unit } = req.body;

      if (duplicateCheck(ingredients, name)) {
        return res.status(400).json({ error: `${name}は既に存在します。` });
      }

      newIngredient = new Ingredient({
        name,
        category,
        unit,
      });
      await newIngredient.save();
    }

    res.json({
      message: `${target}が登録されました。`,
      ingredient: newIngredient,
    });
  } catch (error) {
    res.status(500).json({ error: `${target}の登録に失敗しました。` });
  }
};

function duplicateCheck(items, addItemName) {
  if (items.some((item) => item.name === addItemName)) {
    return true;
  }
  return false;
}

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
