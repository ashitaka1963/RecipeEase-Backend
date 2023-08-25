const express = require("express");
const app = express();

// ルートエンドポイントの設定
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// サーバーの起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
