const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const wonxen = client.sistem;
const wonxenveri = client.veri;
module.exports = {
    Isim: "log",
    Komut: ["logs"],
    Kullanim: "log @param {wonxen} discord",
    Aciklama: "Log bot sahibinin komutudur.",
    Kategori: "Bot/Taç",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    if(!wonxen.Staff.some(id => message.author.id === id)) return;
    if(args[0] === "kur" || args[0] === "kurulum") {
        message.guild.channels.create(`</> Moderatıon Log`, {
        type: "category",
        permissionOverwrites: [  
        {id: `${message.guild.roles.everyone.id}`, deny: ['VIEW_CHANNEL']}]
        });
        message.guild.channels
        .create(`ban-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`kick-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`jail-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`şüpheli-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`yasaklıtag-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`mute-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`vmute-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`uyarı-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`tag-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`mesaj-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`ses-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`rol-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`kayıt-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels
        .create(`kayıtsız-log`, { type: "text" })
        .then(channel =>
        channel.setParent(
        message.guild.channels.cache.find(
        channel => channel.name === "</> Moderatıon Log"
        )));
        message.guild.channels.create(`</> Guard Log`, {
            type: "category",
            permissionOverwrites: [  
            {id: `${message.guild.roles.everyone.id}`, deny: ['VIEW_CHANNEL']}]
            });
            message.guild.channels
            .create(`database-acses`, { type: "text" })
            .then(channel =>
            channel.setParent(
            message.guild.channels.cache.find(
            channel => channel.name === "</> Guard Log"
            )));
            message.guild.channels
            .create(`guard-xl`, { type: "text" })
            .then(channel =>
            channel.setParent(
            message.guild.channels.cache.find(
            channel => channel.name === "</> Guard Log"
            )));
            message.guild.channels
            .create(`guard-xll`, { type: "text" })
            .then(channel =>
            channel.setParent(
            message.guild.channels.cache.find(
            channel => channel.name === "</> Guard Log"
            )));
            message.guild.channels
            .create(`denetim-log`, { type: "text" })
            .then(channel =>
            channel.setParent(
            message.guild.channels.cache.find(
            channel => channel.name === "</> Guard Log"
            )));
        message.channel.send(`Merhaba ${message.author.tag}, Log kurulumlarına başladım.`).then(message.react("👌"))
        }
    }
}