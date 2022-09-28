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


module.exports = { getQuotes, addQuote }