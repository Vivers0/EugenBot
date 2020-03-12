import { MessageEmbed } from 'discord.js';
import { noPermissions, ErrorSql } from '../src/functions'; 
const config = require('../src/config.json')

module.exports.run = async (client, message, args, conn) => {
    try{
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let money = Number(args[1]);

        if (!rUser) return message.channel.send("Укажите пользователя!");
        if (isNaN(args[1])) return message.channel.send("Введите сумму!");

        conn.query('SELECT * FROM account WHERE d_id = ?', [rUser.id], (err, rows) => {
            if (message.author.id != config.OwnerID) {
                return message.channel.send(noPermissions).then(m => m.delete(5000));
            } else {
                let mon = Number(rows[0].money);
                conn.query('UPDATE account SET money = ? WHERE d_id = ?', [mon+money, rUser.id])
                message.channel.send(new MessageEmbed().setDescription(`\`${message.author.username}\` подарил ${rUser}  \`${money}\``))
            }
        })
    } catch (err) {
        message.channel.send(ErrorSql);
    }
}  
module.exports.help = {
    name: 'award'
}