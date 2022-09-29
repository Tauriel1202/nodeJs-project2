//functions for quotes collection

const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI.replace("cse341-project2", "quotes");
const client = new MongoClient(uri);
const base = client.db("cse341-project2").collection("quotes");

console.log("Quotes Controllers: ");

async function getQuotes(req, res, next) {
  await base
    .find()
    .toArray()
    .then((all) => {
      console.log(all);
      res.status(200).send(all);
    });
}

async function addQuote(req, res) {
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
}

async function oneQuote(req, res) {
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
    console.log(`⛔ ${e} ⛔`);
  }
}

async function updateQuote(req, res) {
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
    console.log(`⛔ ${e} ⛔`);
  }
}

async function deleteQuote(req, res) {
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
    console.log(`⛔ ${e} ⛔`);
  }
}

module.exports = { getQuotes, addQuote, oneQuote, updateQuote, deleteQuote };
