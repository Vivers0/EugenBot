import { RichEmbed } from 'discord.js';

module.exports.run = async (client, message, args, conn) => {
    let timely = 200;
    let profile = 1000 * 60 * 180;
    
    conn.query('SELECT * FROM account WHERE d_id = ?', [message.author.id], (err, rows) => {
        if (err) throw err;
        var money = Number(rows[0].money);
        var rTime = Number(rows[0].timely_time);
        let s = Math.floor((rTime-Date.now()) / 1000);
        
        if (rTime > Date.now()) {
            var h = Math.floor((s / 60) / 60);
            var m = Math.floor(s / 60) - (h * 60);
            var sec = Math.floor(s % 60);
            
            return message.channel.send(new RichEmbed()
            .setDescription(`Слишком рано! Вы можете получить награду только через ${h}ч. ${m}м. ${sec}с.`)
            .setColor("RED"))
        } else {
            conn.query(`UPDATE account SET money = ${money+timely} WHERE d_id = ${message.author.id}`);
            conn.query(`UPDATE account SET timely_time = ${Date.now()+profile} WHERE d_id = ${message.author.id}`);
            message.channel.send(new RichEmbed()
            .setDescription(`Вы получили свои ${timely}`)
            .setColor("GREEN"))
        }
    })
}

module.exports.help = {
    name: 'timely'
}