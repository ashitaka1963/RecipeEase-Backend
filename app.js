const express = require("express");
const connectDB = require("./config/database");

const app = express();
app.use(express.json());

// データベース接続
connectDB();

const swaggerRouter = require("./routes/swagger");
app.use(swaggerRouter);

const ingredientRoutes = require("./routes/ingredientRoutes");
app.use(ingredientRoutes);

const recipeRoutes = require("./routes/recipeRoutes");
app.use(recipeRoutes);

const PORT = 3000;

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
