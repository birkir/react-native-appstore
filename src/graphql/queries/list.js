import { compose } from 'react-apollo';
import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import get from 'lodash/get';
import last from 'lodash/last';
import uniqBy from 'lodash/uniqBy';
import AppFragment from '../fragments/AppFragment';

// This GraphQL query container composes mulitple types of data.
// Specific list views can be defined below.

// { collectionId: '1' }
// { top: 'FREE', type: 'APP' }
// { top: 'PAID', type: 'GAME' }
// { top: 'PAID, categoryIds: ['2', '3'] }
// { appId: '4', relatedCategoryIds: ['5', '6'] }

// COLLECTION
// ==========

const collectionQuery = gql`
  query collection($id: ID!) {
    Collection(id: $id) {
      id
      title
      apps {
        ...AppFragment
      }
    }
  }
  ${AppFragment}
`;
const collection = graphql(collectionQuery, {
  options: props => ({ variables: { id: props.collectionId } }),
  skip: props => !props.collectionId,
  props: ({ ownProps, data }) => ({
    data: {
      ...data,
      apps: get(data, 'Collection.apps', get(ownProps, 'apps', [])),
    },
  }),
});

// TOP APPS
// ========

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

const topApps = graphql(topAppsQuery, {
  options: ({ type, top, categoryIds = [] }) => ({
    variables: {
      filter: {
        type,
        ...(top === 'PAID' ? { price_not: null } : { price: null }),
        ...(categoryIds.length > 0 ? { categories_some: { id_in: categoryIds } } : {}),
      },
    },
  }),
  skip: props => !props.top,
  props: ({ ownProps, data }) => ({
    data: {
      ...data,
      apps: get(data, 'allApps', get(ownProps, 'apps', [])),
    },
  }),
});

// RELATED APPS
// ============

const relatedCategoriesAppsQuery = gql`
  query allApps(
    $id: ID
    $categories: [ID!]
  ) {
    allApps(
      filter: {
        id_not: $id
        categories_some: {
          id_in: $categories
        }
      }
    ) {
      ...AppFragment
    }
  }
  ${AppFragment}
`;

const relatedCategoriesApps = graphql(relatedCategoriesAppsQuery, {
  options: ({ appId, relatedCategoryIds = [] }) => ({
    variables: {
      filter: {
        ...(appId && { id_not: appId }),
        ...({ categories_some: { id_in: relatedCategoryIds } }),
      },
    },
  }),
  skip: props => !props.relatedCategoryIds,
  props: ({ ownProps, data }) => ({
    data: {
      ...data,
      apps: get(data, 'allApps', get(ownProps, 'apps', [])),
    },
  }),
});

// const nextPage = ({ fetchMore, ...data }, query, extractApps) => () => fetchMore({
//   query,
//   variables: {
//     first: 10,
//     after: last(get(data, extractApps, [])).id,
//   },
//   updateQuery: (previousResult, { fetchMoreResult }) => {
//     return {
//       apps: uniqBy([
//         ...get(data, extractApps, []),
//         ...get(fetchMoreResult, extractApps, []),
//       ], n => n.id),
//     };
//   },
// });

// export default graphql(query, {
//   options: props => ({
//     variables: {
//       id: props.collection.id,
//     },
//   }),
//   // Attempt to re-use passed props while loading
//   props: ({ ownProps, data }) => ({
//     data: {
//       ...data,
//       Collection: {
//         ...ownProps.collection,
//         ...data.Collection,
//       },
//     },
//   }),
// });


export default compose(collection, topApps, relatedCategoriesApps);
