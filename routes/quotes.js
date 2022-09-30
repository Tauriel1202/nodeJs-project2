//route for quotes
const routes = require("express").Router();
const quotes = require("../controllers/quotes");
console.log(quotes);

//val functions
const errorChecker = require("../validation");

//get
routes.get("/", quotes.getQuotes);

//add
routes.post(
  "/",
  errorChecker.quoteCheck,
  errorChecker.errorReturn,
  quotes.addQuote
);

//get one
routes.get("/:id", quotes.oneQuote);

//update
routes.put("/:id", errorChecker.quoteCheck, errorChecker.errorReturn, quotes.updateQuote);

//delete
routes.delete("/:id", quotes.deleteQuote);

module.exports = routes;
