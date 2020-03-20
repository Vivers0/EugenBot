import Discord from "discord.js";
const image = [
  "http://i.imgur.com/MWZUMNX.gif",
  "https://gifs.gachi.ru/hug/100.gif",
  "https://cdn.weeb.sh/images/S1OAduQwZ.gif",
  "https://gifs.gachi.ru/hug/6.gif",
  "https://cdn.weeb.sh/images/Hk0yFumwW.gif",
  "https://gifs.gachi.ru/hug/117.gif",
  "https://cdn.weeb.sh/images/r1v2_uXP-.gif",
  "https://gifs.gachi.ru/hug/149.gif",
  "https://cdn.weeb.sh/images/Hk3ox0tYW.gif"
];

module.exports.run = async (client, message, args) => {
  let num = Math.floor(Math.random() * image.length);
  let rUser = message.mentions.users.first();

  let msg = new RichEmbed()
    .setColor("#e319aa")
    .setDescription(
      rUser
        ? `${message.author} **обнимает** ${rUser}`
        : `${message.author} обнимает себя`
    )
    .setImage(image[num])
    .setFooter(`Обнять пользователя - ${prefix}hug`);

  message.channel.send(msg);

  return;
};

module.exports.help = {
  name: "hug",
  category: "Fun"
};
