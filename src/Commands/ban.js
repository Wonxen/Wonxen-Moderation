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
    Isim: "ban",
    Komut: ["yasakla"],
    Kullanim: "yasakla <@wonxen/ID> <sebep>",
    Aciklama: "Belirlenen üyeyi sunucudan yasaklayarak tekrar girmesini engeller.",
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
  let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "ban-log");
  let banicon = client.emojis.cache.get(wonxen.Others.CheckTick)
  let embed = new MessageEmbed().setColor("RANDOM").setTimestamp();
  let cezano = cezaNoDb.get(`cezano.${client.sistem.ID}`) + 1;
  if(!wonxen.Roller.BanHammer) return message.channel.send("Sistemsel Hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));
  if(!wonxen.Roller.BanHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));
  
  if(args[0] && args[0].includes('list')) {
    try {
      message.guild.fetchBans().then(bans => {
        message.channel.send(`Sunucudan yasaklanmış kişiler; \n\n${bans.map(c => `${c.user.id} | ${c.user.tag}`).join("\n")}\n\nToplam "${bans.size}" adet yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true}).then(message.react(wonxenveri.Others.CheckTick));
      });
	  } catch (err) { message.channel.send(`Sistem de yasaklı kullanıcı bulunmamakta!`).then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));; }
    return;
  };
  
  if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))) {
    if(!args[1] || isNaN(args[1])) return message.lineReply("Hata: `Üye belirtilmedi` Lütfen bir üye etiketleyin veya ID giriniz! __Örn:__ `.ban bilgi <@wonxen/ID>`").then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));;
    return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.lineReply(`**Banlanan Üye:**  ${user.tag} - (\`${user.id}\`)  | **Ban Sebebi:** \`${reason ? reason : "Belirtilmemiş!"}\``)).then(message.react(wonxenveri.Others.CheckTick)).catch(err => message.channel.send("Belirtilen ID numarasına sahip bir ban bulunamadı!").then(x => x.delete({timeout: 5000})));
  };
  let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (!reason) return message.lineReply("Hata: `Üye belirtilmedi` Lütfen bir üye etiketleyin veya ID giriniz! __Örn:__ `.ban <@wonxen/ID> <Sebep>`").then(x => x.delete({ timeout: 20000 })).then(message.react(wonxenveri.Others.RedTick));
  let ceza = {
    No: cezano,
    Cezalanan: victim.id,
    Yetkili: message.author.id,
    Tip: "BAN",
    Tur: "Yasaklama",
    Sebep: reason,
    Zaman: Date.now() 
  };
  if (!victim) {
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
      message.guild.members.ban(kisi.id, {reason: reason}).catch();
      kDb.add(`k.${message.author.id}.ban`, 1);
      kDb.push(`k.${victim.id}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza);
      cezaNoDb.add(`cezano.${client.sistem.ID}`, 1)
      if(wonxen.Kanallar.banLogKanali && client.channels.cache.has(wonxen.Kanallar.banLogKanali)) client.channels.cache.get(wonxen.Kanallar.banLogKanali).send(embed.setDescription(`Yasaklayan Yetkili: ${message.author} (\`${message.author.id}\`)\nYasaklanan Üye: ${kisi.tag} (\`${kisi.id}\`)\nSebepi: ${reason}`).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true }) + ` • Ceza Numarası: #${cezano}`));
    } else {
      message.lineReply("Hata: `Üye belirtilmedi` Lütfen bir üye etiketleyin veya ID giriniz! __Örn:__ `.ban <@wonxen/ID> <Sebep>`").then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));
    };
    return message.lineReply("Hata: `Üye belirtilmedi` Lütfen bir üye etiketleyin veya ID giriniz! __Örn:__ `.ban <@wonxen/ID> <Sebep>`").then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));
  };
  if(message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send("Hata: Banlamaya çalıştığın üye senle aynı yetkide veya senden üstün!").then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));
  if(!victim.bannable) return message.channel.send("Hata: __Yönetim/Erişim__ yetersiz bot yetkisi nedeniyle RedTick edildi!").then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));
  victim.send(`${banicon} ${message.author} - (\`${message.author.id}\`) tarafından, \`${reason}\` nedeniyle sunucudan yasaklandınız! \`(Ceza ID: #${cezano})\``).catch();
  victim.ban({reason: reason});
  kDb.add(`k.${message.author.id}.ban`, 1);
  kDb.push(`k.${victim.id}.sicil`, ceza)
  kDb.set(`ceza.${cezano}`, ceza);
  cezaNoDb.add(`cezano.${client.sistem.ID}`, 1)
  message.lineReply(`${banicon} <@!${victim.user.id}> adlı kullanıcı, ${message.author} tarafından, \`${reason}\` nedeniyle banlandı! \`(Ceza ID: #${cezano})\``).then(message.react(wonxenveri.Others.CheckTick));
  logs.wsend(embed.setTitle('Bir Üye Yasaklandı!').setColor("#00edff").setDescription(`Bir üye sunucudan yasaklandı, **${victim.user.tag}** adlı kullanıcı \`${reason}\` sebebiyle sunucudan yasaklandı. ${client.emojis.cache.get(wonxenveri.Others.CheckTick)} \n\n> Yetkili: ${message.author} - (\`${message.author.tag}\` - \`${message.author.id}\`) \n> Kullanıcı: ${victim} - (\`${victim.user.tag}\` - \`${victim.id}\`) \n> Tarih: \`${moment().format('LLL')}\` \n> Ceza Numarası: \`#${cezano}\`\n> Sebep: \`${reason}\``).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })));
     }
};