/* eslint-disable no-console */
const { exec, execSync } = require('child_process');
const waitOn = require('wait-on');
const fs = require('fs');
const chalk = require('chalk');
const { seedCmd, graphQLCmd, elasticSearchUrl, graphQLPort, elasticSearchPort } = require('../config');

const elasticBinPath = process.env.ELASTICSEARCH_BIN_PATH;
const checkmark = chalk.green('\u2713');

const validateEnvironment = () => {
  if (!elasticBinPath) {
    console.log('\nThe ELASTICSEARCH_BIN_PATH environment variable is not set.\n');
    return;
  }

  if (!fs.existsSync(elasticBinPath)) {
    console.log(`\nThe path specified in ELASTICSEARCH_BIN_PATH does not exist: ${chalk.red(elasticBinPath)}\n`);
  }
};

const startService = async () => {
  process.stdout.write(`\nStarting Elasticsearch on port ${elasticSearchPort}... `);
  exec(elasticBinPath, (elasticErr) => {
    if (elasticErr) {
      console.log(`Unable to start Elasticsearch: ${chalk.red(elasticErr)}`);
    }
  });

  await waitOn({ resources: [elasticSearchUrl] });

  console.log(checkmark);
  process.stdout.write('Seeding data... ');

  execSync(seedCmd);
  console.log(checkmark);
  process.stdout.write(`Starting GraphQL server on port ${graphQLPort}... `);

  exec(graphQLCmd, (graphQLErr) => {
    if (graphQLErr) {
      console.log(graphQLErr);
    }
  });

  // TODO: Currently not able to wait for the GraphiQL server since it's returning 405.
  console.log(checkmark);
};

module.exports = {
  startService,
  validateEnvironment,
};
