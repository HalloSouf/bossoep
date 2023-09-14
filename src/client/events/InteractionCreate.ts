import { GatewayDispatchEvents, WithIntrinsicProps, type GatewayInteractionCreateDispatchData, APIChatInputApplicationCommandInteractionData } from '@discordjs/core';
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
    if (!payload.data.data) return;

    const command = this.client.commands.get((payload.data.data as APIChatInputApplicationCommandInteractionData).name);
    if (command) command.exec(payload);
  }
}

export default InteractionCreate;
