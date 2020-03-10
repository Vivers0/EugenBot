import config from '../src/config.json';

module.exports.run = async (client, message, args) =>  {
    if (message.author.id != config.OwnerID) return message.channel.send("У вас нет прав!");

    try{
        await message.channel.send("Выключение...");
        process.exit();
    } catch(e) {
        message.channel.send("Ошибка :" + e.message);
    }
}
module.exports.help = {
    name: "shutdown"
}