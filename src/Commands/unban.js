const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const wonxen = client.veri;
const wonxenveri = client.veri;
require('discord-inline-reply');
const wonxez = client.bots;
module.exports = {
    Isim: "unban",
    Komut: ["yasakkaldir", "yasakkaldır"],
    Kullanim: "yasakkaldır <@wonxen/ID> <sebep>",
    Aciklama: "Belirlenen üyenin sunucudaki yasağını kaldırır.",
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
    if(!wonxen.Roller.BanHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(x => x.delete({timeout: 5000}));
    if(!wonxen.Roller.BanHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));
    if (!args[0] || isNaN(args[0])) return message.channel.send(`Hata: Lütfen bir üye Id giriniz!  __Örn:__  \`${client.sistem.Prefix}unban <ID> <sebep> \``).then(x => x.delete({timeout: 5000})).then(message.react(wonxenveri.Others.RedTick));
    let sorguid = args[0]
    let kisi = await client.users.fetch(sorguid);
    if(kisi) {
      let reason = args.splice(1).join(" ") || "Af";
     if(!reason) return message.channel.send(`Hata: Lütfen kaldırma sebebi giriniz!  __Örn:__  \`${client.sistem.Prefix}unban <ID> <sebep> \``).then(x => x.delete({timeout: 5000})).then(message.react(wonxenveri.Others.RedTick))
      try {
        message.guild.fetchBans().then(yasaklar=> {
           if(yasaklar.size == 0) return message.channel.send(`Hata: Sunucu da hiç yasaklama bulunamadı.`).then(x => x.delete({timeout: 5000})).then(message.react(wonxenveri.Others.RedTick));
            let yasakliuye = yasaklar.find(yasakli => yasakli.user.id == sorguid)
            if(!yasakliuye) return message.channel.send(`Hata: Belirtilen ID numarasına sahip bir yasaklama bulunamadı!`).then(x => x.delete({timeout: 5500})).then(message.react(wonxenveri.Others.RedTick));
            message.guild.members.unban(kisi.id);
            message.lineReply(`${banicon} <@!${kisi.id}> adlı kullanıcı, ${message.author} tarafından, \`${reason}\` nedeniyle banı kaldırıldı!`).then(message.react(wonxenveri.Others.CheckTick));
            logs.wsend(embed.setTitle('Bir Üye Yasaklaması Kaldırıldı!').setColor("#fd0000").setDescription(`Bir üyenin sunucudaki yasaklaması kaldırıldı, **${kisi.tag}** adlı kullanıcı \`${reason}\` sebebiyle sunucudaki yasaklaması kaldırıldı. ${client.emojis.cache.get(wonxenveri.Others.CheckTick)} \n\n> Yetkili: ${message.author} - (\`${message.author.tag}\` - \`${message.author.id}\`) \n> Kullanıcı: ${kisi} - (\`${kisi.tag}\` - \`${kisi.id}\`) \n> Tarih: \`${moment().format('LLL')}\`\n> Sebep: \`${reason}\``).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })));
             })
      } catch (err) {
          console.log(err)
      }  
    } else {
      message.channel.send("Hata: Geçerli bir kişi ID'si belirtmelisin!").then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete({timeout: 5000}));
    };
  }
};