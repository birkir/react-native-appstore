import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

export const query = gql`
  query app($id: ID) {
    App(id: $id) {
      ...AppFragment
      seller {
        name
      }
      age
      description
      type
      previews
      categories {
        title
      }
      # Star ratings
      star5: _reviewsMeta(filter: { rating: 5 }) { count }
      star4: _reviewsMeta(filter: { rating: 4 }) { count }
      star3: _reviewsMeta(filter: { rating: 3 }) { count }
      star2: _reviewsMeta(filter: { rating: 2 }) { count }
      star1: _reviewsMeta(filter: { rating: 1 }) { count }
      # Find one good review
      reviews(
        first: 1
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
  ${AppFragment}
`;

export const appWithProps = graphql(query, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
});
