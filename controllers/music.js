//music controller
const { validationResult } = require("express-validator");

//connect to client
const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI.replace("cse341-project2", "music");
const client = new MongoClient(uri);
const base = client.db("cse341-project2").collection("music");

console.log("Music Controllers: ");

//mongo functions
async function getAllMusic(req, res) {
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
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function addMusic(req, res) {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await base
      .insertOne({
        soundtrack: req.body.soundtrack,
        composer: req.body.composer,
        movie: req.body.movie,
        year: req.body.year,
      })
      .then((book) => {
        console.log(book);
        res.status(201).send(book)
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function getOne(req, res) {
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
      .then((music) => {
        console.log(music);
        res.status(200).send(music);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function updateMusic(req, res) {
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
            soundtrack: req.body.soundtrack,
            composer: req.body.composer,
            movie: req.body.movie,
            year: req.body.year,
          },
        }
      )
      .then((music) => {
        console.log(music);
        res.status(204).send(music);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function deleteMusic(req, res) {
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
      .then((music) => {
        console.log(music);
        res.status(200).send(music);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

module.exports = { getAllMusic, addMusic, getOne, updateMusic, deleteMusic };
