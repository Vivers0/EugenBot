import { RichEmbed } from 'discord.js';

module.exports.run = async (client, message, args) => {
    const msg = await message.channel.send(
        new RichEmbed()
            .setDescription("🏓Выполняю........."));

    msg.edit(
        new RichEmbed()
            .setAuthor("🏓Ping")
            .setDescription(Math.floor(msg.createdAt - message.createdAt) + "ms"))
}
module.exports.help = {
    name: "ping"
}