import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';
import AppFragment from '../fragments/AppFragment';

export const query = gql`
  query allStories(
    $first: Int!
    $after: String
  ) {
    allStories(
      orderBy: createdAt_DESC
      first: $first
      after: $after
    ) {
      id
      backgroundColor
      displayType
      imageUrl
      legend
      title
      date
      app {
        ...AppFragment
      }
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
      first: props.first || 10,
    },
  }),
});
