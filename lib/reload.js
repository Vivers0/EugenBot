import { RichEmbed } from 'discord.js';

module.exports.run = async (client, message, args) => {
    if(message.author.id != '475259737613795328') return message.channel.send("У вас нет прав!");
    if(!args[0]) return message.channel.send("Введите название модуля!");
    let cmd = args[0].toLowerCase();
    try {
        delete require.cache[require.resolve(`./${cmd}.js`)];
        client.commands.delete(cmd);
        const pull = require(`./${cmd}.js`);
        client.commands.set(cmd, pull);
    } catch(e) {
        return message.channel.send("Ошибка: " + e.message);
    }
    message.channel.send('Модуль `' + `${args[0].toLowerCase()}` + '` успешно перезагружен!');
}
module.exports.help = {
    name: "reload"
}