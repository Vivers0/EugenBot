import { RichEmbed } from "discord.js";
import ms from "ms";

module.exports.run = async (client, message, args, conn) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if (!args[0]) return message.channel.send(
      new RichEmbed()
      .setAuthor("Вы не указали участника!"));

  if (!rUser) return message.channel.send(
      new RichEmbed()
      .setAuthor("Пользователь не найден!")
      .setColor("RED"));

  if (!args[1]) return message.channel.send(
      new RichEmbed()
      .setAuthor("Укажите время!"));

  let rreason = args.slice(2).join(" ");

  if (!rreason) return message.channel.send(
      new RichEmbed()
      .setAuthor("Укажите причину!"));

  const mutetime = ms(args[1]);

  let role = message.guild.roles.find(r => r.name === "Muted");
  if (!role) {
    role = await message.guild.createRole({
      name: "Muted",
      permissions: []
    });
    message.guild.channels.forEach(async (channel, id) => {
      await channel.overwritePermissions(role, {
        SEND_MESSAGES: false,
        SEND_TTS_MESSAGES: false,
        SPEAK: false,
        STREAM: false,
        ADD_REACTIONS: false
      });
    });
  }

  conn.query(`SELECT * FROM mutes WHERE user_id = ?`, [rUser.id],(error, rows, fields) => {
      if (error) throw error;
      if (rUser.roles.has(role.id) | rows.length > 1){
         return message.channel.send(
          new RichEmbed()
          .setAuthor("пользователь уже в муте!"));

      } else {
        conn.query(`INSERT INTO mutes (guild, user_id, time) VALUES (${message.guild.id}, ${rUser.id}, ${parseInt(Date.now() + mutetime)})`);
        if (error) console.log(error);
        rUser
        .addRole(role)
        .then(() => {
          message.channel.send(
            new RichEmbed()
              .setAuthor("Мут участника")
              .setThumbnail("https://imgur.com/5wuWSnq.png")
              .addField("Участник:", rUser, true)
              .addField("Модератор:", "<@" + message.member.id + ">", true)
              .addField("Время:", ms(mutetime), true)
              .addField("Причина:", rreason, true)
              .setColor("ORANGE")
              .setTimestamp()
          );
        });
      }
    }
  );
  
  setTimeout(() => {
    rUser.removeRole(role);
    conn.query(
      `DELETE FROM mutes WHERE guild = ${message.guild.id} AND user_id = ${rUser.id}`
    );
  }, mutetime);
};
module.exports.help = {
  name: "mute"
};
