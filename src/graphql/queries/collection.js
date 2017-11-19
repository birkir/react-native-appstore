import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

export default gql`
  query collection(
    $collectionId: ID!
  ) {
    query {
      Collection(id: $collectionId) {
        id
        apps {
          id
          title
        }
      }
    }
  }
  ${AppFragment}
`;
