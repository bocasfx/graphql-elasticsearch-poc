const chalk = require('chalk');
const { validateEnvironment, startService } = require('./service');

try {
  validateEnvironment();
  startService();
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(`Unable to start service: ${chalk.red(err)}`);
}
