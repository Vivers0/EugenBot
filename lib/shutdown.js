const config = require('../src/config.json');
import { noPermissions } from '../src/functions';

module.exports.run = async (client, message, args) =>  {
    if (message.author.id != config.OwnerID) return message.channel.send(noPermissions);

    try{
        await message.channel.send("Выключение...");
        process.exit();
    } catch(e) {
        message.channel.get('688072140318179328').send("Ошибка при выключении бота:" + e.message);
    }
}
module.exports.help = {
    name: "shutdown"
}