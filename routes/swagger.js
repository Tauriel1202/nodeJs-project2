const routes = require("express").Router();
const swagUI = require("swagger-ui-express");
const swagDocs = require("../swagger.json");

routes.use("/api-docs", swagUI.serve);
routes.get("/api-docs", swagUI.setup(swagDocs));

module.exports = routes;
