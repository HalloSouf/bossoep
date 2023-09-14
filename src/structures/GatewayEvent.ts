import type { IGatewayEventOptions } from 'src/types/client.interface';
import type BosClient from '../client/BosClient';
import type { WithIntrinsicProps } from '@discordjs/core';

/**
 * Represents a Discord Gateway event.
 */
abstract class GatewayEvent<T> {
  /**
   * The Discord client instance for the event.
   */
  public client: BosClient;

  /**
   * The options for the events.
   */
  public opts: IGatewayEventOptions;

  /**
   * Creates a new instance of the GatewayEvent class.
   * @param {BosClient} client - The Discord client instance for the event.
   * @param {IGatewayEventOptions} opts - The options for the event.
   */
  constructor(client: BosClient, opts: IGatewayEventOptions) {
    this.client = client;
    this.opts = opts;
  }

  /**
   * Emits the event.
   * @param {WithIntrinsicProps<T>} payload - The data payload for the event.
   */
  public abstract emit(payload: WithIntrinsicProps<T>): Promise<void>;
}

export default GatewayEvent;
