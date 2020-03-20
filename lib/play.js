import { RichEmbed } from 'discord.js';
import ytdl from 'ytdl-core';
import opusscript from 'opusscript';
const queue = new Map();

module.exports.run = async (client, message, args) => {
    let song = args[0], voice = message.member.voiceChannel

    if(!song) return message.channel.send(new RichEmbed().setAuthor("Ошибка! Вы не указали ссылку на трек!").setColor("RED"));
    if(!voice) return message.channel.send(new RichEmbed().setAuthor("Ошибка! Вы не вошли в голосовой канал!").setColor("RED"));

    // let valid = ytdl.validateID(song);
    // if(!valid) return message.channel.send(new RichEmbed().setAuthor("Ошибка! Ссылка недействительна!").setColor("ORANGE"));

    let connection = await voice.join()
    let guild_queue = queue.get(message.guild.id)
    if (!guild_queue) guild_queue = queue.set(message.guild.id, {songs: []}).get(message.guild.id)

    guild_queue.songs.push(song)
    message.channel.send(new RichEmbed().setAuthor("Трек добавлен в очередь!").setColor("GREEN"));
    if(guild_queue.songs.length < 2) play(connection, guild_queue.songs)

}
module.exports.help = {
    name: 'play'
}

async function play(connection, songs) {
    let music = await ytdl(songs[0], {filter: 'audioonly'})

    connection.playStream(music, {volume: 0.5})
    .on('end', () => {
        songs.shift()
        if (songs.length > 0) play(connection, songs)
        else connection.disconnect()
    })
}