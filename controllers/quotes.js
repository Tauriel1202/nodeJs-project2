//functions for quotes collection
//val
const errorChecker = require("../validation");
const { validationResult } = require('express-validator')

//connect to base
const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI.replace("cse341-project2", "quotes");
const client = new MongoClient(uri);
const base = client.db("cse341-project2").collection("quotes");

console.log("Quotes Controllers: ");

//mongodb functions
async function getQuotes(req, res, next) {
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

async function addQuote(req, res) {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await base
      .insertOne({
        quote: req.body.quote,
        author: req.body.author,
        loc: req.body.loc,
      })
      .then((quote) => {
        console.log(quote);
        res.status(201).send(quote);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function oneQuote(req, res) {
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
      .then((quote) => {
        console.log(quote);
        res.status(200).send(quote);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function updateQuote(req, res) {
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
            quote: req.body.quote,
            author: req.body.author,
            loc: req.body.loc,
          },
        }
      )
      .then((quote) => {
        console.log(quote);
        res.status(204).send(quote);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

async function deleteQuote(req, res) {
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
      .then((quote) => {
        console.log(quote);
        res.status(200).send(quote);
      });
  } catch (e) {
    console.log(`🚫 ${e} 🚫`);
    res.status(500).send(`🚫 ${e} 🚫`);
  }
}

module.exports = { getQuotes, addQuote, oneQuote, updateQuote, deleteQuote };
