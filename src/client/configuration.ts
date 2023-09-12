import { GatewayIntentBits } from '@discordjs/core';
import type { IConfig } from '../types/global.interface';
import { config as insertEnv } from 'dotenv';
insertEnv();

const config: IConfig = {
  restVersion: process.env.REST_VERSION || '10',
  token: process.env.CLIENT_TOKEN || '',
  intents:
    GatewayIntentBits.MessageContent |
    GatewayIntentBits.GuildMessages |
    GatewayIntentBits.GuildMembers
};

export default config;
