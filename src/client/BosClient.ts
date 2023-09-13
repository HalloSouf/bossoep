import { WebSocketManager } from '@discordjs/ws';
import { REST, DiscordAPIError } from '@discordjs/rest';
import type { IClientOptions } from '../types/client.interface';
import { Client } from '@discordjs/core';
import EventManager from '../managers/EventManager';
import { join } from 'path';
import CommandManager from '../managers/CommandManager';

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
   * The event manager for handling events.
   * @type {EventManager}
   */
  public events: EventManager = new EventManager(this);

  /**
   * The command manager for handling commands.
   * @type {CommandManager}
   */
  public commands: CommandManager = new CommandManager(this);

  /**
   * Creates a new instance of the BosClient class.
   * @param {IClientOptions} opts - The options to use when creating the client.
   */
  constructor(opts: IClientOptions) {
    const rest = new REST({ version: opts.restVersion})
      .setToken(opts.token);

    const ws = new WebSocketManager({
      token: opts.token,
      intents: opts.intents,
      rest
    });

    super({ rest: rest, gateway: ws });

    this.rest = rest;
    this.gateway = ws;

    this.events.register(join(__dirname, './events'));
    this.commands.load(join(__dirname, './commands'));
  }

  /**
   * Authorizes the client with the provided token.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the client was authorized.
   * @throws An error if the provided token is invalid.
   */
  public async authorize(): Promise<boolean> {
    try {
      await this.gateway.connect();
      return true;
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
