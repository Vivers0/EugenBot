import Discord from 'discord.js';

module.exports.run = async (client, message, args, conn) => {
if(message.author.id != "475259737613795328") return message.channel.send("У вас нет прав!");
let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
let money = Number(args[1]);
if(!rUser) return message.channel.send("Укажите пользователя!");
if(isNaN(args[1])) return message.channel.send("Введите сумму!");
conn.query('SELECT * FROM account WHERE d_id = ?', [rUser.id], (err, rows) => {
    if(err) throw err;
    let mon = Number(rows[0].money);
    conn.query('UPDATE account SET money = ? WHERE d_id = ?', [mon+money, rUser.id])
    message.channel.send(new Discord.RichEmbed().setDescription(`\`${message.author.username}\` подарил ${rUser}  \`${money}\``))
})

}
module.exports.help = {
    name: 'award'
}