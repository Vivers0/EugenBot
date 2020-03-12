require("@babel/core").transform("code");

// Parameters //

import Discord from "discord.js";
import mysql from 'mysql';
import fs from 'fs';

import { genXP } from './src/functions';
import config from './src/config';

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Global Commands //
global.prefix = config.prefix;



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
  console.log(`Запущены все ${jsfiles.length} модулей без ошибок!`)
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

// Member Add //


client.on("guildMemberAdd", async member => {
  conn.query(`SELECT * FROM account WHERE d_id = ?`, [member.id], (error, rows, fields) => {
    if (error) throw error;
      if (rows.length < 1) {
        conn.query(`INSERT INTO account (d_id, level, xp, money, descrip) VALUES (?,?,?,?,?)`, [member.id,0,0,0,'Введите описание, команда \`!drcr\`'], console.log);
    } 
  });
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
    } else {
      conn.query(`INSERT INTO account (d_id, level, xp, money, descrip) VALUES (?,?,?,?,?)`, [member.id,0,0,0, 'Введите описание, команда \`!drcr\`'], console.log);
    }

    if (nxtlvl <= xp) {
      conn.query('UPDATE account SET level = ? WHERE d_id = ?', [curlvl+1, message.author.id])
    }
  });


  const messageArray = message.content.split(" ");
  const cmd          = messageArray[0];
  const args         = messageArray.slice(1);

  let commandfile  = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args, conn).catch(error => console.log(error.message));
});


// Guild Stats //


