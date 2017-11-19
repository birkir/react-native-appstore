import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

export default gql`
  query allApps(
    $first: Int!
    $after: String
  ) {
    allApps(
      orderBy: score_DESC
      first: $first
      after: $after
    ) {
      ...AppFragment
    }
  }
  ${AppFragment}
`;

// client
// .query({ query: allAppsQuery })
// .then((data) => {
//   const { allApps } = data.data;
//   const apps = allApps.map((app) => {
//     // Group scores in 0-5 ratings
//     const scores = Array.from({ length: 5 })
//       .map((_, num) => app.reviews.filter(({ rating }) => rating === num).length * num);
//     // Months in app store
//     const ageScore = (+new Date() - +new Date(app.createdAt)) / (30.4375 * 86400 * 1000);
//     // Average scores down and subtract months
//     const score = (scores.reduce((a, b) => (a + b), 0) / 15) - ageScore;
//     return { ...app, score };
//   });
//   console.log(apps.map(app => `${app.title}: ${app.score}`));
// })
// .catch(console.error);
