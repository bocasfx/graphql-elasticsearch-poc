import elasticsearch from 'elasticsearch';
import seedData from './seedData.json';

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

const body = [];
seedData.forEach(row => {
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
    console.log('Data successfully seeded!');
  });
