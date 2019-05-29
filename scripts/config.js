const seedCmd = 'BABEL_ENV=dev ./node_modules/.bin/babel-node ./elastic50/seedData.js';
const graphQLCmd = 'BABEL_ENV=dev ./node_modules/.bin/babel-node ./elastic50/index.js';
const elasticSearchUrl = 'http://localhost:9200/';
const graphQLUrl = 'http://localhost:9201/?query=%7B%0A%20%20__schema%20%7B%0A%20%20%20%20types%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D';

module.exports = {
  seedCmd,
  graphQLCmd,
  elasticSearchUrl,
  graphQLUrl,
};
