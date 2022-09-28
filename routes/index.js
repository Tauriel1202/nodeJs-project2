const routes = require("express").Router();

//start up test
// const displayName = require('../controllers/index');
// routes.use('/', displayName);

//swagger route
const swagger = require("./swagger");
routes.use("/", swagger);

//chars route
const chars = require("./chars");
routes.use("/characters", chars);

//quotes routes
const quotes = require("./quotes");
routes.use("/quotes", quotes);

//export
module.exports = routes;
