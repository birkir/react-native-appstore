import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

export default gql`
  query allApps(
    $first: Int
    $after: String
    $type: AppType
  ) {
    allApps(
      orderBy: score_DESC
      first: $first
      after: $after
      filter: {
        type: $type
      }
    ) {
      ...AppFragment
    }
  }
  ${AppFragment}
`;
