import { MessageEmbed } from 'discord.js';

module.exports.run = async (client, message, args) => {
    const msg = await message.channel.send(
        new MessageEmbed()
            .setDescription("🏓Выполняю........."));

    msg.edit(
        new MessageEmbed()
            .setAuthor("🏓Ping")
            .setDescription(Math.floor(msg.createdAt - message.createdAt) + "ms"))
}
module.exports.help = {
    name: "ping"
}