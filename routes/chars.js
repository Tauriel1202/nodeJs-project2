//routes
const routes = require("express").Router();
const chars = require("../controllers/chars");
console.log(chars);

//validators
// const { validationResult, check } = require("express-validator");
const errorChecker = require("../validation");

//get all
routes.get("/", chars.getAll);

//add
routes.post(
  "/",
  errorChecker.charCheck,
  // errorChecker.errorReturn,
  chars.addChar
);

//get one
routes.get(
  "/:id",
  errorChecker.idTester,
  chars.getChar
);

//update
routes.put(
  "/:id",
  errorChecker.idTester,
  errorChecker.charCheck,
  chars.updateChar,
);

//delete
routes.delete(
  "/:id",
  errorChecker.idTester,
  chars.deleteChar
);

module.exports = routes;
