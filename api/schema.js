const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    bookCards: [Book]
  }
  type Book {
    id: ID!
    title: String!
    cover: String!
    description: String!
    author: String!
  }
`;

module.exports = typeDefs;
