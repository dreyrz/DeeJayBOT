import pkg from 'discord.js-commando';
const { Command } = pkg;
import ytdl from 'ytdl-core';

// const queue = ["1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10",
//     "11",
//     "12",
//     "13",
//     "14",
//     "15",
//     "16",
//     "17",
//     "18",
//     "19",
//     "20"];
const queue = [];

console.log(queue);

export default class Commands extends Command {
    constructor(client) {
        super(client, {
            name: 'deejaybot',
            group: 'misc',
            memberName: 'deejaybot',
            description: 'jv description'
        })
    }

    help() {
        console.log("vij vei que preguiça de explicar\n");
    }

    playRandomAudio(message, url) {
        //queue.push(url);
        const voice = message.member.voice;
        if (!voice.channelID) {
            return message.reply('vij vei entre no canal vá');
        }
        else {
            voice.channel.join().then((connection) => {
                queue.push(url);
                const maxIndex = (queue.length) - 1;
                const minIndex = 0;
                const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
                console.log(`Indice do áudio aleatório: ${randomIndex}`);

                const dispatcher = connection.play(ytdl(queue[randomIndex], { filter: "audioonly" }));
               //const dispatcher = connection.play(`assets/audios/${randomIndex}.mp3`);
                
                dispatcher.on('start', () => {
                    console.log("DeeJayBOT está tocando um áudio.\n");
                });
                setTimeout(() => {
                    dispatcher.setVolume(2);
                }, 1000);
                dispatcher.on("finish", () => {
                    console.log("DeeJayBOT parou de tocar o áudio.\n");
                    this.leaveChannel(message);
                    var timeout = Math.floor(Math.random() * 100);
                    if (timeout<5) timeout = 5;
                    console.log(`DeeJayBOT irá esperar ${timeout} segundos.\n`);
                    setTimeout(() => {
                        this.playRandomAudio(message);
                    }, timeout * 1000);
                })

                dispatcher.on('error', console.error);

            });
        }
    }

    tryAgain(message, url) {
        this.playRandomAudio(message, url);
    }

    leaveChannel(message) {
        const server = message.guild;
        if (server.me.voice.channel) {
            server.voice.connection.disconnect();
            console.log("saindo do canal");
        }
        else {
            message.reply("nem em um canal eu to vei");
        }
    }
}