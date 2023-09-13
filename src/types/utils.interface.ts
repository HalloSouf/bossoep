import type { RESTPostAPIApplicationCommandsJSONBody } from '@discordjs/core';

export interface ICommand {
  data: RESTPostAPIApplicationCommandsJSONBody;
  execute: (args: string[]) => Promise<void>;
}
