import Discord from 'discord.js';
import { stripIndents } from 'common-tags';
import { readdirSync } from 'fs';

module.exports.run = async (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
    .setThumbnail(client.user.displayAvatarURL);

    if(!args[0]){
        const categories = readdirSync("./lib/");
        embed.setDescription("Помощь");
        embed.setFooter(`Всего ${client.commands.size} команд`);

        categories.forEach(category => {
            const dir = client.commands.filter(c => c.config.category === category);
            const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
            try {
                embed.addField(`> ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``));
            } catch(e) {
                console.log(e)
            }
        })
        return message.channel.send(embed);
    } else {
        let command = client.commands.set(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
        if(!command) return message.channel.send(embed.setTitle("Команда не найдена!").setDescription(`Напишите ${prefix}help`))
        command = command.config;
        embed.setDescription(stripIndents`Префикс бота - \'${prefix}\'\n
        **Команда:** ${command.slice(0, 1).toUpperCase() + command.name.slice(1)}
        **Описание:** ${command.description || "Нет описания"}
        **Использование:** ${command.usage ? `\`${prefix}${command.name}${command.usage}\`` : "Не указано!"}
        **Доп. команды:** ${command.aliases ? command.aliases.join(" ") : "Нету."}`);

        return message.channel.send(embed);
    }
}
module.exports.help = {
    name: "help",
    category: "Help"
}