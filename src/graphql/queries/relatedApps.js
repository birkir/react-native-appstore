import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

const query = gql`
  query relatedApps($id: ID!, $type: AppType!, $categories: [ID!]) {
    allApps(first: 15, filter: { id_not: $id, type: $type, categories_some: { id_in: $categories } }) {
      ...AppFragment
    }
  }
  ${AppFragment}
`;

export default graphql(query, {
  options: props => ({
    variables: {
      id: props.id,
      type: props.type,
      categories: props.categories,
    },
  }),
});
