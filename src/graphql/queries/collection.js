import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

export const query = gql`
  query collection($id: ID!) {
    Collection(id: $id) {
      id
      title
      appType
      type
      position
      rows
      apps {
        ...AppFragment
      }
    }
  }
  ${AppFragment}
`;

export default graphql(query, {
  options: props => ({
    variables: {
      id: props.collection.id,
    },
  }),
  // Attempt to re-use passed props while loading
  props: ({ ownProps, data }) => ({
    data: {
      ...data,
      Collection: {
        ...ownProps.collection,
        ...data.Collection,
      },
    },
  }),
});
