import {
  APIChatInputApplicationCommandInteraction,
  ApplicationCommandOptionType,
  GatewayInteractionCreateDispatchData,
  WithIntrinsicProps
} from '@discordjs/core';
import Command from '../../../structures/Command';
import type BosClient from '../../BosClient';

/**
 * Represents the Avatar command.
 * @extends Command
 */
class Avatar extends Command {
  /**
   * Creates a new instance of the Avatar command.
   * @param {BosClient} client - The Discord client instance for the command.
   */
  constructor(client: BosClient) {
    super(client, {
      name: 'avatar',
      description: 'Hey, say cheesseeeee!',
      options: [
        {
          name: 'user',
          type: ApplicationCommandOptionType.User,
          description: 'The user to get the avatar from.',
          required: true
        }
      ]
    });
  }

  /**
   * Executes the Avatar command.
   * @param {WithIntrinsicProps<GatewayInteractionCreateDispatchData>} payload - The data payload for the command.
   * @returns {Promise<void>} A promise that resolves when the command is executed.
   */
  public async exec(
    payload: WithIntrinsicProps<GatewayInteractionCreateDispatchData>
  ): Promise<void> {
    const { data, id, token } = payload.data as APIChatInputApplicationCommandInteraction;

    try {
      const userOption = data.options?.find((option) => option.name === 'user');

      if (userOption && userOption.type === ApplicationCommandOptionType.User) {
        const user = await payload.api.users.get(userOption.value);

        await payload.api.interactions.reply(id, token, {
          embeds: [
            {
              title: '🖼️ Someone said cheese?',
              image: {
                url: this.client.rest.cdn.avatar(user.id, user.avatar || '', {
                  extension: 'png',
                  size: 4096
                })
              },
              footer: {
                text: this.client.user?.username || '',
                icon_url: this.client.rest.cdn.avatar(
                  this.client.user?.id || '',
                  this.client.user?.avatar || ''
                )
              },
              timestamp: new Date().toISOString(),
              color: parseInt(user.avatar?.slice(0, 6) || 'ff0000', 16)
            }
          ]
        });
      } else {
        throw new Error('user_not_found', { cause: 'We could not find the mentioned user.' });
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        await payload.api.interactions.reply(id, token, {
          embeds: [
            {
              title: '🖼️ Someone said cheese?',
              description:
                (e.cause as string | undefined) ||
                'Something went wrong while trying to get the avatar.',
              footer: {
                text: this.client.user?.username || '',
                icon_url: this.client.rest.cdn.avatar(
                  this.client.user?.id || '',
                  this.client.user?.avatar || ''
                )
              },
              timestamp: new Date().toISOString(),
              color: parseInt('ed4e42', 16)
            }
          ]
        });

        return;
      }

      await payload.api.interactions.reply(id, token, {
        embeds: [
          {
            title: '🖼️ Someone said cheese?',
            description: 'Something went wrong while trying to get the avatar.',
            footer: {
              text: this.client.user?.username || '',
              icon_url: this.client.rest.cdn.avatar(
                this.client.user?.id || '',
                this.client.user?.avatar || ''
              )
            },
            timestamp: new Date().toISOString(),
            color: parseInt('ed4e42', 16)
          }
        ]
      });
    }
  }
}

export default Avatar;
