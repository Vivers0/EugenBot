import { MessageEmbed } from 'discord.js';
import { ErrorSql } from '../src/functions';
module.exports.run = async (client, message, args, conn) => {
    try{
    let desc = message.content.slice(6);
    if (!desc) return message.channel.send(
        new MessageEmbed()
        .setAuthor("Укажите описание!"));

   conn.query(`SELECT * FROM account WHERE d_id = ?`, [message.author.id], (error, rows, fields) => {
        if (error) {
            message.channel.send(ErrorSql);
        }

        if (rows.length) {
        conn.query(`UPDATE account SET descrip = ? WHERE d_id = ?`, [desc, message.author.id])
        message.channel.send(
            new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`\`${message.author.tag}\` вы успешно обновили описание профиля!`)
        )
        }
    });
} catch (err) {
    console.log(err)
}
}

module.exports.help = {
    "name": 'crdr'
}