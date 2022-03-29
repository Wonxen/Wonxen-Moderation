const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const wonxen = client.veri.RegisterSystem;
const wonxenveri = client.veri;
const wonxez = client.bots;
module.exports = {
    Isim: "say",
    Komut: ["istatistik"],
    Kullanim: "say",
    Aciklama: "Sunucunun bütün verilerini gösterir",
    Kategori: "Üye",
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
   embed = new MessageEmbed()
     .setColor("RANDOM")
     .setDescription(`
     \`•\` Şu anda toplam **${message.guild.members.cache.filter(s => s.voice.channel).size}** kişi seslide.
     \`•\` Sunucuda **${message.guild.memberCount}** adet üye var (**${message.guild.members.cache.filter(off => off.presence.status !== 'offline').size}** Aktif)
     \`•\` Toplamda **${message.guild.members.cache.filter(u => u.user.username.includes(wonxenveri.Tag)).size}** kişi tagımızı alarak bizi desteklemiş.
     \`•\` Sunucuda **${message.guild.premiumSubscriptionCount}** adet takviye var ve Sunucu **${message.guild.premiumTier}** seviye.`)
     
     message.channel.send(embed)
    }
  }
