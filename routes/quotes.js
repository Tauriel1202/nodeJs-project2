//route for quotes
const routes = require("express").Router();
const quotes = require("../controllers/quotes");
console.log(quotes);

//get
routes.get("/", quotes.getQuotes);

//add
routes.post("/", quotes.addQuote);

//get one
routes.get("/:id", quotes.oneQuote);

//update
routes.put('/:id', quotes.updateQuote)

//delete
routes.delete('/:id', quotes.deleteQuote)

module.exports = routes;
