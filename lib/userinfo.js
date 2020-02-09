import Discord from 'discord.js';
import strftime from "strftime";
module.exports.run = async (client, message, args, conn) => {
let rUser = message.guild.member(message.mentions.users.first()) || message.author;
conn.query("SELECT * FROM account WHERE d_id = ?", [rUser.id], (error, rows, fields) => {
    let statuses = {
        online: "В сети",
        idle: "Нет на месте",
        dnd: "Не беспокоить",
        offline: "Не в сети"
    }
    let game;
    let desc = rows[0].descrip;
    let username = rows[0].name;
    let user_id = rows[0].d_id;
    let level = rows[0].level;
    let xp = rows[0].xp;
    let money = rows[0].money;
    // let bg = rows[0].background;
    // let badg = rows[0].badges;

    if(!rUser.presence.game) game = `**Имеет статус** ${statuses[rUser.presence.status]}`;
    else if(rUser.presence.game.type == 0 ) game = `**Игарет в** ${rUser.presence.game.name}`;
    else if(rUser.presence.game.type == 1) game = `**Стримит** [${rUser.presence.game.name}](${rUser.presence.game.url})`;
    else if(rUser.presence.game.type == 3) game = `**Слушает** ${rUser.presence.game.name}`;
    else if(rUser.presence.game.type == 4) game = `**Смотрит** ${rUser.presence.game.name}`;

    let embed = new Discord.RichEmbed()
    .setAuthor("Информация о пользователе " + username)
    .setTitle(desc)
    .setDescription(game)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("ID", user_id, true)
    .addField("Зарегистрировался:", `${strftime('%d.%m.%Y в %H:%M', new Date(rUser.createdTimestamp))} (${Math.round(Math.abs((new Date(message.createdTimestamp).getTime() - new Date(rUser.createdTimestamp).getTime()) / (1000 * 60 * 60 * 24)))} дн. назад)`, true)
    .addField("Зашел на сервер:", `${strftime('%d.%m.%Y в %H:%M', new Date(message.guild.member(rUser).joinedTimestamp))} (${Math.round(Math.abs((new Date(message.createdTimestamp).getTime() - new Date(message.guild.member(rUser).joinedTimestamp).getTime()) / (1000 * 60 * 60 * 24)))} дн. назад)`, true)
    .addField("Роли:", message.guild.member(rUser).roles.map(r => r.name).join('\n') || "Не имеет")
    // .addField("Level", level, true)
    // .addField("XP", xp, true)
    // .addField("Money", money, true)
    // .addField("Значки", badg, true)
    .setColor("#6ea8fa")
    .setFooter(message.guild.name + " | " + `${prefix}userinfo`, message.guild.displayAvatarURL);    
    
    // if(bg !== null) embed.setImage(bg);
    message.channel.send(embed);
});
}
module.exports.help = {
    "name": 'userinfo'
}