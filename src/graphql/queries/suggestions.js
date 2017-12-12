import gql from 'graphql-tag';

const query = gql`
  query searchSuggestions(
    $term: String
  ) {
    searchSuggestions(term: $term) {
      suggestions
    }
  }
`;

export default query;
