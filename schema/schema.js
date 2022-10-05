// Load the full build.
var ys = require("lodash");
// Load the core build.
var _ = require("lodash/core");

const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
//dummy data
var books = [
  { name: "book 1", genre: "genre 1", id: "23", authorid: "1" },
  { name: "book 2", genre: "genre 2", id: "2", authorid: "2" },
  { name: "book 3", genre: "genre 3", id: "3", authorid: "3" },
];
//dummy data of authors
var authors = [
  {
    name: "name 1",
    age: 1,
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

// new dummy books record

var the = [
  {
    name: "name yiu are",
    age: 1,
    id: "1",
  },
  {
    name: "name yiu",
    age: 2,
    id: "2",
  },
  {
    name: "name",
    age: 3,
    id: "3",
  },
];
const AuthorType = new GraphQLObjectType({
  name: "author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books:{
      //we are defining list of books here
      type: new GraphQLList(BookType),
      resolve(parent, args)
      {
        return ys.filter(books, {authorid:parent.id})
      }
    }
  }),
});
// creatting schema for the
const The = new GraphQLObjectType({
  name: "The",
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLString },
    name: { type: GraphQLString },
  
  }),
});
const BookType = new GraphQLObjectType({
  //creating a schema for book schema
  name: "book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return ys.find(authors, { id: parent.authorid });
      },
    },
  }),
});
// creating schema for author

const RootQuery = new GraphQLObjectType({
  //creating a root script
  name: "RootQueryType",
  fields: {
    books: {
      type: BookType,
      args: {
        //arguments that are passing in the id
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        //code to get data from db /other sources
        //here we are starting relationship between many data
        return ys.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    the: {
      type: The,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return ys.find(the, { id: args.id });
      },
    },
    book:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return books
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent,args){
        return authors
    }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
