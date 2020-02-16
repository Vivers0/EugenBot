import Discord from 'discord.js';
import ms from 'parse-ms';

module.exports.run = async (client, message, args, conn) => {
let timely = 200;
 let add = Date.now() + ((720 * 60) * 1000);
// let time = 10800;
let ms_time = ms(((720 / 60) / 1000) - (Date.now() - add));
console.log(`Слишком рано! Вы можете получить награду только через ${ms_time.hours}ч. ${ms_time.minutes}м. ${ms_time.seconds}с.`) 
// conn.query('SELECT * FROM account WHERE d_id = ?', [message.author.id], (err, rows) => {
//     if(err) throw err;
//     var money = rows[0].money;
//     var rTime = rows[0].timely_time;
//     if(rows[0].timely_time > 0){
//         return message.channel.send(new Discord.RichEmbed()
//         .setDescription(`Слишком рано! Вы можете получить награду только через ${ms_time.hours}ч. ${ms_time.minutes}м. ${ms_time.seconds}с.`)
//         .setColor("RED")
//         .setTimestamp())
//     } else {
//         conn.query('UPDATE account SET money = ? WHERE d_id = ?' [Number(rows[0].money)+timely, message.author.id]);
//         conn.query('UPDATE account SET timely_time = ? WHERE d_id = ?' [time, message.author.id]);
//         message.channel.send(new Discord.RichEmbed()
//         .setDescription(`Вы получили свои ${timely}`)
//         .setColor("GREEN"))
//     }
// })
}
module.exports.help = {
    name: 'timely'
}