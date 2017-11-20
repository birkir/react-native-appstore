import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

export const query = gql`
  query collections($appType: AppType) {
    allCollections(
      filter: {
        appType: $appType
      }
      orderBy: position_ASC
    ) {
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

export default ({ appType }) => graphql(query, {
  options: {
    variables: {
      appType,
    },
  },
});
