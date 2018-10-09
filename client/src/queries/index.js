import { gql } from 'apollo-boost';

// Cologne Queries
export const GET_ALL_COLOGNES = gql`
  query {
    getAllColognes {
      _id
      scentName
      scentBrand
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
      scentBrand
      scentPrice
      createdDate
      description
      likes
      username
    }
  }
`;

export const SEARCH_COLOGNES = gql`
  query($searchTerm: String) {
    searchColognes(searchTerm: $searchTerm) {
      _id
      scentName
      scentBrand
      likes
    }
  }
`;

// Cologne Mutations

export const ADD_COLOGNE = gql`
  mutation(
    $scentName: String!
    $scentBrand: String!
    $scentPrice: Int
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentBrand: $scentBrand
      scentPrice: $scentPrice
      description: $description
      username: $username
    ) {
      _id
      scentName
      scentBrand
      scentPrice
      description
      createdDate
      likes
    }
  }
`;

export const DELETE_USER_COLOGNE = gql`
  mutation($_id: ObjectID) {
    deleteUserCologne(_id: $_id) {
      _id
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
      favorites {
        _id
        scentName
        scentBrand
      }
    }
  }
`;

export const GET_USER_COLOGNES = gql`
  query($username: String!) {
    getUserColognes(username: $username) {
      _id
      scentName
      likes
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
