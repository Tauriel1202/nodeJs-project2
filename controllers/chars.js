//functions for chars collection
const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI.replace("cse341-project2", "chars");
const client = new MongoClient(uri);
const base = client.db("cse341-project2").collection("chars");

console.log("Chars Controllers: ");

async function getAll(req, res) {
  try {
    await base
      .find()
      .toArray()
      .then((all) => {
        console.log(all);
        res.status(200).send(all);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
  }
}

async function addChar(req, res) {
  try {
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
        siblings: req.body.siblings,
      })
      .then((char) => {
        console.log(char);
        res.status(201).send(char);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
  }
}

async function getChar(req, res) {
  try {
    await base
      .findOne({
        _id: new ObjectId(req.params.id),
      })
      .then((char) => {
        console.log(char);
        res.status(200).send(char);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
  }
}

async function updateChar(req, res) {
  try {
    await base
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: {
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
            siblings: req.body.siblings,
          },
        }
      )
      .then((char) => {
        console.log(char);
        res.status(204).send(char);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
  }
}

async function deleteChar(req, res) {
  try {
    await base
      .deleteOne({
        _id: new ObjectId(req.params.id),
      })
      .then((char) => {
        console.log(char);
        res.status(200).send(char);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
  }
}

module.exports = { getAll, addChar, getChar, updateChar, deleteChar };
