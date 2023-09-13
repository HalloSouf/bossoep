import { GatewayDispatchEvents, WithIntrinsicProps, type GatewayInteractionCreateDispatchData } from '@discordjs/core';
import GatewayEvent from '../../structures/GatewayEvent';
import type BosClient from '../BosClient';

/**
 * Represents the InteractionCreate event
 * @extends {GatewayEvent<GatewayInteractionCreateDispatchData>}
 */
class InteractionCreate extends GatewayEvent<GatewayInteractionCreateDispatchData> {
  /**
   * Creates a new instance of the InteractionCreate class.
   * @param {BosClient} client - The Discord client instance for the event. 
   */
  constructor(client: BosClient) {
    super(client, {
      dispatch: GatewayDispatchEvents.InteractionCreate,
      once: false
    });
  }

  /**
   * Emits the InteractionCreate event.
   * @param {WithIntrinsicProps<GatewayInteractionCreateDispatchData>} payload - The data payload for the event.
   * @returns {Promise<void>} A promise that resolves when the event is emitted.
   */
  public async emit(payload: WithIntrinsicProps<GatewayInteractionCreateDispatchData>): Promise<void> {
    await payload.api.interactions.reply(payload.data.id, payload.data.token, {
      embeds: [{
        title: '🏓 Pong!',
        description: 'Just took a world trip within.',
        footer: {
          text: this.client.user?.username || '',
          icon_url: this.client.rest.cdn.avatar(this.client.user?.id || '', this.client.user?.avatar || '')
        },
        timestamp: new Date().toISOString()
      }]
    });
  }
}

export default InteractionCreate;
