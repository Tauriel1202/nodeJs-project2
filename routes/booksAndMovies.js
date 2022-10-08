// book and movie route
const routes = require("express").Router();
const booksAndMovies = require("../controllers/booksAndMovies");
console.log(booksAndMovies);

//validator
const errorChecker = require("../validation");

//get all
routes.get("/", booksAndMovies.getAllMedia);

//add one
routes.post("/", errorChecker.mediaCheck, booksAndMovies.addMedia);

// get one
routes.get("/:id", errorChecker.idTester, booksAndMovies.getOne);

// update one
routes.put(
  "/:id",
  errorChecker.idTester,
  errorChecker.mediaCheck,
  booksAndMovies.updateMedia
);

// delete one
routes.delete("/:id", errorChecker.idTester, booksAndMovies.deleteMedia);

module.exports = routes;
