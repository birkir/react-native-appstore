import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';

export const query = gql`
  query allCategories($type: AppType) {
    allCategories(
      orderBy: title_ASC
      filter: {
        type: $type
      }
    ) {
      id
      title
    }
  }
`;

export default graphql(query, {
  options: ({ type }) => ({ variables: { type } }),
});
