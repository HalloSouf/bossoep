import type { ICommand } from '../types/utils.interface';
import type BosClient from '../client/BosClient';
import { readdirSync } from 'fs';
import Logger from 'hallo-logger';
import { Routes } from '@discordjs/core';
import config from '../client/configuration';

/**
 * Manages Discord commands for the client.
 */
class CommandManager {
  /**
   * The Discord client instance for the command manager.
   */
  public client: BosClient;

  /**
   * The map of registered commands.
   */
  private commands: Map<string, ICommand> = new Map();

  private logger: Logger = new Logger({ prefix: 'Commands' });

  /**
   * Creates a new instance of the CommandManager class.
   * @param {BosClient} client - The Discord client instance for the command manager.
   */
  constructor(client: BosClient) {
    this.client = client;
  }

  /**
   * Gets a registered command by name.
   * @param {string} name - The name of the command to get.
   * @returns {ICommand | undefined} The command with the specified name, or undefined if not found.
   */
  public get(name: string): ICommand | undefined {
    return this.commands.get(name);
  }

  /**
   * Gets all registered commands.
   * @returns {Map<string, ICommand>} A map of all registered commands.
   */
  public get all(): Map<string, ICommand> {
    return this.commands;
  }

  /**
   * Loads commands from the specified path.
   * @param {string} path - The path to the directory containing command files.
   */
  public load(path: string): void {
    readdirSync(path).forEach((subDir: string) => {
      const files = readdirSync(`${path}/${subDir}/`).filter((file: string) =>
        file.endsWith('.js')
      );

      for (const file of files) {
        const CommandFile = require(`${path}/${subDir}/${file}`).default;
        const command: ICommand = new CommandFile(this.client);

        if (command.data.name && typeof command.data.name === 'string') {
          if (this.commands.get(command.data.name))
            return this.logger.error(`Command ${command.data.name} already exists!`);
          this.commands.set(command.data.name, command);
        }
      }
    });

    this.register();
  }

  /**
   * Registers all commands with the Discord API.
   */
  private async register(): Promise<void> {
    try {
      await this.client.rest.put(Routes.applicationCommands(config.clientId), {
        body: Array.from(this.commands.values()).map((command: ICommand) => command.data)
      });

      this.logger.info(`${this.commands.size} application commands are registered.`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return this.logger.error(e.message);
      }

      this.logger.error(e);
    }
  }
}

export default CommandManager;
