import * as algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.APP_ID, process.env.API_KEY);
const apps = client.initIndex('apps');

const search = query => new Promise((resolve, reject) => {
  const attributesToRetrieve = [
    'id',
    'title',
    'iconUrl',
    'imageUrl',
    'subtitle',
    'hasInAppPurchases',
    'price',
    'rating',
    'age',
    'versions',
  ];
  apps.search({ query, attributesToRetrieve }, (err, res) => {
    if (err) reject(err);
    resolve(res.hits);
  });
});

export default async (event) => {
  try {
    const results = await search(event.data.term);

    return {
      data: { results },
    };
  } catch (error) {
    return {
      error: 'Some error occured',
    };
  }
};
