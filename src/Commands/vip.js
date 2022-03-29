const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const Config = require("../Settings/Config.json");

module.exports = {
    Isim: "vip",
    Komut: ["vıp"],
    Kullanim: "vip <@wonxen/ID>",
    Aciklama: "Etiketlenen kişiye VIP rolü verir.",
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
    var rolismi = "VIP"
    var rolid = Config.RegisterSystem.Vip
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let embed = new MessageEmbed().setColor('RANDOM');
    if (!wonxenveri.Roller.BotHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('MANAGE_ROLES') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`).then(x => x.delete({timeout: 5000}));
     if (!uye) return message.channel.send(`Hata: ${rolismi} rolü verebilmem için lütfen bir üyeyi etiketle __Örn:__ \`${client.sistem.Prefix}${module.exports.Isim} <@wonxen/ID>\`!`).then(x => x.delete({timeout: 5000}));
      uye.roles.cache.has(rolid) ? uye.roles.remove(rolid) : uye.roles.add(rolid);
      if(!uye.roles.cache.has(rolid)) {
        message.channel.send(embed.setDescription(`${uye} kişisine <@&${Config.RegisterSystem.Vip}> adlı rolü başarıyla verdim!`))
        message.react(client.emoji(wonxenveri.Others.CheckTick))
      } else {
        message.channel.send(embed.setDescription(`${uye} kişisinden <@&${Config.RegisterSystem.Vip}> adlı rolü başarıyla geri aldım!`))
        message.react(client.emoji(wonxenveri.Others.CheckTick))
      };
    }
};
