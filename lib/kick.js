import { RichEmbed } from 'discord.js';

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first();
    const member = message.guild.member(user);
    const reason = args[1];
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(new RichEmbed().setAuthor("Ошибка! У вас нет прав!").setColor("RED").setTimestamp());
    if(!member) return message.channel.send(new RichEmbed().setDescription("Ошибка! Вы не указали пользователя!").setColor("RED"));
    
    member.kick().then(() => {
        let embed = new RichEmbed()
        .setAuthor('Успешно!')    
        .addField('Участник:', user, true)
        .addField('Модератор:', "<@" + message.author.id + ">", true)
        .setColor("GREEN")
        .setTimestamp();
        if(reason != null) embed.addField('Причина', reason, true);
        message.channel.send(embed);
    }).catch(err => console.log(err));
}
module.exports.help = {
    name: "kick"
}