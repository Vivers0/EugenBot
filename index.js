require("@babel/core").transform("code");

// Parameters //

import Discord from "discord.js";
import fs from 'fs';
import ytdl from 'ytdl-core';
import mysql from 'mysql';

const client = new Discord.Client();
const config = require("./config.json");
const serverStats = config.serverStats;




global.prefix = config.prefix;



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

// MySQL //

const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'eugen',
  password : '1234',
  database : 'eugen'
});

conn.connect(err => {
  if(err) {                                     // or restarting (takes a while sometimes).
    console.log('error when connecting to db:', err);
  }    
  console.log('MySQL COnnect!');
});

// Messages Loader //

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  
  let messageArray = message.content.split(" ");
 global.cmd = messageArray[0];
  global.args = messageArray.slice(1);
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) {
    commandfile.run(client, message, args, conn).catch(error => console.log(error.message))
  }
});


// Guild Stats //

client.on("guildMemberAdd", member => {

    conn.query(`SELECT * FROM account WHERE d_id = ?`, [member.id], (error, rows, fields) => {
      if(error) throw error;
        if(rows.length < 1) {
          conn.query(`INSERT INTO account (name, d_id, level, xp, money) VALUES (?,?,?,?,?)`, [member.user.tag,member.id,0,0,0], console.log);
              console.log(`Новый пользователь ${member.user.tag} на сервере ${member.guild.name} добавлен в базу!`);
        } 
      });  
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
