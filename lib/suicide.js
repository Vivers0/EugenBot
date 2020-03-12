const images = [
  "https://imgur.com/CpehYbQ.gif",
  "https://imgur.com/Rhp7cBE.gif"
];
import { MessageEmbed } from "discord.js";

module.exports.run = async (client, message, args) => {
  let num = Math.floor(Math.random() * images.length);

  const msg = new MessageEmbed()
    .setColor("#e319aa")
    .setDescription(`<@${message.author.id}> **совершил суицыд**`)
    .setImage(images[num])
    .setFooter(`Совершить суицыд - ${prefix}suicide`);

  message.channel.send(msg);
  return;
};

module.exports.help = {
  name: "suicide"
};
