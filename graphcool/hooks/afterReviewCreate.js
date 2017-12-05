import { fromEvent, FunctionEvent } from 'graphcool-lib'; // eslint-disable-line

const reviewQuery = `
  query review($id: ID!) {
    Review(id: $id) {
      app {
        id
        createdAt
        reviews {
          rating
        }
      }
    }
  }
`;

const appScoreQuery = `
  mutation appScore(
    $id: ID!
    $score: Float
  ) {
    updateApp(
      id: $id
      score: $score
    ) {
      id
    }
  }
`;

// Fired when review is created or updated
export default async (event) => {
  const reviewId = event.data.id;
  const graphcool = fromEvent(event);
  const api = graphcool.api('simple/v1');

  // Request app reviews
  const res = await api.request(reviewQuery, { id: reviewId });
  const { id, createdAt, reviews } = res.Review.app;

  // Calculate app score
  const scores = Array.from({ length: 5 })
    .map((_, n) => reviews.filter(({ rating }) => rating === (n + 1)).length * n);
  const monthsInAppStore = (+new Date() - +new Date(createdAt)) / (30.4375 * 86400 * 1000);
  const score = (scores.reduce((a, b) => (a + b), 0) / 15) - monthsInAppStore;
  const rating = reviews.map(r => r.rating).reduce((a, b) => (a + b), 0) / reviews.length;

  // Update app score
  await api.request(appScoreQuery, { id, score, rating });

  return { data: event.data };
};
