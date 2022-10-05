const graphql = require("graphql");
const chars = require("./controllers/chars");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql;

const charType = new GraphQLObjectType({
  name: "characters",
  fields: () => ({
    _id: { type: graphql.GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    homeland: { type: GraphQLString },
    currentHome: { type: GraphQLString },
    species: { type: GraphQLString },
    hairColor: { type: GraphQLString },
    eyeColor: { type: GraphQLString },
    favColor: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    char: {
      type: charType,
      resolve() {
        return routes.get("/", chars.getAll);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
});
