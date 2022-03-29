﻿const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const wonxen = client.veri.RegisterSystem;
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const kullanicicinsiyet = new db.table("aCinsiyet");
const wonxenveri = client.veri;
const wonxez = client.bots;
require('discord-inline-reply');
module.exports = {
    Isim: "kayıtsız",
    Komut: ["kayitsiz"],
    Kullanim: "kayıtsız <@wonxen/ID>",
    Aciklama: "Belirlenen üyeyi kayıtsız üye olarak belirler.",
    Kategori: "Kayıt Komutları",
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
    if((!wonxen.Unregistered) || !wonxen.Registery) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!wonxen.Registery.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}kayıtsız <@wonxen/ID>\``).then(sil => sil.delete({timeout: 5000}));
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirlediğiniz üye sizden yetkili veya aynı yetkidesiniz.`).then(sil => sil.delete({timeout: 5000}));
    if(wonxen.Unregistered.some(kayıtsız => uye.roles.cache.has(kayıtsız))) return message.channel.send(`Hata: Belirlediğiniz üye zaten sunucumuz da kayıtsız üye neden tekrardan kayıtsıza atmak istiyorsun?`).then(sil => sil.delete({timeout: 5000}));
    if(uye.manageable) if(wonxenveri.Tagsız) uye.setNickname(`${wonxenveri.Tagsız} İsim | Yaş`).catch();
    else if(wonxenveri.Tag) uye.setNickname(`${wonxenveri.Tag} İsim | Yaş`).catch();
    let kayıtsız = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(wonxen.Unregistered);
    await uye.roles.set(kayıtsız)
    kullanicicinsiyet.delete(`veri.${uye.id}.cinsiyet`, `erkek`);
    kullanicicinsiyet.delete(`veri.${uye.id}.cinsiyet`, `kadin`);
    message.lineReply(`${client.emoji(wonxenveri.Others.CheckTick)} ${uye} adlı kullanıcı, ${message.author} tarafından, kayıtsız olarak belirlendi!`).then(message.react(wonxenveri.Others.CheckTick));
    if(uye.voice.channel) await uye.voice.kick().catch();
       return;
    }
};