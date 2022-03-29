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
    Isim: "permjail",
    Komut: ["kalıcıjail","kalıcıcezalı"],
    Kullanim: "kcezalı <@wonxen/ID> <sebep>",
    Aciklama: "Belirlenen üyeyi kalıcı olarak cezalıya atar.",
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
    let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(wonxen.Tag, message.guild.iconURL({dynamic: true, size: 2048}))
    let cezano = cezaNoDb.get(`cezano.${client.sistem.ID}`) + 1;
    if(!wonxen.Roller.JailHammer || !wonxen.Roller.JailHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!wonxen.Roller.JailHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    if(!uye || !reason) return message.channel.send(`Hata: Lütfen üye belirleyin veya sebep belirleyin!  __Örn:__  \`${client.sistem.Prefix}permjail <@wonxen/ID> <sebep>\``).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let jaildekiler = cezaDb.get(`kalıcıcezalı`) || [];
    uye.roles.set(uye.roles.cache.has(wonxen.Roller.Booster) ? [wonxen.Roller.JailRole, wonxen.Roller.Booster] : [wonxen.Roller.JailRole]).catch();
    let ceza = {
      No: cezano,
      Cezalanan: uye.id,
      Yetkili: message.author.id,
      Tip: "PJAIL",
      Tur: "Kalıcı Cezalandırılma",
      Sebep: reason,
      BitisZaman: "SÜRESİZ",
      Zaman: Date.now() 
    };
  if (!jaildekiler.some(j => j.includes(uye.id))) {
    cezaDb.push(`kalıcıcezalı`, `j${uye.id}`);
    kDb.add(`k.${message.author.id}.jail`, 1);
    kDb.push(`k.${uye.id}.sicil`, ceza);
    kDb.set(`ceza.${cezano}`, ceza)
  };
  cezaNoDb.add(`cezano.${client.sistem.ID}`, 1)
  if(uye.voice.channel) uye.voice.kick().catch();
  message.lineReply(`${jailicon} ${uye} adlı kullanıcı, ${message.author} tarafından, \`${reason}\` nedeniyle kalıcı cezalıya atıldı! \`(Ceza ID: #${cezano})\``).then(message.react(wonxenveri.Others.CheckTick));
  logs.wsend(embed.setTitle('Bir Üye Cezalandırıldı!').setColor("#00edff").setDescription(`Bir üye cezalandırıldı, **${uye.user.tag}** adlı kullanıcı \`${reason}\` sebebiyle kalıcı metin kanalları ve sesli kanallardan yasaklandı. ${client.emojis.cache.get(wonxenveri.Others.CheckTick)} \n\n> Yetkili: ${message.author} - (\`${message.author.tag}\` - \`${message.author.id}\`) \n> Kullanıcı: ${uye} - (\`${uye.user.tag}\` - \`${uye.id}\`) \n> Tarih: \`${moment().format('LLL')}\` \n> Ceza Numarası: \`#${cezano}\`\n> Süre: \`${jailzaman}\` \n> Sebep: \`${reason}\``).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })));
    }
};