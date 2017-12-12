import gql from 'graphql-tag';

const query = gql`
  query search(
    $term: String
  ) {
    search(term: $term) {
      results
    }
  }
`;

export default query;
