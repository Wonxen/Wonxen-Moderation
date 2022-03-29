const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const wonxen = client.veri;
const wonxez = client.bots;
require('discord-inline-reply');
module.exports = {
    Isim: "isimtemizle",
    Komut: ["it"],
    Kullanim: "isimtemizle <@wonxen/ID>",
    Aciklama: "Belirlenen üyenin isim ve yaş geçmişini temizler.",
    Kategori: "Yönetim Komutları",
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
    let embed = new MessageEmbed().setColor('0x2f3136').setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })).setAuthor(wonxen.Tag , message.guild.iconURL({dynamic: true, size: 2048}))
    if(!message.member.roles.cache.has(wonxen.Roller.Kurucu)) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}isimtemizle <@wonxen/ID>\``).then(sil => sil.delete({timeout: 5000}));
    kullaniciverisi.delete(`k.${uye.id}.isimler`)
    message.lineReply(`${uye} adlı kullanıcı, ${message.author} tarafından, \`isim geçmişi\` temizlendi.`);
    message.react(wonxen.Others.CheckTick);
    }
};