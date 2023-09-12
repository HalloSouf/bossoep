import type { GatewayIntentBits } from '@discordjs/core';

export interface IClientOptions {
  restVersion: string;
  intents: 0 | GatewayIntentBits;
}
