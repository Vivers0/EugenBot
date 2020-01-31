require("@babel/core").transform("code");

// Parameters //

import Discord from "discord.js";
import fs from 'fs';
import ytdl from 'ytdl-core';
import mysql from 'mysql';

const client = new Discord.Client();
const config = require("./config.json");
const serverStats = config.serverStats;


// const conn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'eugen',
//   password : '1234',
//   database : 'eugen'
// });

global.prefix = config.prefix;

// conn.connect(err => {
//     if (err) throw err;   
//     console.log('MySQL COnnect!');
//   });

const acivities_list = ["!help", "ALPHA 1.0.0", "паша го сасаться"];

const { rainbow } = require("./src/functions");

client.commands = new Discord.Collection();
client.login(config.token);

// Ready //

client.on("ready", () => {
  setInterval(() => {
    let index = Math.floor(Math.random() * (acivities_list.length - 1) + 1);
    client.user.setActivity(acivities_list[index], { type: "WATCHING" });
  }, 10000);
  // Console.log
  console.log("Ok!");
  client.user.setStatus("idle");
});

// Loader //
fs.readdir("./lib", (err, files) => {
  if (err) console.log(err);
  var jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) console.log("Нет комманд для загрузки!!");
  console.log(`Найдено ${jsfiles.length} комманд`);
  jsfiles.forEach((f, i) => {
    var props = require(`./lib/${f}`);
    console.log(`${i + 1}.${f} загружена!`);
    client.commands.set(props.help.name, props);
  });
});

// Messages Loader //

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  global.args = messageArray.slice(1);

  if (
    message.content.toLowerCase().indexOf("вадим") > -1 ||
    message.content.toLowerCase().indexOf("вадим") > -1
  )
    message.react("🍻");

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) {
    commandfile.run(client, message, args).catch(error => console.log(error.message))
  }
});

// Voice Update //

client.on("voiceStateUpdate", (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;
  let voicetext = "⭐Голосовой онлайн: ";
  let ch = client.channels.get(serverStats.VoiceCountID);
  if (newUserChannel && !oldUserChannel) {
    ch.setName(
      `${voicetext}${newMember.guild.members.filter(m => m.voiceChannel).size}`
    );
  }
  if (!newUserChannel && oldUserChannel) {
    ch.setName(
      `${voicetext}${newMember.guild.members.filter(m => m.voiceChannel).size}`
    );
  }
});

// Guild Stats //

client.on("guildMemberAdd", member => {
  if (member.guild.id !== serverStats.guildID) return;
  client.channels
    .get(serverStats.memberCountID)
    .setName(
      `🏆Всего участников : ${
        member.guild.members.filter(m => !m.user.bot).size
      }`
    );
    // conn.query(`SELECT * FROM account WHERE d_id = ${member.id}`, (err, rows) => {
    //     if(rows.length < 1) {
    //       conn.query(`INSERT INTO account (d_id) VALUES (${member.id})`);
    //           console.log(`Новый пользователь ${member.user.tag} на сервере ${member.guild.name} добавлен в базу!`);
    //           console.log(err);
    //     }
    // });
    
});

client.on("guildMemberRemove", member => {
  if (member.guild.id !== serverStats.guildID) return;
  client.channels
    .get(serverStats.memberCountID)
    .setName(`🏆Всего участников : ${member.guild.memberCount}`);
});

// Logger //

client.on("userUpdate", async (oldUser, newUser) => {
  let log = await client.channels.get("613086479358623754");
  if (oldUser.displayAvatarURL != newUser.displayAvatarURL)
    log.send(
      `Пользователь с ID ${newUser.id} изменил свой аватар\n${newUser.displayAvatarURL}`
    );
  if (oldUser.tag != newUser.tag)
    log.send(
      `Пользователь с ID ${newUser.id} изменил свой тэг\n ${oldUser.tag} => ${newUser.tag}`
    );
  if (oldUser.message != newUser.messgae)
    log.send(
      `Пользователь с ID ${newUser.id} изменил сообщениеЖ\n Старое: ${oldUser.message}\n Новое: ${oldUser.message}`
    );
});

// Music //

client.on("message", async message => {
//   const voiceChannel = message.member.voiceChannel;
  let args = message.content.substring(prefix.length).split(" ");
//   const permissions = voiceChannel.permissionsFor(message.client.user);

  switch (args[0]) {
    case "play":
      function play(connection, message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(
          ytdl(server.queue[0], { filter: "audioonly" })
        );
        server.queue.shift();
        server.dispatcher.on("end", () => {
          if (server.queue[0]) {
            play(connection, message);
          } else {
            connection.disconnect();
          }
        });
      }
    //   if (!permissions.has("CONNECT")) {
    //     return msg.channel.send(
    //       "I cannot connect to your voice channel, make sure I have the proper permissions!"
    //     );
    //   }
    //   if (!permissions.has("SPEAK")) {
    //     return msg.channel.send(
    //       "I cannot speak in this voice channel, make sure I have the proper permissions!"
    //     );
    //   }

      if (!args[1]) {
        message.channel.send("нет ссылки");
        return;
      }
      if (!message.member.voiceChannel) {
        message.channel.send("вас нет в войсе");
        return;
      }
      if (!servers[message.guild.id])
        servers[message.guild.id] = {
          queue: []
        };
      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if (!message.guild.voiceConnection)
        message.member.voiceChannel.join().then(connection => {
          play(connection, message);
        });
      console.log(servers);
      break;
    case "skip":
      var server = servers[message.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      break;
    case "stop":
      var server = servers[message.guild.id];
      if (message.guild.voiceConnection) {
        for (let i = server.queue.length - 1; i >= 1; i--) {
          server.queue.splice(i, 1);
        }
        server.dispatcher.end();
        console.log("stopped the queue");
      }
      if (message.guild.connection) message.guild.voiceConnection.disconnect();
      break;
  }
});
