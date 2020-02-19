import Discord from 'discord.js';

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send(new Discord.RichEmbed().setAuthor("Ошибка! Недостаточно прав!").setColor("ORANGE"))
        .then(m => m.delete(5000));
    }
    if(isNaN(args[0]) || parseInt(args[0]) <= 0){
        return message.channel.send(new Discord.RichEmbed().setAuthor("Вы ввели не число. Я не понимаю, сколько нужно очистить.").setColor("ORANGE"))
        .then(m => m.delete(5000));
    }
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send(new Discord.RichEmbed().setAuthor("Ошибка! У вас нет прав на редактирование сообщений!").setColor("RED"))
        .then(m => m.delete(5000));
    }

    let deleteNum;
    if(parseInt(args[0]) > 100){
        deleteNum = 100;
    } else {
        deleteNum = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteNum, true)


}
module.exports.help = {
    name: "clear",
    category: "Moderation"
}