import { gql } from 'apollo-boost';

export const GET_ALL_COLOGNES = gql`
  query {
    getAllColognes {
      scentName
      scentPrice
      likes
      createdDate
    }
  }
`;
