const config = require("../config.json");
const BotName = config.BotName;
const border = config.BorderUrl;
const avatar = config.Avatar;
const owner = config.BotStats.OwnerID;
const version = require("../package.json").version;
import { RichEmbed } from "discord.js";

module.exports.run = async (client, message, args) => {
  let msg = new RichEmbed()
    .setColor("#58f56a")
    .setAuthor(`Информация о боте ${BotName}`, avatar)
    .addField("Создатель:", "<@" + owner + ">", true)
    .addField("Присуствие:", `${client.guilds.size} серверов`, true)
    .addField("Обработка:", `${client.users.size} участников`, true)
    .addField("Версия:", version, true);

  if (border) msg.setImage(border);
  message.channel.send(msg);
};

module.exports.help = {
  name: "stats",
  category: "Help"
};
