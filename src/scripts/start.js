const chalk = require('chalk');
const { isEnvironmentValid, startService } = require('./service');

try {
  if (!isEnvironmentValid()) {
    return;
  }
  startService();
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(`Unable to start service: ${chalk.red(err)}`);
}
