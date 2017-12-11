import { compose } from 'react-apollo';
import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

const topAppsQuery = gql`
  query allApps(
    $first: Int
    $after: String
    $filter: AppFilter
  ) {
    allApps(
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

const paidApps = graphql(topAppsQuery, {
  options: ({ type, categoryId }) => ({
    variables: {
      filter: {
        type,
        price_not: null,
        ...(categoryId && ({ categories_some: { id: categoryId } })),
      },
    },
  }),
  skip: props => !props.paid,
});

const freeApps = graphql(topAppsQuery, {
  options: ({ type, categoryId }) => ({
    variables: {
      filter: {
        type,
        price: null,
        ...(categoryId && ({ categories_some: { id: categoryId } })),
      },
    },
  }),
  skip: props => !props.free,
});

export default compose(paidApps, freeApps);
