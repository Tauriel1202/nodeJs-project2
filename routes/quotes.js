//route for quotes
const routes = require("express").Router();
const quotes = require("../controllers/quotes");
console.log(quotes)

const getQuotes = quotes.getQuotes;
routes.get("/", getQuotes);

const addQuote = quotes.addQuote;
routes.post("/", addQuote);

module.exports = routes;
