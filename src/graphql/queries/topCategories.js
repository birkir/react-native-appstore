import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';

export const query = gql`
  query allCategories(
    $first: Int
    $after: String
    $type: AppType
  ) {
    allCategories(
      orderBy: score_DESC
      first: $first
      after: $after
      filter: {
        type: $type
      }
    ) {
      id
      title
      score
    }
  }
`;

export const topCategories = graphql(query, {
  options: props => ({
    variables: {
      type: props.type,
      first: Math.max(1, Math.min(20, props.size || 5)),
    },
  }),
});
