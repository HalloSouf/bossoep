import type { GatewayDispatchEvents, GatewayIntentBits } from '@discordjs/core';

export interface IClientOptions {
  restVersion: string;
  intents: 0 | GatewayIntentBits;
  token: string;
}

export interface IGatewayEventOptions {
  dispatch: GatewayDispatchEvents;
  once: boolean;
}
