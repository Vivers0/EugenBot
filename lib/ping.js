import Discord from 'discord.js';

module.exports.run = async (client, message, args) => {
    const msg = await message.channel.send(new Discord.RichEmbed().setDescription("🏓Выполняю........."));
    msg.edit(new Discord.RichEmbed()
    .setAuthor("🏓Ping")
    .setDescription(Math.floor(msg.createdAt - message.createdAt) + "ms"))
}
module.exports.help = {
    name: "ping"
}