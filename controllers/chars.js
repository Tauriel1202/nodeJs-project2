//functions for chars collection
const { validationResult } = require("express-validator");

//connect to client
const { MongoClient, ObjectId } = require("mongodb");
const { charCheck, errorReturn, idTester } = require("../validation");
const uri = process.env.MONGO_URI.replace("cse341-project2", "chars");
const client = new MongoClient(uri);
const base = client.db("cse341-project2").collection("chars");

console.log("Chars Controllers: ");

//mongodb functions
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
    console.log(`🚫 ${e} 🚫`)
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function addChar(req, res) {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
        //If it breaks again, turn these back on.
        // charCheck;
        // errorReturn();

        console.log(char);
        res.status(201).send(char);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function getChar(req, res) {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function updateChar(req, res) {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
        // idTester;
        // charCheck;
        // errorReturn();

        console.log(char);
        res.status(204).send(char);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function deleteChar(req, res) {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

module.exports = { getAll, addChar, getChar, updateChar, deleteChar };
