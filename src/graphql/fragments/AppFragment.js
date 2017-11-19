import gql from 'graphql-tag';
import VersionFragment from './VersionFragment';
import ReviewFragment from './ReviewFragment';

export default gql`
  fragment AppFragment on App {
    id
    title
    createdAt
    score
    reviews {
      rating
    }
    version {
      ...VersionFragment
    }
    reviews {
      ...ReviewFragment
    }
  }
  ${VersionFragment}
  ${ReviewFragment}
`;
