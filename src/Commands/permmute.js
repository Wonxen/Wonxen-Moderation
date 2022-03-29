const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const ms = require('ms');
const { format } = require("path");
const wonxen = client.veri;
const wonxenveri = client.veri;
const wonxez = client.bots;
require('discord-inline-reply');
module.exports = {
    Isim: "permmute",
    Komut: ["kalıcısustur", "ksustur"],
    Kullanim: "ksustur <@wonxen/ID> <sebep>",
    Aciklama: "Belirlenen üyeyi kalıcı olarak metin kanallarından susturur.",
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
  onRequest: async function (client, message, args, guild) {
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "mute-log");
    let cezano = cezaNoDb.get(`cezano.${client.sistem.ID}`) + 1;
    let muteicon = client.emojis.cache.get(wonxen.Others.CheckTick)
    let embed = new MessageEmbed().setColor("RANDOM").setTimestamp();
    if(!wonxen.Roller.MuteHammer || !wonxen.Roller.MuteHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!wonxen.Roller.MuteHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}permmute <@wonxen/ID> <sebep>\``).then(sil => sil.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let reason = args.splice(1).join(" ");
    let ceza = {
      No: cezano,
      Cezalanan: uye.id,
      Yetkili: message.author.id,
      Tip: "PMUTE",
      Tur: "Kalıcı Susturulma",
      Sebep: reason,
      BitisZaman: "SÜRESİZ",
      Zaman: Date.now() 
    };
    let muteler = cezaDb.get(`kalicisusturma`) || [];
     await uye.roles.add(wonxen.Roller.MuteRole || []).catch();
     if (!muteler.some(j => j.includes(uye.id))) {
     cezaDb.push(`kalicisusturma`, `m${uye.id}`);
      kDb.add(`k.${message.author.id}.mute`, 1);
      kDb.push(`k.${uye.id}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza)
    };
    cezaNoDb.add(`cezano.${client.sistem.ID}`, 1)
    message.lineReply(`${muteicon} ${uye} adlı kullanıcı, ${message.author} tarafından, \`${reason}\` nedeniyle kalıcı metin kanallarında susturuldu! \`(Ceza ID: #${cezano})\``).then(message.react(wonxenveri.Others.CheckTick));
    logs.wsend(embed.setAuthor(uye.user.tag, uye.user.avatarURL({ dynamic: true })).setThumbnail(uye.user.avatarURL({ dynamic: true })).setDescription(`${uye} adlı kişi sunucumuzda **Metin kanallarından __kalıcı__ CheckTick.**\n\n\`•\` Ceza Numarası: \`${cezano}\`\n\`•\` Susturulma Sebebi: \`${reason}\`\n\`•\` Susturulma Saati:\`${moment().format('LLL')}\``).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true }))).catch();
     }
};

