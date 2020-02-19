import Discord from 'discord.js';

module.exports.run = async (client, message, args, conn) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let role = message.guild.roles.find(r => r.name === "Muted");

    conn.query("SELECT * FROM mutes WHERE user_id = ?", [rUser.id], (error, rows, fields) => {
        if(!rUser.roles.has(role.id) | !rows.length > 1){
            return message.channel.send(new Discord.RichEmbed().setAuthor("Ошибка! Пользователь не в муте!").setColor("ORANGE").setTimestamp());
        } else {
            conn.query(`DELETE FROM mutes WHERE guild = ${message.guild.id} AND user_id = ${rUser.id}`);
            message.channel.send(new Discord.RichEmbed().setAuthor("Успешно!").setColor("GREEN").setTimestamp());
            rUser.removeRole(role);
        }
    })
}
module.exports.help = {
    name: 'unmute'
}