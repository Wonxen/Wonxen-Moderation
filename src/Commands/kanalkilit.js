const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const wonxen = client.veri;
const wonxenveri = client.veri;
const wonxez = client.bots;
require('discord-inline-reply');
module.exports = {
    Isim: "Kanal",
    Komut: ["kanal"],
    Kullanim: "Kanal kilit",
    Aciklama: "kanal kilit.",
    Kategori: "Yetkili Komutları",
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
  onRequest: async function (client, message, args, guild, author, auth) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.").then(sil => sil.delete({timeout: 5000}));
    if (args[0] == "kilit") {
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        }).then(async() => {
            await message.channel.send("Kanal başarıyla kilitlendi.", message.author, message.channel)
        })
    }

    if (args[0] == "aç") {
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        }).then(async() => {
            await message.channel.send("Kanalın kilidi başarıyla açıldı.", message.author, message.channel)
        })
    }
}
}