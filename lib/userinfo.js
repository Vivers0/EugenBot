import Discord from 'discord.js';
module.exports.run = async (client, message, args, conn) => {
let rUser = message.guild.member(message.mentions.users.first()) || message.author;
conn.query("SELECT * FROM account WHERE d_id = ?", [rUser.id], (error, rows, fields) => {
    let desc = rows[0].descrip;
    let username = rows[0].name;
    let user_id = rows[0].d_id;
    let level = rows[0].level;
    let xp = rows[0].xp;
    let money = rows[0].money;
    // let bg = rows[0].background;
    // let badg = rows[0].badges;

    let embed = new Discord.RichEmbed()
    .setAuthor("Информация о пользователе " + username)
    .setTitle(desc)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("ID", user_id, true)
    .addField("Level", level, true)
    .addField("XP", xp, true)
    .addField("Money", money, true)
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