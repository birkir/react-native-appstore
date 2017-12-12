import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

const topAppsQuery = gql`
  query allApps(
    $first: Int
    $after: String
    $filter: AppFilter
  ) {
    apps: allApps(
      orderBy: score_DESC
      first: $first
      after: $after
      filter: $filter
    ) {
      ...AppFragment
    }
  }
  ${AppFragment}
`;

export default graphql(topAppsQuery, {
  options: ({
    size,
    type,
    top,
    categoryIds = [],
  }) => ({
    variables: {
      first: size,
      filter: {
        type,
        ...(top === 'PAID' ? { price_not: null } : { price: null }),
        ...(categoryIds.length > 0 ? { categories_some: { id_in: categoryIds } } : {}),
      },
    },
  }),
});
