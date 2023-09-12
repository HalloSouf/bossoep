import type { GatewayIntentBits } from '@discordjs/core';

export interface IConfig {
  token: string;
  restVersion: string;
  intents: 0 | GatewayIntentBits;
}
