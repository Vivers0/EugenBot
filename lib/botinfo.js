import config from '../src/config.json';
import Discord from "discord.js";
const BotName = config.BotName;
const border = config.BorderUrl;
const avatar = config.Avatar;
const owner = config.OwnerID;
const version = require("../package.json").version;


module.exports.run = async (client, message, args) => {
  let msg = new Discord.RichEmbed()
    .setColor("#58f56a")
    .setAuthor(`Информация о боте ${BotName}`, avatar)
    .addField("Создатель:", "<@" + owner + ">", true)
    .addField("Присуствие:", `${client.guilds.size} серверов`, true)
    .addField("Обработка:", `${client.users.size} участников`, true)
    .addField("Версия:", version, true)
    .addField("Версия модулей:", "NodeJS: 12.15.0\ndiscord.js: 11.5.1\nsuperagent: 5.2.1\nmysql: 2.18.1\nms: 2.1.1\nytdl-core: 1.0.7", true);

  if (border !== "") msg.setImage(border);
  message.channel.send(msg);
};

module.exports.help = {
  name: "stats",
  category: "Help"
};
