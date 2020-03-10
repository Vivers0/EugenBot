import Discord from 'discord.js';

module.exports.run = async (client, message, args, conn) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let money = Number(args[1]);

    if (!rUser) return message.channel.send("Укажите пользователя!");
    if (isNaN(args[1])) return message.channel.send("Введите сумму!");
    conn.query('SELECT * FROM account WHERE d_id = ?', [message.author.id], (err, rows) => {
        if (err) throw err;
        let mon = Number(rows[0].money);
        if (mon < money) {
            return message.channel.send(new Discord.RichEmbed().setDescription("У вас не хватает денег!").setColor("ORANGE"));
        } else {
            conn.query('UPDATE account SET money = ? WHERE d_id = ?', [mon-money, message.author.id]);
            conn.query('SELECT * FROM account WHERE d_id = ?', [rUser.id], (err, rows) => {
                if(err) throw err;
                let mon = Number(rows[0].money);
                conn.query('UPDATE account SET money = ? WHERE d_id = ?', [mon+money, rUser.id])
                message.channel.send(new Discord.RichEmbed().setDescription(`${message.author.tag} передал ${rUser} \`${money}\``).setColor("GREEN"));
            });
        }
    });
}

module.exports.help = {
    name: 'take'
}