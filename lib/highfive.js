import Discord from "discord.js";
const images = [
  "https://cdn.weeb.sh/images/r1MMK1msb.gif",
  "https://cdn.weeb.sh/images/S1kKq1XiZ.gif",
  "https://cdn.weeb.sh/images/ByRqqy7jb.gif",
  "https://cdn.weeb.sh/images/Hy_U1QBT-.gif",
  "https://cdn.weeb.sh/images/HkYzKyXjW.gif",
  "https://cdn.weeb.sh/images/rJenY1XsW.gif",
  "https://media1.tenor.com/images/0c23b320822afd5b1ce3faf01c2b9b69/tenor.gif?itemid=14137078",
  "https://media1.tenor.com/images/ce85a2843f52309b85515f56a0a49d06/tenor.gif?itemid=14137077",
  "https://i.pinimg.com/originals/3e/0f/1d/3e0f1d8dd46cc38b2db9df829caccf56.gif",
  "https://media.giphy.com/media/KNGlioVGvwBXO/200.gif",
  "https://media1.tenor.com/images/16267f3a34efb42598bd822effaccd11/tenor.gif?itemid=14137081",
  "https://media3.giphy.com/media/3oEjHV0z8S7WM4MwnK/giphy.gif",
  "https://thumbs.gfycat.com/SmugLonelyAltiplanochinchillamouse-size_restricted.gif",
  "https://i.imgur.com/Pr1rEzX.gif"
];

module.exports.run = async (client, message, args) => {
  let rUser = message.mentions.users.first();
  let num = Math.floor(Math.random() * images.length);

  const msg = new RichEmbed()
    .setColor("#e319aa")
    .setDescription(
      rUser
        ? `${message.author} **даёт пять** ${rUser}`
        : `${message.author} даёт пять себе`
    )
    .setImage(images[num])
    .setFooter(`Дать пять пользователю - ${prefix}highfive`);

  message.channel.send(msg);
  return;
};

module.exports.help = {
  name: "highfive",
  category: "Fun",
  description: "Дать пять пользователю",
  usage: `${prefix}highfive @пользователь`
};
