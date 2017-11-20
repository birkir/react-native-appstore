import gql from 'graphql-tag';

export default gql`
  fragment VersionFragment on Version {
    id
    version
    date
    changelog
  }
`;
