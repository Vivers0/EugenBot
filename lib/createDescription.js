import Discord from 'discord.js';

module.exports.run = async (client, message, args, conn) => {
    let desc = message.content.slice(6);
    if (!desc) return message.channel.send(
        new Discord.RichEmbed()
        .setAuthor("Укажите описание!"));

   conn.query(`SELECT * FROM account WHERE d_id = ?`, [message.author.id], (error, rows, fields) => {
        if (error) throw error;
        if (rows.length !== null) {
        conn.query(`UPDATE account SET descrip = ? WHERE d_id = ?`, [desc, message.author.id], console.log)
        }
    });
}

module.exports.help = {
    "name": 'crdr'
}