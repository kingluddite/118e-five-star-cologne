const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  scalar ObjectID
  type Cologne {
    _id: ObjectID
    scentName: String!
    scentPrice: Int
    createdDate: String
    description: String
    likes: Int
    username: String
  }
  # comments

  type User {
    _id: ObjectID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Cologne]
  }

  type Query {
    getAllColognes: [Cologne]
    getCologne(_id: ObjectID!): Cologne

    getCurrentUser: User
  }

  type Token {
    token: String!
  }

  type Mutation {
    addCologne(
      scentName: String!
      scentPrice: Int
      description: String
      username: String
    ): Cologne

    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
