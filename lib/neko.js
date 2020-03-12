import superagent from "superagent";
import { MessageEmbed } from "discord.js";

module.exports.run = async (client, message, args) => {
  let { body } = await superagent.get("https://neko-love.xyz/api/v1/neko");

  let embed = new MessageEmbed()
    .setTitle("Random Neko")
    .setImage(body.url)
    .setColor("#f7104a");

  message.channel.send(embed);
};
module.exports.help = {
  name: "neko"
};
