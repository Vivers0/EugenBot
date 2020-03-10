require("@babel/core").transform("code");

// Parameters //

import Discord from "discord.js";
import mysql from 'mysql';
import fs from 'fs';

import genXP from './src/functions';
import config from './src/config';

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Global Commands //
global.prefix = config.prefix;
global.cmd = messageArray[0];
global.args = messageArray.slice(1);
global.messageArray = message.content.split(" ");


// Login //
client.login(config.token);



// ________________________________________________________ //



// Ready //

client.on("ready", () => {
  setInterval(() => {
    let i = Math.floor(Math.random() * (config.Acivities_list.length - 1) + 1);
    client.user.setActivity(config.Acivities_list[i],
      { 
        type: "WATCHING" 
      });
  }, 10000);

  // Console log
  console.log(`Бот ${client.user.username} запущен.`);
  client.user.setStatus("online");
});

// Loader //
fs.readdir("./lib", (err, files) => {
  if (err) console.log(err);
  var jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) console.log("Нет комманд для загрузки!!");
  jsfiles.forEach((f, i) => {
    var props = require(`./lib/${f}`);
    client.commands.set(props.help.name, props);
  });
  console.log("Все модули запущены без ошибок!")
});

// MySQL //

const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'eugen',
  password : '1234',
  database : 'eugen'
});

conn.connect(err => {
  if (err) console.log('error when connecting to db:', err);
  console.log('MySQL Connect!');
});

// Messages Loader //

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  conn.query('SELECT * FROM account WHERE d_id = ?', [message.author.id], (err, rows) => {
    if (err) throw err;
    let curlvl = Number(rows[0].level);
    let nxtlvl = Number(rows[0].level * 1000);
    let xp     = Number(rows[0].xp);
    let xpp    = xp + Number(genXP());

    if (rows.length >= 1) {
      conn.query(`UPDATE account SET xp = ? WHERE d_id = ?`, [xpp, message.author.id])
    }

    if (nxtlvl <= xp) {
      conn.query('UPDATE account SET level = ? WHERE d_id = ?', [curlvl+1, message.author.id])
    }
  });
  

  let commandfile  = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args, conn).catch(error => console.log(error.message));
});


// Guild Stats //

client.on("guildMemberAdd", member => {
  conn.query(`SELECT * FROM account WHERE d_id = ?`, [member.id], (error, rows, fields) => {
    if (error) throw error;
      if (rows.length < 1) {
        conn.query(`INSERT INTO account (name, d_id, level, xp, money) VALUES (?,?,?,?,?)`, [member.user.tag,member.id,0,0,0], console.log);
    } 
  });
    
  conn.query("SELECT * FROM bans WHERE user_id = ?", [member.id], (error, rows, fields) => {
    if (error) throw error;
    if (rows.length > 0) {
      member.guild.owner.send(new Discord.RichEmbed().setAuthor("Внимание!").setDescription("На ваш сервер зашел человек, который находится в бан-листе у нашего бота.").addBlankField().addField("Участник:", "<@" + rows[0].user_id + ">", true).addField("Причина:", rows[0].reason, true).setColor("RED"));
    }
  });
});

