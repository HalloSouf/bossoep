import { WebSocketManager } from '@discordjs/ws';
import { REST, DiscordAPIError } from '@discordjs/rest';
import type { IClientOptions } from '../types/client.interface';
import { GatewayIntentBits, Client } from '@discordjs/core';

/**
 * Represents a Discord client with additional functionality.
 * @extends Client
 */
class BosClient extends Client {
  /**
   * The REST API client or interacting with the Discord API.
   * @type {REST}
   */
  public rest: REST;

  /**
   * The WebSocket manager for handling the Discord gateway.
   * @type {WebSocketManager}
   */
  public gateway: WebSocketManager;

  /**
   * Creates a new instance of the BosClient class.
   * @param opts - The options to use when creating the client.
   */
  constructor(opts: IClientOptions) {
    const rest = new REST({ version: opts.restVersion });

    const ws = new WebSocketManager({
      token: '',
      intents: opts.intents,
      rest
    });

    super({ rest: rest, gateway: ws });

    this.rest = rest;
    this.gateway = ws;
  }

  /**
   * Authorizes the client with the provided token.
   * @param {string} token - The token to use for authorization.
   * @returns A masked version of the token used for authorization.
   * @throws An error if the provided token is invalid.
   */
  public async authorize(token: string): Promise<string> {
    try {
      this.rest.setToken(token);
      this.gateway.options.token = token;

      await this.gateway.connect();
      return `${token.slice(0, 6)}.****`;
    } catch (e: unknown) {
      if (e instanceof DiscordAPIError) {
        if (e.status === 401) {
          throw new Error('Invalid token provided', {
            cause: 'The provided token is flagged as invalid by the Discord API.'
          });
        }
      }

      throw e;
    }
  }
}

export default BosClient;
