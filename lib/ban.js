import { MessageEmbed } from "discord.js";
import { noPermissions } from '../src/functions';

module.exports.run = async (client, message, args, conn) => {
  const user   = message.mentions.users.first();
  const member = message.guild.member(user);
  const reason = args[1];

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(noPermissions).then(m => m.delete(5000));

  if (member.id == message.author.id) return message.channel.send(
    new MessageEmbed()
    .setAuthor("Ошибка! Вы не можете забанить самого себя!")
    .setColor("RED")
    .setTimestamp());

  if (!member) return message.channel.send("Вы не указали пользователя!");

  member
    .ban({ reason: reason })
    .then(() => {
      let msg = new MessageEmbed()
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

    conn.query("SELECT * FROM bans WHERE user_id = ?", [member.id], (error, rows, fields) => {
      if(error) throw error;
      if(rows.length < 1){
        conn.query("INSERT INTO bans (user_id, reason) VALUES (?, ?)", [member.id, reason])
      }
    })
};

module.exports.help = {
  name: "ban",
  category: "Moderation"
};
