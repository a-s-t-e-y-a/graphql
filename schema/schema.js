// Load the full build.
var _ = require("lodash");
// Load the core build.
var _ = require("lodash/core");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;
//dummy data
var books = [
  { name: "book 1", genre: "genre 1", id: "23" },
  { name: "book 2", genre: "genre 2", id: "2" },
  { name: "book 3", genre: "genre 3", id: "3" },
];
//dummy data of authors
var authors = [
  {
    name: "name 1",
    age:  1,
    id: "1",
  },
  {
    name: "name 2",
    age: 2,
    id: "2",
  },
  {
    name: "name 3",
    age: 3,
    id: "3",
  },
];
const BookType = new GraphQLObjectType({
  //creating a schema for book schema
  name: "book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
// creating schema for author
const AuthorType = new GraphQLObjectType({
  name: "author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});
const RootQuery = new GraphQLObjectType({
  //creating a root script
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        //arguments that are passing in the id
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        //code to get data from db /other sources
        //here we are starting relationship between many data
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: {type:GraphQLID},
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
