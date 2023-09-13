import type { RESTPostAPIApplicationCommandsJSONBody } from '@discordjs/core';

/**
 * Represents a Discord bot command.
 */
abstract class Command {
  /**
   * The data for the command.
   */
  public data: RESTPostAPIApplicationCommandsJSONBody;

  /**
   * Creates a new instance of the Command class.
   * @param data - The data for the command.
   */
  constructor(data: RESTPostAPIApplicationCommandsJSONBody) {
    this.data = data;
  }

  /**
   * Executes the command.
   */
  public abstract exec(): Promise<void>;
}

export default Command;
