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
    Isim: "jail",
    Komut: ["tempjail","cezalı"],
    Kullanim: "cezalı <@wonxen/ID> <süre> <sebep>",
    Aciklama: "Belirlenen üyeyi belirtilen süre boyunca cezalıya atar.",
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
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "jail-log");
    let jailicon = client.emojis.cache.get(wonxen.Others.CheckTick)
    let embed = new MessageEmbed().setTimestamp().setColor('RANDOM')
    let cezano = cezaNoDb.get(`cezano.${client.sistem.ID}`) + 1;
    if(!wonxen.Roller.JailHammer || !wonxen.Roller.JailHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!wonxen.Roller.JailHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}jail <@wonxen/ID> <1s/1m/1h/1d> <sebep>\``).then(sil => sil.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let jaildekiler = cezaDb.get(`cezalı`) || [];
    let sure = args[1];
  let reason = args.splice(2).join(" ");
  if(!sure || !ms(sure) || !reason) return message.channel.send(`Hata: Lütfen tüm argümanları doldurunuz!  __Örn:__  \`${client.sistem.Prefix}jail <@wonxen/ID> <1s/1m/1h/1d> <sebep>\``).then(sil => sil.delete({timeout: 5000}));
  let jailzaman = args[1]
    .replace(`d`," Gün")
    .replace(`s`," Saniye")
    .replace(`h`," Saat")
    .replace(`m`," Dakika")
    .replace(`w`," Hafta")
  let ceza = {
      No: cezano,
      Cezalanan: uye.id,
      Yetkili: message.author.id,
      Tip: "JAIL",
      Tur: "Cezalandırılma",
      Sebep: reason,
      AtilanSure: jailzaman,
      BitisZaman: "Şuan da cezalı",
      Zaman: Date.now() 
    };
  await uye.roles.set(uye.roles.cache.has(wonxen.Roller.Booster) ? [wonxen.Roller.Booster, wonxen.Roller.JailRole] : [wonxen.Roller.JailRole]).catch();
  if (!jaildekiler.some(j => j.id == uye.id)) {
    cezaDb.push(`cezalı`, {id: uye.id,No: cezano, kalkmaZamani: Date.now()+ms(sure)});
    kDb.add(`k.${message.author.id}.jail`, 1);
    kDb.push(`k.${uye.id}.sicil`, ceza);
    kDb.set(`ceza.${cezano}`, ceza);
  };
  
  cezaNoDb.add(`cezano.${client.sistem.ID}`, 1)
  if(uye.voice.channel) uye.voice.kick().catch();
  message.lineReply(`${jailicon} ${uye} adlı kullanıcı, ${message.author} tarafından, \`${reason}\` nedeni ile \`${jailzaman}\` süresince cezalıya atıldı! \`(Ceza ID: #${cezano})\``).then(message.react(wonxenveri.Others.CheckTick));
  logs.wsend(embed.setTitle('Bir Üye Cezalandırıldı!').setColor("#00edff").setDescription(`Bir üye cezalandırıldı, **${uye.user.tag}** adlı kullanıcı \`${reason}\` sebebiyle \`${jailzaman}\` boyunca metin kanalları ve sesli kanallardan yasaklandı. ${client.emojis.cache.get(wonxenveri.Others.CheckTick)} \n\n> Yetkili: ${message.author} - (\`${message.author.tag}\` - \`${message.author.id}\`) \n> Kullanıcı: ${uye} - (\`${uye.user.tag}\` - \`${uye.id}\`) \n> Tarih: \`${moment().format('LLL')}\` \n> Ceza Numarası: \`#${cezano}\`\n> Süre: \`${jailzaman}\` \n> Sebep: \`${reason}\``).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })));
    }
};