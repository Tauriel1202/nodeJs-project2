//music routes
const routes = require("express").Router();
const music = require("../controllers/music");

//validators
const errorChecker = require("../validation");

//get
routes.get("/", music.getAllMusic);

//add
routes.post("/", errorChecker.musicCheck, music.addMusic);

//get one
routes.get("/:id", errorChecker.idTester, music.getOne);

//update
routes.put(
  "/:id",
  errorChecker.idTester,
  errorChecker.musicCheck,
  music.updateMusic
);

//delete
routes.delete("/:id", errorChecker.idTester, music.deleteMusic);

module.exports = routes;
