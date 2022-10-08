const routes = require("express").Router();
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema");

//start up test
// const displayName = require('../controllers/index');
// routes.use('/', displayName);

//swagger route
const swagger = require("./swagger");
routes.use("/", swagger);

//chars route
const chars = require("./chars");
routes.use("/characters", chars);

//quotes routes
const quotes = require("./quotes");
routes.use("/quotes", quotes);

//books and movies routes
const booksMovies = require("./booksAndMovies");
routes.use("/booksAndMovies", booksMovies);

const music = require("./music");
routes.use("/music", music);

//graphql
// routes.use(
//   "/graphql",
//   graphqlHTTP({
//     schema:schema,
//     graphiql: true,
//   })
// );

//export
module.exports = routes;
