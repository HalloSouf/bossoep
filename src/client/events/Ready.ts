import {
  ActivityType,
  GatewayDispatchEvents,
  GatewayReadyDispatchData,
  PresenceUpdateStatus,
  WithIntrinsicProps
} from '@discordjs/core';
import GatewayEvent from '../../structures/GatewayEvent';
import type BosClient from '../BosClient';
import Logger from 'hallo-logger';

/**
 * Represents the Ready event
 * @extends {GatewayEvent<GatewayReadyDispatchData>}
 */
class Ready extends GatewayEvent<GatewayReadyDispatchData> {
  /**
   * Creates a new instance of the Ready class.
   * @param {BosClient} client - The Discord client instance for the event
   */
  constructor(client: BosClient) {
    super(client, {
      dispatch: GatewayDispatchEvents.Ready,
      once: true
    });
  }

  /**
   * Emits the Ready event.
   * @param {WithIntrinsicProps<GatewayReadyDispatchData>} payload - The data payload for the event.
   * @returns {Promise<void>} A promise that resolves when the event is emitted.
   */
  public async emit(payload: WithIntrinsicProps<GatewayReadyDispatchData>): Promise<void> {
    Logger.appReady(Math.round(process.uptime()), {
      '🎛️ Client ID': payload.data.user.id,
      '👷 Username': `${payload.data.user.username}#${payload.data.user.discriminator}`,
      '🗺️ Gateway URL': payload.data.resume_gateway_url
    });

    await this.client.updatePresence(0, {
      since: Date.now(),
      activities: [{ name: 'Mario kart', type: ActivityType.Competing }],
      afk: false,
      status: PresenceUpdateStatus.Online
    });
  }
}

export default Ready;
