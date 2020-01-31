import Discord from "discord.js";
import moment from "moment";
module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  const member = message.guild.member(user);
  const reason = args[1];
  if (!member) return message.channel.send("Вы не указали пользователя!");
  member
    .ban({ reason: reason })
    .then(() => {
      let msg = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor("Пользователь забанен!", "https://imgur.com/BpSe1kX.png")
        .setThumbnail(member.avatarURL)
        .addField("Участник:", user.tag, true)
        .addField("ID", member.id, true)
        .setFooter(moment().format("LTS"));
      message.channel.send(msg);
    })
    .catch(err => console.log(err));
};
module.exports.help = {
  name: "ban"
};
