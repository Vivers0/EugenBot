import { MessageEmbed } from "discord.js";

export function genXP()
{
    return Math.floor(Math.random() * 10) + 10;
};

export const noPermissions =
 new MessageEmbed()
    .setColor("ORANGE")
    .setDescription("У вас нет прав на выполнение этой операции!")
    .setTimestamp();

export const ErrorSql =
    new MessageEmbed()
    .setColor("ORANGE")
    .setDescription("Ошибка SQL базы! Обратитесь к администратору бота.")
    .setTimestamp();