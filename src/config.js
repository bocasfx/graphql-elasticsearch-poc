const elasticSearchPort = process.env.ELASTICSEARCH_PORT || 9200;
const graphQLPort = process.env.GRAPHQL_PORT || 9201;
const seedCmd = 'BABEL_ENV=dev ./node_modules/.bin/babel-node ./src/elastic50/seedData.js';
const graphQLCmd = 'BABEL_ENV=dev ./node_modules/.bin/babel-node ./src/elastic50/index.js';
const elasticSearchUrl = `http://localhost:${elasticSearchPort}/`;
const graphQLUrl = `http://localhost:${graphQLPort}/`;

module.exports = {
  elasticSearchPort,
  graphQLPort,
  seedCmd,
  graphQLCmd,
  elasticSearchUrl,
  graphQLUrl,
};
