import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import faker from 'faker'; // eslint-disable-line
import fetch from 'node-fetch'; // eslint-disable-line
import sampleSize from 'lodash/sampleSize';
import gql from 'graphql-tag';
import config from '../src/config.env';

// Create new Apollo client
const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.API_URL, fetch }),
  cache: new InMemoryCache(),
});

// Static
const CATEGORIES = {
  GAMES: [
    'Action',
    'Adventure',
    'AR Games',
    'Arcade',
    'Board',
    'Card',
    'Casino',
    'Family',
    'Indie',
    'Kids',
    'Music',
    'Puzzle',
    'Racing',
    'Role Playing',
    'Simulation',
    'Sports',
    'Strategy',
    'Trivia',
    'Word',
  ],
  APPS: [
    'AR Apps',
    'Books',
    'Business',
    'Education',
    'Entertainment',
    'Finance',
    'Food & Drink',
    'Health & Fitness',
    'Kids',
    'Lifestyle',
    'Magazines & Newspapers',
    'Medical',
    'Music',
    'Navigation',
    'News',
    'Photo & Video',
    'Productivity',
    'Reference',
    'Shopping',
    'Social Networking',
    'Sports',
    'Travel',
    'Utilities',
    'Weather',
  ],
};

const COLLECTIONS = {
  APPS: {
    FEATURED: {
      title: 'Featured',
      rows: 1,
      size: 8,
      type: 'FEATURED',
    },
    GREAT_ON_IPHONEX: {
      title: 'Great on iPhone X',
      rows: 3,
      size: 24,
    },
    NEW_APPS_WE_LOVE: {
      title: 'New Apps We Love',
      rows: 3,
      size: 24,
    },
    GOBBLE_UP_THESE_RECIPES: {
      title: 'Gobble Up These Recipes',
      rows: 1,
      type: 'PROMO_TOP',
      size: 24,
    },
    TOP_PAID: {
      title: 'Top Paid',
      type: 'TOP_PAID',
      rows: 3,
    },
    TOP_FREE: {
      title: 'Top Free',
      type: 'TOP_FREE',
      rows: 3,
    },
    TOP_CATEGORIES: {
      title: 'Top Categories',
      type: 'TOP_CATEGORIES',
    },
    IN_APP_PURCHASES: {
      title: 'In-App Purchases',
      type: 'LARGE_TILE',
      size: 20,
    },
    HACK_THANKSGIVING_SHOPPING: {
      title: 'Hack Thanksgiving Shopping',
      type: 'PROMO_BOTTOM',
      size: 5,
      rows: 1,
    },
    BEST_NEW_UPDATES: {
      title: 'Best New Updates',
      size: 24,
    },
    LETS_TALK: {
      title: 'Let\'s Talk',
      rows: 3,
      size: 24,
    },
    SAY_IT_WITH_STICKER: {
      title: 'Say it with sticker',
      rows: 3,
      size: 24,
    },
  },
  GAMES: {
    FEATURED: {
      title: 'Featured',
      size: 8,
      rows: 1,
      type: 'FEATURED',
    },
    GREAT_ON_IPHONEX: {
      title: 'Great on iPhone X',
      rows: 3,
      size: 24,
    },
    NEW_GAMES_WE_LOVE: {
      title: 'New Games We Love',
      rows: 3,
      size: 24,
    },
    GREAT_FOR_GAMENIGHT: {
      title: 'Great for Game Night',
      rows: 1,
      type: 'PROMO_TOP',
      size: 5,
    },
    TOP_PAID: {
      title: 'Top Paid',
      type: 'TOP_PAID',
      rows: 3,
    },
    TOP_FREE: {
      title: 'Top Free',
      type: 'TOP_FREE',
      rows: 3,
    },
    TOP_CATEGORIES: {
      title: 'Top Categories',
      type: 'TOP_CATEGORIES',
    },
    TASTY_TREATS: {
      title: 'Tasty Treats',
      rows: 1,
      type: 'PROMO_BOTTOM',
      size: 5,
    },
    BEST_NEW_UPDATES: {
      title: 'Best New Updates',
      rows: 3,
      size: 24,
    },
    IN_APP_PURCHASES: {
      title: 'In-App Purchases',
      type: 'LARGE_TILE',
      size: 20,
    },
    PLAY_WITH_STICKERS: {
      title: 'Play with Stickers',
      rows: 3,
      size: 24,
    },
    PREVIOUS_EDITORS_CHOISES: {
      title: 'Previous Editor\'s Choises',
      rows: 2,
      size: 15,
    },
  },
};

const createSellerMutation = gql`
  mutation createSeller(
    $name: String!
  ) {
    createSeller(
      name: $name
    ) {
      id
    }
  }
`;

const createCategoryMutation = gql`
  mutation createCategory(
    $title: String!
    $type: AppType!
    $score: Float
  ) {
    createCategory(
      title: $title
      type: $type
      score: $score
    ) {
      id
    }
  }
`;

const createAppMutation = gql`
  mutation createApp(
    $iconUrl: String!
    $imageUrl: String!
    $title: String!
    $subtitle: String!
    $description: String!
    $price: Float
    $hasInAppPurchases: Boolean!
    $age: Int!
    $previews: [String!]
    $reviews: [AppreviewsReview!]
    $versions: [AppversionsVersion!]
    $sellerId: ID!
    $categoriesIds: [ID!]
    $compatibility: [String!]
    $languages: [String!]
    $type: AppType
    $size: Int
    $score: Float
    $rating: Float
  ) {
    createApp(
      iconUrl: $iconUrl
      imageUrl: $imageUrl
      title: $title
      subtitle: $subtitle
      description: $description
      price: $price
      hasInAppPurchases: $hasInAppPurchases
      age: $age
      previews: $previews
      reviews: $reviews
      versions: $versions
      sellerId: $sellerId
      categoriesIds: $categoriesIds
      compatibility: $compatibility
      languages: $languages
      type: $type
      size: $size
      score: $score
      rating: $rating
    ) {
      id
    }
  }
`;

const createStoryMutation = gql`
  mutation createStory(
    $app: ID
    $apps: [ID!]
    $backgroundColor: String!
    $displayType: StoryDisplayType!
    $date: DateTime!
    $imageUrl: String!
    $legend: String!
    $title: String!
  ) {
    createStory(
      appId: $app
      appsIds: $apps
      backgroundColor: $backgroundColor
      displayType: $displayType
      date: $date
      imageUrl: $imageUrl
      legend: $legend
      title: $title
    ) {
      id
    }
  }
`;

const createCollectionMutation = gql`
  mutation createCollection(
    $appsIds: [ID!]
    $title: String!
    $appType: AppType!
    $position: Int!
    $rows: Int!
    $type: CollectionType!
  ) {
    createCollection(
      appsIds: $appsIds
      title: $title
      appType: $appType
      position: $position
      rows: $rows
      type: $type
    ) {
      id
    }
  }
`;

const generateSeller = () => ({
  name: faker.company.companyName(),
});

const generateReviewsAndScore = () => {
  const reviews = Array.from({ length: 25 + faker.random.number(25) })
    .map(() => ({
      rating: 1 + faker.random.number(4),
      name: faker.name.findName(),
      ...faker.random.arrayElement([{}, {}, {
        title: faker.lorem.words(2),
        description: faker.lorem.paragraph(),
      }]),
    }));

  // Calculate app score
  const scores = Array.from({ length: 5 })
    .map((_, n) => reviews.filter(({ rating }) => rating === (n + 1)).length * n);
  const score = (scores.reduce((a, b) => (a + b), 0) / 15);
  const rating = reviews.map(r => r.rating).reduce((a, b) => (a + b), 0) / reviews.length;

  return {
    reviews,
    rating,
    score,
  };
}

const generateApp = (type, categories = [], sellerId) => ({
  iconUrl: faker.image.avatar(),
  imageUrl: faker.image.imageUrl(),
  title: faker.commerce.productName(),
  subtitle: faker.lorem.words(faker.random.number(4)),
  description: faker.lorem.paragraph(),
  price: faker.random.arrayElement([
    null,
    parseFloat(faker.commerce.price(1, 10)) - 0.01,
  ]),
  sellerId,
  categoriesIds: sampleSize(categories, 5 + faker.random.number(5)),
  hasInAppPurchases: faker.random.boolean(),
  age: faker.random.arrayElement([0, 7, 10, 14, 16, 18]),
  compatibility: sampleSize(['iphone', 'ipad', 'watch'], 1 + faker.random.number(2)),
  languages: ['en-us'],
  size: faker.random.number(100) * faker.random.number(1024) * faker.random.number(1024),
  type,
  previews: Array.from({ length: 3 + faker.random.number(3) })
    .map(() => faker.random.image()),
  versions: Array.from({ length: 1 + faker.random.number(10) })
    .map(() => ({
      version: faker.system.semver(),
      date: faker.date.past(1),
      changelog: faker.lorem.paragraph(),
    })),
  ...generateReviewsAndScore(),
});

const generateStory = (apps = []) => ({
  backgroundColor: `${faker.internet.color()}`,
  date: faker.date.recent(10),
  imageUrl: faker.image.imageUrl(),
  legend: `${faker.hacker.ingverb()} ${faker.hacker.noun()}`,
  title: faker.hacker.phrase(),
  displayType: 'DEFAULT',
  ...faker.random.arrayElement([
    {},
    {},
    { app: faker.random.arrayElement(apps) },
    { apps: sampleSize(apps, 5 + faker.random.number(5)) },
  ]),
});

async function createCategories(type, categories) {
  console.log('\nCreate categories', type, categories.length);
  return Promise.all(categories.map(async (title) => {
    const { data } = await client.mutate({
      mutation: createCategoryMutation,
      variables: {
        title,
        type,
        score: Math.random(),
      },
    });
    console.log('Created category', data.createCategory.id);
    return data.createCategory.id;
  }));
}

async function createSellers(size) {
  console.log('\nCreate sellers', size);
  return Promise.all(Array.from({ length: size }).map(async () => {
    const { data } = await client.mutate({
      mutation: createSellerMutation,
      variables: generateSeller(),
    });
    console.log('Created seller', data.createSeller.id);
    return data.createSeller.id;
  }));
}

async function createApps(type, size, categories, sellers) {
  console.log('\nCreate apps', type, size);
  return Promise.all(Array.from({ length: size }).map(async () => {
    const seller = faker.random.arrayElement(sellers);
    const { data } = await client.mutate({
      mutation: createAppMutation,
      variables: generateApp(type, categories, seller),
    });
    console.log('Created app', data.createApp.id);
    return data.createApp.id;
  }));
}

async function createStories(size, gameApps, appApps) {
  console.log('\nCreate stories', size);
  return Promise.all(Array.from({ length: size }).map(async () => {
    const apps = faker.random.arrayElement([gameApps, appApps]);
    const { data } = await client.mutate({
      mutation: createStoryMutation,
      variables: generateStory(apps),
    });
    console.log('Created story', data.createStory.id);
    return data.createStory.id;
  }));
}

async function createCollections(type, collections, apps) {
  console.log('\nCreate Collection', type);
  return Promise.all(Object.values(collections).map(async (collection, i) => {
    const { data } = await client.mutate({
      mutation: createCollectionMutation,
      variables: {
        appsIds: sampleSize(apps, collection.size || 16),
        appType: type,
        position: i,
        title: collection.title,
        type: collection.type || 'DEFAULT',
        rows: collection.rows || 1,
      },
    });
    console.log('Created collection', data.createCollection.id);
    return data.createCollection.id;
  }));
}

// Start processing
(async () => {

  console.log('Seeding database');

  // Seed Count
  const COUNT = process.env.COUNT || 25;

  // Generate categories
  const categoriesGames = await createCategories('GAME', CATEGORIES.GAMES);
  const categoriesApps = await createCategories('APP', CATEGORIES.APPS);

  // Generate 500 sellers
  const sellers = await createSellers(COUNT * 1.25);

  // Generate 1000 apps (500/500 app/game)
  const apps = await createApps('APP', COUNT, categoriesApps, sellers);
  const games = await createApps('GAME', COUNT, categoriesGames, sellers);

  // Generate 25 stories
  await createStories(25, apps, games);

  // Generate collections
  await createCollections('GAME', COLLECTIONS.GAMES, games);
  await createCollections('APP', COLLECTIONS.APPS, apps);

})();
