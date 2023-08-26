const express = require("express");
const app = express();
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// MongoDBに接続
mongoose
  .connect("mongodb://127.0.0.1:27017/Recipease", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ルートエンドポイントの設定
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// サーバーの起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
