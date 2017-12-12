import * as algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.APP_ID, process.env.API_KEY);
const apps = client.initIndex('apps');

const search = query => new Promise((resolve, reject) => {
  apps.search(query, (err, res) => {
    if (err) reject(err);
    resolve(res.hits.map(h => h._highlightResult.title.value)); // eslint-disable-line
  });
});

export default async (event) => {
  try {
    const suggestions = await search(event.data.term);

    return {
      data: { suggestions },
    };
  } catch (error) {
    return {
      error: 'Some error occured',
    };
  }
};
