//route for quotes
const routes = require("express").Router();
const quotes = require("../controllers/quotes");
console.log(quotes);

//val functions
const errorChecker = require("../validation");

//get
routes.get("/", quotes.getQuotes);

//add
routes.post("/",
  errorChecker.quoteCheck,
  quotes.addQuote);

//get one
routes.get("/:id",
  errorChecker.idTester,
  quotes.oneQuote);

//update
routes.put(
  "/:id",
  errorChecker.idTester,
  errorChecker.quoteCheck,
  quotes.updateQuote
);

//delete
routes.delete("/:id",
  errorChecker.idTester,
  quotes.deleteQuote);

module.exports = routes;
