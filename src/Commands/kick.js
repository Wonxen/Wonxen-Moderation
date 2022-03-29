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
    Isim: "kick",
    Komut: ["at"],
    Kullanim: "at <@wonxen/ID> <sebep>",
    Aciklama: "Belirlenen üyeyi sunucudan atmasını sağlar.",
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
    let embed = new MessageEmbed().setColor("RANDOM").setTimestamp();
    let CheckTick = client.emojis.cache.get(wonxen.Others.CheckTick)
    let cezano = cezaNoDb.get(`cezano.${client.sistem.ID}`) + 1;
    if(!wonxen.Roller.BanHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(x => x.delete({timeout: 5000}));
    if(!wonxen.Roller.BanHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    if (!victim || !reason) return message.channel.send(`Hata: Lütfen tüm argümanları doldurunuz!  __Örn:__  \`${client.sistem.Prefix}kick <@wonxen/ID> sebep\``).then(x => x.delete({timeout: 5000}));
    if(message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send("Hata: Atmaya çalıştığın üye senle aynı yetkide veya senden üstün.").then(x => x.delete({timeout: 5000}));
    if(!victim.kickable) return message.channel.send("Hata: __Yönetim/Erişim__ yetersiz bot yetkisi nedeniyle RedTick edildi!").then(x => x.delete({timeout: 5000}));
    await victim.send(`${message.author} (\`${message.author.id}\`) tarafından **${reason}** sebebiyle sunucudan __atıldın__.`).catch();
    victim.kick({reason: reason}).catch();
    let ceza = {
        No: cezano,
        Cezalanan: victim.id,
        Yetkili: message.author.id,
        Tip: "KICK",
        Tur: "Atılma",
        Sebep: reason,
        Zaman: Date.now() 
      };
    kDb.add(`k.${message.author.id}.kick`, 1);
    kDb.push(`k.${victim.id}.sicil`, ceza);
    kDb.set(`ceza.${cezano}`, ceza);
    cezaNoDb.add(`cezano.${client.sistem.ID}`, 1)
    message.lineReply(`${CheckTick} <@!${victim.user.id}> adlı kullanıcı, ${message.author} tarafından, \`${reason}\` nedeniyle atıldı! \`(Ceza ID: #${cezano})\``).then(message.react(wonxenveri.Others.CheckTick));
    if(wonxen.Kanallar.banLogKanali && client.channels.cache.has(wonxen.Kanallar.banLogKanali)) client.channels.cache.get(wonxen.Kanallar.banLogKanali).send(embed.setTitle('Bir Üye Atıldı!').setColor("#00edff").setDescription(`Bir üye sunucudan atıldı, **${victim.user.tag}** adlı kullanıcı \`${reason}\` sebebiyle sunucudan atıldı. ${client.emojis.cache.get(wonxenveri.Others.CheckTick)} \n\n> Yetkili: ${message.author} - (\`${message.author.tag}\` - \`${message.author.id}\`) \n> Kullanıcı: ${victim} - (\`${victim.user.tag}\` - \`${victim.id}\`) \n> Tarih: \`${moment().format('LLL')}\` \n> Ceza Numarası: \`#${cezano}\`\n> Sebep: \`${reason}\``).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })));
  }
};