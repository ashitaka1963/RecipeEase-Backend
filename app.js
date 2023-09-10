const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();
app.use(express.json());

// 特定のオリジンを許可する
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log(origin);
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );
app.use(cors());

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
