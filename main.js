import { Client } from 'discord.js';
import Commands from './commands.js';

const client = new Client();
const c = new Commands(client);
const token = 'ODE3NDEwMjYzNDQzMDQ2NDEx.YEJGoQ.X3TU9VJ9XB25xt0aYzgNtcCEWj0';
const prefix = '$';

client.once('ready', () => {
    console.log("deejay bot online!");
});

client.once('reconnecting', () => {
    console.log("deejay bot está reconectando!");
});

client.once('disconnect', () => {
    console.log("deejay bot está desconectando!");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'muido' || command === 'p' || command === 'play') {
        c.playRandomAudio(message, args);
    }
    else if (command === 'puleaiva' || command === 'skip' || command === 's') {
        c.tryAgain(message);
    }
    else if (command === 'medeixe' || command === 'leave' || command === 'l') {
        c.leaveChannel(message);
    }
})

client.login(token);