import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
// import get from 'lodash/get';
// import last from 'lodash/last';
// import uniqBy from 'lodash/uniqBy';
import AppFragment from '../fragments/AppFragment';

// This GraphQL query container composes mulitple types of data.
// Specific list views can be defined below.

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

// const collection = graphql(query, {
//   options: props => ({ variables: { id: props.collection.id } }),
//   skip: props => !props.collection,
//   props: ({ ownProps, data }) => ({
//     data: {
//       ...data,
//       nextPage: nextPage(data, query, 'Collection.apps'),
//       apps: get(data, 'Collection.apps', get(ownProps, 'collection.apps', [])),
//     },
//   }),
// });

// const topFree = graphql(query, {
//   options: props => ({ variables: { type: props.type, price: null } }),
//   skip: props => !props.topFree,
// });

// const topPaid = graphql(query, {
//   options: props => ({ variables: { type: props.type, price: null } }),
//   skip: props => !props.topPaid,
// });

// const related = graphql(query, {
//   options: props => ({ variables: { id: props.relatedAppId } }),
//   skip: props => !props.relatedAppId,
// });

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
