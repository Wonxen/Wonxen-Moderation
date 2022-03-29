const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const ms = require('ms');
const wonxen = client.veri;
const wonxenveri = client.veri;
const wonxez = client.bots;
require('discord-inline-reply');
module.exports = {
    Isim: "sesmute",
    Komut: ["voicemute", "sessustur", "vmute"],
    Kullanim: "sessustur <@wonxen/ID> <süre> <sebep>",
    Aciklama: "Belirlenen üyeyi belirtilen süre boyunca ses kanallarında susturur.",
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
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "vmute-log");
    let muteicon = client.emojis.cache.get(wonxen.Others.vCheckTick)
    let embed = new MessageEmbed().setColor("RANDOM").setTimestamp();
    let cezano = cezaNoDb.get(`cezano.${client.sistem.ID}`) + 1;
    if(!wonxen.Roller.VMuteHammer || !wonxen.Roller.VMuteHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!wonxen.Roller.VMuteHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}voicemute <@wonxen/ID> <1s/1m/1h/1d> <sebep>\``).then(sil => sil.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let muteler = cezaDb.get(`sessusturulma`) || [];
    let sure = args[1];
    let reason = args.splice(2).join(" ");
    if(!sure || !ms(sure) || !reason) return message.channel.send(`Hata: Lütfen bir süre belirleyin!  __Örn:__  \`${client.sistem.Prefix}voicemute <@wonxen/ID> <1s/1m/1h/1d> <sebep>\``).then(x => x.delete({timeout: 5000}));
    let mutezaman = args[1]
      .replace(`d`," Gün")
      .replace(`s`," Saniye")
      .replace(`h`," Saat")
      .replace(`m`," Dakika")
      .replace(`w`," Hafta")
    let ceza = {
        No: cezano,
        Cezalanan: uye.id,
        Yetkili: message.author.id,
        Tip: "VMUTE",
        Tur: "Seste Susturulma",
        Sebep: reason,
        AtilanSure: mutezaman,
        BitisZaman: "Şuan da seste susturulu",
        Zaman: Date.now() 
      };
    if(uye.voice.channel) uye.voice.setMute(true).catch();
    if (!muteler.some(j => j.id == uye.id)) {
      cezaDb.push(`sessusturulma`, {id: uye.id,No: cezano, kalkmaZamani: Date.now()+ms(sure)})
      kDb.add(`k.${message.author.id}.sesmute`, 1);
      kDb.push(`k.${uye.id}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza)
    };
    cezaNoDb.add(`cezano.${client.sistem.ID}`, 1)
    message.lineReply(`${muteicon} ${uye} adlı kullanıcı, ${message.author} tarafından, \`${reason}\` nedeni ile \`${mutezaman}\` süresince sesli kanallarında susturuldu! \`(Ceza ID: #${cezano})\``).then(message.react(wonxenveri.Others.CheckTick));
    logs.wsend(embed.setAuthor(uye.user.tag, uye.user.avatarURL({ dynamic: true })).setThumbnail(uye.user.avatarURL({ dynamic: true })).setDescription(`${uye} adlı kişi sunucumuzda **Sesli kanallarından susturuldu.**\n\n\`•\` Ceza Numarası: \`${cezano}\`\n\`•\` Susturulma Sebebi: \`${reason}\`\n\`•\` Susturulma Saati:\`${client.tarihsel}\`\n\`•\` Susturulma Süresi: \`${mutezaman}\``).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true }))).catch();
     }
};

