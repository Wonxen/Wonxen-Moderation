const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const wonxen = client.veri;
const wonxenveri = client.veri;
const wonxez = client.bots;
const ms = require('ms');
require('discord-inline-reply');
module.exports = {
    Isim: "uyar",
    Komut: ["uyarı","uyar"],
    Kullanim: "uyarı <@wonxen/ID> <uyarı açıklaması>",
    Aciklama: "Belirlenen üyeye uyarı belirleyerek ceza işlemi yapar.",
    Kategori: "Yetkili",
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
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "uyarı-log");
    let embed = new MessageEmbed().setColor("RANDOM").setTimestamp();
    let cezano = cezaNoDb.get(`cezano.${client.sistem.ID}`) + 1;
    if(!wonxen.Roller.WarnHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(x => x.delete({timeout: 5000}));
    if(!wonxen.Roller.WarnHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    if(!uye || !reason) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id girin!  __Örn:__  \`${client.sistem.Prefix}uyarı <@wonxen/ID> <sebep>\``).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(x => x.delete({timeout: 5000}));
    let ceza = {
        No: cezano,
        Cezalanan: uye.id,
        Yetkili: message.author.id,
        Tip: "WARN",
        Tur: "Uyarılma",
        BitisZaman: "Uyarılma",
        Sebep: reason,
        Zaman: Date.now() 
      };
      kDb.add(`k.${message.author.id}.uyari`, 1);
      kDb.push(`k.${uye.id}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza);
      cezaNoDb.add(`cezano.${client.sistem.ID}`, 1)
      message.lineReply(`⚠ ${uye} adlı kullanıcı, ${message.author} tarafından, \`${reason}\` nedeniyle uyarıldı! \`(Ceza ID: #${cezano})\``).then(message.react(wonxenveri.Others.CheckTick));
    logs.wsend(embed.setAuthor(uye.user.tag, uye.user.avatarURL({ dynamic: true })).setThumbnail(uye.user.avatarURL({ dynamic: true })).setDescription(`${uye} adlı kişi sunucumuzda **Uyarıldı.**\n\n\`•\` Ceza Numarası: \`${cezano}\`\n\`•\` Uyarılma Sebebi: \`${reason}\`\n\`•\` Uyarılma Tarihi:\`${moment().format('LLL')}\``).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true }))).catch();
    }
};