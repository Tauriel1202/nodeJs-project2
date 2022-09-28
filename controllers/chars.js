const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI.replace("cse341-project2", "chars");
const client = new MongoClient(uri);
const base = client.db("cse341-project2").collection("chars");

console.log("Controllers: ");

async function getAll(req, res) {
  await base
    .find()
    .toArray()
    .then((all) => {
      console.log(all);
      res.status(200).send(all);
    });
}

async function addChar(req, res) {
  await base
    .insertOne({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      series: req.body.series,
      homeland: req.body.homeland,
      currentHome: req.body.currentHome,
      species: req.body.species,
      hairColor: req.body.hairColor,
      eyeColor: req.body.eyeColor,
      favColor: req.body.favColor,
      age: req.body.age,
      siblings: req.body.siblings
    })
    .then((char) => {
      console.log(char);
      res.status(201).send(char);
    });
}

module.exports = { getAll, addChar };
