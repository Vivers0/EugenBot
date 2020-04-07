import { RichEmbed } from "discord.js";

export function genXP()
{
    return Math.floor(Math.random() * 10) + 10;
};

export const noPermissions =
 new RichEmbed()
    .setColor("ORANGE")
    .setDescription("У вас нет прав на выполнение этой операции!")
    .setTimestamp();

export const ErrorSql =
    new RichEmbed()
    .setColor("ORANGE")
    .setDescription("Ошибка SQL базы! Обратитесь к администратору бота.")
    .setTimestamp();

export const noPeople =
    new RichEmbed()
        .setColor("ORANGE")
        .setDescription("Вы не указали участника!")
        .setTimestamp();

export const noPermissionsMe = 
    new RichEmbed()
        .setColor("RED")
        .setDescription("У меня нет прав!")
        .setTimestamp();