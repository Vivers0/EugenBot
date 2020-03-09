require("@babel/core").transform("code");

// Parameters //

import Discord from "discord.js";
import mysql from 'mysql';
import fs from 'fs';

import genXP from './functions';

const client = new Discord.Client();
const config = require("./src/config.json");

global.prefix = config.prefix;

const acivities_list = ["!help", "ALPHA 1.0.0"];

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
  client.user.setStatus("dnd");
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

  conn.query('SELECT * FROM account WHERE d_id = ?', [message.author.id], (err, rows) => {
    if(err) throw err;
    let curlvl = Number(rows[0].level);
    let nxtlvl = Number(rows[0].level * 1000);
    let xp = Number(rows[0].xp);
    let xpp = xp + Number(genXP());
    if(rows.length >= 1){
      conn.query(`UPDATE account SET xp = ? WHERE d_id = ?`, [xpp, message.author.id])
    }
    if(nxtlvl <= xp){
      conn.query('UPDATE account SET level = ? WHERE d_id = ?', [curlvl+1, message.author.id])
    }
  })
  
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
        } 
      });
      
      conn.query("SELECT * FROM bans WHERE user_id = ?", [member.id], (error, rows, fields) => {
        if (error) throw error;
        if(rows.length > 0) {
          member.guild.owner.send(new Discord.RichEmbed().setAuthor("Внимание!").setDescription("На ваш сервер зашел человек, который находится в бан-листе у нашего бота.").addBlankField().addField("Участник:", "<@" + rows[0].user_id + ">", true).addField("Причина:", rows[0].reason, true).setColor("RED"));
        }
      })
});

