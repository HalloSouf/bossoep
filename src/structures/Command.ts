import type {
  GatewayInteractionCreateDispatchData,
  RESTPostAPIApplicationCommandsJSONBody,
  WithIntrinsicProps
} from '@discordjs/core';
import type BosClient from 'src/client/BosClient';

/**
 * Represents a Discord bot command.
 */
abstract class Command {
  /**
   * The data for the command.
   */
  public data: RESTPostAPIApplicationCommandsJSONBody;

  /**
   * The Discord client instance for the command.
   */
  public client: BosClient;

  /**
   * Creates a new instance of the Command class.
   * @param data - The data for the command.
   */
  constructor(client: BosClient, data: RESTPostAPIApplicationCommandsJSONBody) {
    this.client = client;
    this.data = data;
  }

  /**
   * Executes the command.
   */
  public abstract exec(
    payload: WithIntrinsicProps<GatewayInteractionCreateDispatchData>
  ): Promise<void>;
}

export default Command;
