import Discord from "discord.js";
import superagent from "superagent";

module.exports.run = async (client, message, args) => {
  const { body } = await superagent.get(`https://nekos.life/api/v2/img/anal`);

  if (!message.channel.nsfw) return message.channel.send("Этот канал не NSFW");

  const msg = new Discord.RichEmbed()
    .setColor("#e319aa")
    .setTitle("Anal")
    .setImage(body.url);

  message.channel.send(msg);
};

module.exports.help = {
  name: "anal"
};
