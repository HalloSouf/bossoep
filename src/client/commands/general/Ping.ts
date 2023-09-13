import Command from '../../../structures/Command';

class Ping extends Command {
  constructor() {
    super({
      name: 'ping',
      description: '🏓 Pong! Let me go around the world.'
    });
  }

  public async exec() {
    console.log('gamers');
  }
}

export default Ping;
