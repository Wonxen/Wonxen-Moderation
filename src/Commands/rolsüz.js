const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const Config = require("../Settings/Config.json");
require('discord-inline-reply');
module.exports = {
    Isim: "rolsüz",
    Komut: ["rolsüz"],
    Kullanim: "eval @param {wonxen} discord",
    Aciklama: "Rol say bot sahibinin komutudur.",
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
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.").then(x => x.delete({timeout: 12500}));
    let rlsz = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    if(args[0] == "ver") {
        rlsz.forEach(r => {
    r.roles.add(Config.RegisterSystem.Unregistered)
    })
    message.lineReply(`Sunucuda rolü bulunmayan **${rlsz.size}** kişiye kayıtsız rolü dağıtılmaya başlandı.`).then(message.react(Config.Others.CheckTick)).then(x => x.delete({timeout: 12500}));
    } else if(!args[0]) {
    message.lineReply(`Sunucuda rolü bulunmayan **${rlsz.size}** kişi var.`).then(message.react(Config.Others.RedTick))
    }
}
}