const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    hello: String
    users(id: Int): [User]
  }

  type User {
    id: Int
    email: String
    role: String
  }
`;
