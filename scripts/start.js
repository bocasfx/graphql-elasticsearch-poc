const { exec } = require('child_process');
const waitOn = require('wait-on');
const fs = require('fs');
const chalk = require('chalk');

const elasticBinPath = process.env.ELASTIC_BIN_PATH;
const seedCmd = 'BABEL_ENV=dev ./node_modules/.bin/babel-node ./elastic50/seedData.js';
const graphQLCmd = 'BABEL_ENV=dev nodemon -e js --exec ./node_modules/.bin/babel-node ./elastic50/index.js';
const elasticOpts = {resources: ['http://localhost:9200/']};
const graphQLOpts = {resources: ['http://localhost:9201/']};
const checkmark = chalk.green('\u2713');

if (!elasticBinPath) {
  console.log('\nThe ELASTIC_BIN_PATH environment variable is not set.\n');
  return;
}

console.log(elasticBinPath)

if (!fs.existsSync(elasticBinPath)) {
  console.log(`\nThe path specified in ELASTIC_BIN_PATH does not exist: ${chalk.red(elasticBinPath)}\n`);
  return;
}

process.stdout.write('\nStarting Elasticsearch on port 9200... ')
exec(elasticBinPath, (elasticErr) => {
  if (elasticErr) {
    console.log(`Unable to start Elasticsearch: ${chalk.red(elasticErr)}`);
    return;
  }
});

const doIt = async () => {
  await waitOn(elasticOpts);

  console.log(checkmark);
  process.stdout.write('Seeding data... ')

  exec(seedCmd, async (seedErr) => {
    if (seedErr) {
      console.log(seedErr);
      return;
    }
    console.log(checkmark);
    process.stdout.write('Starting GraphQL server on port 9201... ')

    exec(graphQLCmd, (graphQLErr) => {
      if (graphQLErr) {
        console.log(graphQLErr);
        return;
      }
    });

    await waitOn(graphQLOpts);
    console.log(checkmark);
  });
};

doIt();
