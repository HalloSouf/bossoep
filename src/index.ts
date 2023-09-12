import BosClient from './client/BosClient';
import config from './client/configuration';
import Logger from 'hallo-logger';
import { GatewayDispatchEvents, type WithIntrinsicProps, type GatewayReadyDispatchData } from '@discordjs/core';

const startTime = Date.now();
const logger = new Logger();
const client = new BosClient({
  restVersion: config.restVersion,
  intents: config.intents
});

/**
 * Handles the ready event for the Discord client.
 * @param {Client} client - The Discord client instance
 */
client.once(GatewayDispatchEvents.Ready, (dispatch: WithIntrinsicProps<GatewayReadyDispatchData>) => {
  Logger.appReady(Date.now() - startTime, {
    '🎛️ Client ID': dispatch.data.user.id,
    '👷 Username': `${dispatch.data.user.username}#${dispatch.data.user.discriminator}`,
    '🗺️ Gateway URL': dispatch.data.resume_gateway_url
  });
});

client.authorize(config.token)
  .then((token) => logger.info(`Connection initialized with token ${token}`))
  .catch((e) => console.log(e));
