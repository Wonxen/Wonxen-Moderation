const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const ms = require('ms');
const wonxen = client.veri;
require('discord-inline-reply');
const wonxez = client.bots;
module.exports = {
    Isim: "unmute",
    Komut: ["susturmakaldır"],
    Kullanim: "susturmakaldır <@wonxen/ID>",
    Aciklama: "Belirlenen üyeyi ses veya metin kanallarında ki susturmalarını kaldırır.",
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
    let unmuteicon = client.emojis.cache.get(wonxen.Others.CheckTick)
    let embed = new MessageEmbed().setColor("RANDOM").setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })).setTimestamp();
    if(!wonxen.Roller.MuteHammer || !wonxen.Roller.MuteHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!wonxen.Roller.MuteHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}unmute <@wonxen/ID>\``).then(sil => sil.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let muteler = cezaDb.get(`susturulma`) || [];
    let sesmuteler = cezaDb.get(`sessusturulma`) || [];
    let kalicimuteler = cezaDb.get(`kalicisusturma`) || [];
    uye.roles.remove(wonxen.Roller.MuteRole).catch();
    if (muteler.some(j => j.id === uye.id)) cezaDb.set(`susturulma`, muteler.filter(x => x.id !== uye.id));
    if (sesmuteler.some(j => j.id === uye.id)) cezaDb.set(`sessusturulma`, sesmuteler.filter(x => x.id !== uye.id));
    if (kalicimuteler.some(j => j.id === uye.id)) cezaDb.set(`kalicisusturma`, kalicimuteler.filter(x => x.id !== uye.id));
    kDb.set(`ceza.${muteler.No}.BitisZaman`, Date.now());
    kDb.set(`ceza.${sesmuteler.No}.BitisZaman`, Date.now());
    if (uye.voice.channel) uye.voice.setMute(false);
    message.lineReply(`${unmuteicon} ${uye} adlı kullanıcı, ${message.author} tarafından, ses ve metin kanallarında ki susturulması kaldırıldı!`).then(message.react(wonxenveri.Others.CheckTick));
    logs.wsend(embed.setDescription(`${uye} (\`${uye.id}\`), adlı üyenin ${message.author} (\`${message.author.id}\`), tarafından ses ve metin kanallarından susturulması kaldırıldı!`)).catch();
   }
};

