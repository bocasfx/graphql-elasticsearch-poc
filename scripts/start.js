const elasticPath = process.argv[2] || '/Users/rodolfopalacios/Development/elasticsearch-7.1.0/bin/elasticsearch';
const { exec } = require('child_process');
const waitOn = require('wait-on');

const seedCmd = 'BABEL_ENV=dev ./node_modules/.bin/babel-node ./elastic50/seedData.js';
const graphQLCmd = 'BABEL_ENV=dev nodemon -e js --exec ./node_modules/.bin/babel-node ./elastic50/index.js';

console.log('Starting Elasticsearch...')
exec(elasticPath, (elasticErr) => {
  if (elasticErr) {
    console.log(elasticErr);
    return;
  }
});

const elasticOpts = {
  resources: [
    'http://localhost:9200/'
  ]
};

const graphQLOpts = {
  resources: [
    'http://localhost:9201/'
  ]
};

const doIt = async () => {
  await waitOn(elasticOpts);

  console.log('Elasticsearch running on port 9200.');
  console.log('Seeding data.')

  exec(seedCmd, async (seedErr) => {
    if (seedErr) {
      console.log(seedErr);
      return;
    }
    console.log('Data seed completed.');
    console.log('Starting GraphQL server...')

    exec(graphQLCmd, (graphQLErr) => {
      if (graphQLErr) {
        console.log(graphQLErr);
        return;
      }
    });

    await waitOn(graphQLOpts);
    console.log('GraphQL server running on port 9201.');
  });
};

doIt();
