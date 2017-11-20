import { propType } from 'graphql-anywhere/lib/utilities'; // eslint-disable-line
import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

export const query = gql`
  query collections($type: String) {
    query {
      allCollections(
        type: $type
      ) {
        id
        title
        appType
        position
        rows
        apps {
          ...AppFragment
        }
      }
    }
  }
  ${AppFragment}
`;

export const PropTypeCollection = propType(query);

export default ({ type }) => graphql(query, {
  options: {
    variables: {
      type,
    },
  },
});
