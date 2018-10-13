import { gql } from "apollo-boost";

export const cologneFragments = {
  cologne: gql`
    fragment CompleteCologne on Cologne {
      _id
      scentName
      scentBrand
      scentPrice
      createdDate
      description
      likes
      username
    }
  `,

  like: gql`
    fragment LikeCologne on Cologne {
      _id
      likes
    }
  `
};
