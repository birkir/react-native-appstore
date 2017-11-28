import gql from 'graphql-tag';

export default gql`
  fragment ReviewFragment on Review {
    id
    name
    title
    rating
    description
  }
`;
