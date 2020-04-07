import { RichEmbed } from "discord.js";
import { noPermissions, noPeople, noPermissionsMe } from '../src/functions';

module.exports.run = async (client, message, args, conn) => {
  const user = message.mentions.users.first();
  const member = message.guild.member(user);
  const reason = args[1];
  if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(noPermissionsMe);
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(noPermissions);
  if (!member) return message.channel.send(noPeople);
  if (member.id == message.author.id) return message.channel.send(new RichEmbed().setAuthor("Ошибка! Вы не можете забанить самого себя!").setColor("RED").setTimestamp());
  
  if (member.bot) return message.channel.send("ВЫ не можете забанить бота")
  member
    .ban({ reason: reason })
    .then(() => {
      let msg = new RichEmbed()
        .setColor("RED")
        .setAuthor("Пользователь забанен!", "https://imgur.com/BpSe1kX.png")
        .setThumbnail(member.avatarURL)
        .addField("Участник:", user.tag, true)
        .addField("ID", member.id, true)
        .setTimestamp();

        if(reason != null) msg.addField("Причина:", reason, true);
      message.channel.send(msg);
    })
    .catch(err => console.log(err));
};
module.exports.help = {
  name: "ban",
  category: "Moderation"
};