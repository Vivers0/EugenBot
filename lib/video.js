import Discord from "discord.js";

module.exports.run = async (client, message, args) => {
  if (!message.member.voiceChannel) return message.channel.send("Сначала зайдите в голосовой канал!");

  let videoo = new Discord.RichEmbed()
    .setAuthor(`${message.member.voiceChannel.name}`)
    .setDescription(`[Войти в sex комнату](https://discordapp.com/channels/${message.guild.id}/${message.member.voiceChannel.id})`)
    .setColor("#66CED1")
    .setFooter(`${prefix}video`);

  await message.channel.send(videoo);
};

module.exports.help = {
  name: "video"
};
