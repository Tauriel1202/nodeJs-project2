const routes = require("express").Router();
const chars = require("../controllers/chars");
console.log(chars);

//get all
routes.get("/", chars.getAll);

//add 
routes.post("/", chars.addChar);

//get one
routes.get("/:id", chars.getChar);

//update
routes.put('/:id', chars.updateChar)

//delete
routes.delete('/:id', chars.deleteChar)

module.exports = routes;
