const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../config/swagger.json");

const router = express.Router();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
