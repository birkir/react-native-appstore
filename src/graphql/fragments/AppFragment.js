import gql from 'graphql-tag';
import VersionFragment from './VersionFragment';

export default gql`
  fragment AppFragment on App {
    id
    title
    iconUrl
    imageUrl
    subtitle
    hasInAppPurchases
    price
    rating
    ratingsCount: _reviewsMeta { count }
    age
    # Get latest version
    versions(
      first: 1
      orderBy: date_DESC
    ) {
      ...VersionFragment
    }
  }
  ${VersionFragment}
`;
