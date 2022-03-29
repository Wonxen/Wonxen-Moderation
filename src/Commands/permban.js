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
    Isim: "kb",
    Komut: ["kalkmazban","kban"],
    Kullanim: "kalkmazban ID <sebep>",
    Aciklama: "Taç sahibi veya bot sahibi tarafına hazırlanmış bir komuttur banı kaldırılsa dahi tekrardan sunucuya girdiğinde tekrardan ban yemesini sağlar.",
    Kategori: "Bot/Taç",
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
   */
  onRequest: async function (client, message, args) {
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "ban-log");
    let cezano = cezaNoDb.get(`cezano.${client.sistem.ID}`) + 1;
    let embed = new MessageEmbed().setColor("RANDOM").setTimestamp();
    if(!message.member.roles.cache.has(client.veri.Roller.Kurucu)) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    let kullanıcılar = await qDb.get(`akb_${message.guild.id}`)
    let kullanıcı = args[0];
    let reason = args.splice(1).join(" ");
    let ceza = {
        No: cezano,
        Cezalanan: kullanıcı,
        Yetkili: message.author.id,
        Tip: "BOTBAN",
        Tur: "KALKMAYAN BAN",
        BitisZaman: "Affa kalmış!",
        Sebep: reason,
        Zaman: Date.now() 
      };
    if(args[0] === "liste") {
     message.channel.send(`Kalıcı ban sistemi ile yasaklanmış kullanıcı(lar) ; \n\n${kullanıcılar.map(x => x.slice(1)).join('\n')}\n\nToplam (${kullanıcılar.length}) adet bot sistemi ile yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true})
      return
    }
    if(!kullanıcı || isNaN(kullanıcı) || kullanıcı.length > 20 || kullanıcı.length < 10) return message.channel.send(`Bilgi: Kalkmazban sistemi ile birini yasaklamak/kaldırmak için __ID__ giriniz! Listelemek için __${client.sistem.Prefix}kalkmazban liste__ komutunu kullanın!`).then(x => x.delete({timeout: 10000}));
    if(kullanıcılar && kullanıcılar.some(id => `k${kullanıcı}` === id)) {
        qDb.delete(`akb_${message.guild.id}`, `k${kullanıcı}`)
        kullanıcılar.forEach(v => {
        if (!v.includes(`k${kullanıcı}`)) {
          qDb.push(`akb_${message.guild.id}`, v)
        }
        })
      message.guild.members.unban(kullanıcı);
      message.lineReply(`Başarılı: \`${kullanıcı}\` ID'li kullanıcı artık sunucuya __girebilecek__!`).then(message.react(wonxenveri.Others.CheckTick));
    } else {
        if(!reason) return message.channel.send(`Hata: Lütfen tüm argümanları veya sebepi belirleyin!  __Örn:__  \`${client.sistem.Prefix}kalkmazban ID <sebep>\``).then(x => x.delete({timeout: 5000}));
      await qDb.push(`akb_${message.guild.id}`, `k${kullanıcı}`)
      if(message.guild.members.cache.has(kullanıcı)) {
        message.guild.members.ban(kullanıcı, {reason: `Bot kalkmazban sistemi ile banlandı! (Ceza Numarası: #${cezano}) ile sorgulayın!`}).catch();
      }
      cezaNoDb.add(`cezano.${client.sistem.ID}`, 1)
      kDb.add(`k.${message.author.id}.kalkmazban`, 1);
      kDb.push(`k.${kullanıcı}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza);
      logs.wsend(embed.setTitle('Kalıcı Yasaklama').setColor("RANDOM").setDescription(`Bir üye sunucudan kalıcı olarak \`${reason}\` sebebiyle sunucudan yasaklandı. ${client.emojis.cache.get(wonxenveri.Others.CheckTick)} \n\n> Yetkili: ${message.author} - (\`${message.author.tag}\` - \`${message.author.id}\`) \n> Kullanıcı: (\`${kullanıcı}\`) \n> Tarih: \`${moment().format('LLL')}\` \n> Ceza Numarası: \`#${cezano}\`\n> Sebep: \`${reason}\``).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })));
      message.lineReply(`Başarılı: \`${kullanıcı}\` ID'li kullanıcı artık \`${reason}\` sebebi ile bu sunucuya asla __giremeyecek__! \`(Ceza ID: #${cezano})\``).then(message.react(wonxenveri.Others.CheckTick));
    }
  }
};
