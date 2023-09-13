import BosClient from './client/BosClient';
import config from './client/configuration';
import Logger from 'hallo-logger';

const logger = new Logger();
const client = new BosClient({
  restVersion: config.restVersion,
  intents: config.intents,
  token: config.token
});

client
  .authorize()
  .then(() => logger.info('Connection initialized with token.'))
  .catch((e) => console.log(e));
