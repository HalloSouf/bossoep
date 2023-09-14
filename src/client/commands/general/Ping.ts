import type { GatewayInteractionCreateDispatchData, WithIntrinsicProps } from '@discordjs/core';
import Command from '../../../structures/Command';
import type BosClient from 'src/client/BosClient';

/**
 * Represents the Ping command.
 * @extends {Command}
 */
class Ping extends Command {
  /**
   * Creates a new instance of the Ping command.
   * @param {BosClient} client - The Discord client instance for the command.
   */
  constructor(client: BosClient) {
    super(client, {
      name: 'ping',
      description: '🏓 Pong! Let me go around the world.'
    });
  }

  /**
   * Executes the Ping command.
   * @param {WithIntrinsicProps<GatewayInteractionCreateDispatchData>} payload - The data payload for the command.
   * @returns {Promise<void>} A promise that resolves when the command is executed.
   */
  public async exec(
    payload: WithIntrinsicProps<GatewayInteractionCreateDispatchData>
  ): Promise<void> {
    await payload.api.interactions.reply(payload.data.id, payload.data.token, {
      embeds: [
        {
          title: '🏓 Pong!',
          description: 'Just took a world trip within.',
          footer: {
            text: this.client.user?.username || '',
            icon_url: this.client.rest.cdn.avatar(
              this.client.user?.id || '',
              this.client.user?.avatar || ''
            )
          },
          timestamp: new Date().toISOString(),
          color: 0x3498db
        }
      ]
    });
  }
}

export default Ping;
