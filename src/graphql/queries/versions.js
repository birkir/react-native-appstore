import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import VersionFragment from '../fragments/VersionFragment';

export const query = gql`
  query appVersions($id: ID!) {
    App(id: $id) {
      id
      versions(
        first: 10
        orderBy: date_DESC
      ) {
        ...VersionFragment
      }
    }
  }
  ${VersionFragment}
`;

export default graphql(query, {
  options: props => ({ variables: { id: props.appId } }),
});
