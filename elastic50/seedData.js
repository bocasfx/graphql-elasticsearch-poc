import elasticsearch from 'elasticsearch';
import seedData from './seedData.json';
import { elasticSearchPort } from '../config';

const client = new elasticsearch.Client({
  host: `localhost:${elasticSearchPort}`,
  log: 'trace',
});

const body = [];
seedData.forEach((row) => {
  const { id, ...restData } = row;
  body.push({ index: { _index: 'projects', _type: 'projects', _id: id } }, restData);
});

client
  .bulk({
    index: 'projects',
    type: 'projects',
    body,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Data successfully seeded!');
  });
