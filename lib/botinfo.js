import { MessageEmbed } from "discord.js";
const config = require("../src/config.json");

module.exports.run = async (client, message, args) => {
  const BotName = config.BotName;
  const border  = config.BorderUrl;
  const avatar  = config.Avatar;
  const owner   = config.OwnerID;
  const version = require("../package.json").version;

  // let module_keys = Object.keys(config.dependencies);
  // console.log(module_keys)

  let msg = new MessageEmbed()
    .setColor("#58f56a")
    .setAuthor(`Информация о боте ${BotName}`, avatar)
    .addField("Создатель:", "<@" + owner + ">", true)
    .addField("Присуствие:", `${client.guilds.size} серверов`, true)
    .addField("Обработка:", `${client.users.size} участников`, true)
    .addField("Версия:", version, true);
    // .addField("Версия модулей:", module_keys, true);

  if (border) msg.setImage(border);
  console.log(message.guild.memberCount)
  // console.log(client.users)
  message.channel.send(msg);
};

module.exports.help = {
  name: "stats",
  category: "Help"
};
