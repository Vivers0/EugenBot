import { MessageEmbed } from "discord.js";
import superagent from "superagent";

module.exports.run = async (client, message, args) => {
  const { body } = await superagent.get(`https://nekos.life/api/v2/img/kiss`);

  let rUser = message.mentions.users.first();

  const msg = new MessageEmbed()
    .setColor("#e319aa")
    .setDescription(
      rUser
        ? `${message.author} **целует** ${rUser}`
        : `${message.author} целует себя`
    )
    .setImage(body.url)
    .setFooter(`Поцеловать пользователя - ${prefix}kiss`);

  message.channel.send(msg);
  return;
};

module.exports.help = {
  name: "kiss"
};
