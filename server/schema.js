const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  scalar ObjectID
  type Cologne {
    _id: ObjectID
    scentName: String!
    scentBrand: String!
    scentPrice: Int
    createdDate: String
    description: String
    likes: Int
    username: String
  }

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
    searchColognes(searchTerm: String): [Cologne]

    getCurrentUser: User
    getUserColognes(username: String!): [Cologne]
  }

  type Token {
    token: String!
  }

  type Mutation {
    addCologne(
      scentName: String!
      scentBrand: String!
      scentPrice: Int
      description: String
      username: String
    ): Cologne

    updateUserCologne(
      _id: ObjectID!
      scentName: String!
      scentBrand: String!
      scentPrice: Int
      description: String
    ): Cologne

    deleteUserCologne(_id: ObjectID): Cologne

    likeCologne(_id: ObjectID!, username: String!): Cologne

    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
