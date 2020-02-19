import Discord from 'discord.js';

module.exports.run = async (client, message, args) => {
    if(message.member.hasPermission('BAN_MEMBERS', 'ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setDescription("Ошибка! У вас нет прав!").setColor('RED'));
    let bUser = await client.fetchUser(args[0]);
    if(!bUser) return message.channel.send(new Discord.RichEmbed().setDescription('Участник не найден!').setColor('RED'));

    message.guild.unban(bUser).then(() => {
        message.channel.send(new Discord.RichEmbed()
        .setDescription(`${bUser} был успешно разбанен!`)
        .setColor('GREEN'))
    }).catch(err => console.log(err));
}
module.exports.help = {
    name: 'unban'
}