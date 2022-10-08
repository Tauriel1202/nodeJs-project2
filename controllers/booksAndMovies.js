//book and movie controller
const { validationResult } = require("express-validator");

//connect to client
const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI.replace("cse341-project2", "booksMovies");
const client = new MongoClient(uri);
const base = client.db("cse341-project2").collection("booksMovies");

console.log("Book and Movies Controllers: ");

//mongo functions
async function getAllMedia(req, res) {
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

async function addMedia(req, res) {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await base
      .insertOne({
        name: req.body.name,
        series: req.body.series,
        places: req.body.places,
        characters: req.body.characters,
        releaseDate: req.body.releaseDate,
        bookOrMovie: req.body.bookOrMovie,
      })
      .then((media) => {
        console.log(media);
        res.status(201).send(media);
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
      .then((media) => {
        console.log(media);
        res.status(200).send(media);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function updateMedia(req, res) {
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
            name: req.body.name,
            series: req.body.series,
            places: req.body.places,
            characters: req.body.characters,
            releaseDate: req.body.releaseDate,
            bookOrMovie: req.body.bookOrMovie,
          },
        }
      )
      .then((media) => {
        console.log(media);
        res.status(204).send(media);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function deleteMedia(req, res) {
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
      .then((media) => {
        console.log(media);
        res.status(200).send(media);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

module.exports = { getAllMedia, addMedia, getOne, updateMedia, deleteMedia };
