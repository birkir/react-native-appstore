import gql from 'graphql-tag';
import VersionFragment from './VersionFragment';
// import ReviewFragment from './ReviewFragment';

export default gql`
  fragment AppFragment on App {
    id
    title
    iconUrl
    imageUrl
    subtitle
    description
    hasInAppPurchases
    age
    price
    reviews {
      rating
    }
    # Get latest version
    versions(
      first: 1
      orderBy: date_DESC
    ) {
      ...VersionFragment
    }
  }
  ${VersionFragment}
  #{ReviewFragment}
`;
