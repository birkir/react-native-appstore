import gql from 'graphql-tag';

export default gql`
  fragment VersionFragment on Version {
    id
    title
    date
    changelog
  }
`;
