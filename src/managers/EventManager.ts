import { readdirSync } from 'fs';
import type BosClient from '../client/BosClient';

/**
 * Manages Discord events for the client.
 */
class EventManager {
  /**
   * The Discord client instance for the event manager.
   */
  public client: BosClient;

  /**
   * Creates a new intance of the EventManager class.
   * @param {BosClient} client - The Discord client instance for the event manager.
   */
  constructor(client: BosClient) {
    this.client = client;
  }

  /**
   * Registers events from the specified path.
   * @param {string} path - The path to the directory containing the events.
   */
  public register(path: string): void {
    const files = readdirSync(path).filter((file) => file.endsWith('.js'));

    for (const file of files) {
      const NewEvent = require(`${path}/${file}`).default;
      const event = new NewEvent(this.client);

      if (event.opts.once) {
        this.client.once(event.opts.dispatch, (...args) => event.emit(...args));
      } else {
        this.client.on(event.opts.dispatch, (...args) => event.emit(...args));
      }
    }
  }
}

export default EventManager;
