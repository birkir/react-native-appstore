import { compose } from 'react-apollo';
import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';

export const queryAppReviews = gql`
  query appReviews($id: ID!) {
    App(id: $id) {
      id
      reviews(
        filter: {
          # Contains space, neat little hack for not null
          description_contains: " ",
        }
      ) {
        id
        title
        description
        createdAt
        rating
        name
      }
    }
  }
`;
export const queryReview = gql`
  query appReviews($id: ID!) {
    Review(id: $id) {
      id
      title
      description
      createdAt
      rating
      name
    }
  }
`;

const appReviews = graphql(queryAppReviews, {
  options: props => ({ variables: { id: props.appId } }),
  skip: props => !props.appId,
});

const review = graphql(queryReview, {
  options: props => ({ variables: { id: props.reviewId } }),
  skip: props => !props.reviewId,
});

export default compose(appReviews, review);
