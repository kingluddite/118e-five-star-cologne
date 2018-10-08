import { gql } from 'apollo-boost';

// Cologne Queries
export const GET_ALL_COLOGNES = gql`
  query {
    getAllColognes {
      _id
      scentName
      scentPrice
      likes
      createdDate
    }
  }
`;

export const GET_COLOGNE = gql`
  query($_id: ObjectID!) {
    getCologne(_id: $_id) {
      _id
      scentName
      scentPrice
      createdDate
      description
      likes
      username
    }
  }
`;

// Cologne Mutations

export const ADD_COLOGNE = gql`
  mutation(
    $scentName: String!
    $scentPrice: Int
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentPrice: $scentPrice
      description: $description
      username: $username
    ) {
      _id
      scentName
      scentPrice
      description
      createdDate
      likes
    }
  }
`;

// User Queries

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      joinDate
    }
  }
`;

// User Mutation

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
