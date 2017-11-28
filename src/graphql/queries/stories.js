import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

export default gql`
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
      displayMode
      imageUrl
      legend
      title
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
