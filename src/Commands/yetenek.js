const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const Config = require("../Settings/Config.json");
require('discord-inline-reply');

module.exports = {
    Isim: "yetenek",
    Komut: ["yetenek"],
    Kullanim: "yetenek <@wonxen/ID> <Yetenek İsmi>",
    Aciklama: "Etiketlenen kişiye belirlenen yetenek rolünü verir.",
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
    let rolismi;
    let rolid;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!message.member.roles.cache.has(Config.Roller.BotHammer) && !message.member.hasPermission('MANAGE_ROLES') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`).then(x => x.delete({timeout: 5000}));
     if(args[1] === "vokal" || args[1] === "Vokal") {
        rolismi = "Vokal"
        rolid = Config.Yetenek.Vokal
    } if (args[1] === "müzisyen" || args[1] === "müzisyen") {
        rolismi = "Müzisyen"
        rolid = Config.Yetenek.Müzisyen
    } if (args[1] === "telli" || args[1] === "Telli") {
        rolismi = "Telli"
        rolid = Config.Yetenek.Telli
    } 
    if (args[1] === "yazılımcı" || args[1] === "Yazılımcı") {
        rolismi = "Yazılımcı"
        rolid = Config.Yetenek.Yazılımcı
    } if (args[1] === "ressam" || args[1] === "Ressam") {
        rolismi = "Ressam"
        rolid = Config.Yetenek.Ressam
    } if (args[1] === "şair" || args[1] === "Şair") {
        rolismi = "Şair"
        rolid = Config.Yetenek.Şair
    } if (args[1] === "tasarımcı" || args[1] === "Tasarımcı") {
        rolismi = "Tasarımcı"
        rolid = Config.Yetenek.Tasarımcı
    } if (args[1] === "yayıncı" || args[1] === "Yayıncı") {
        rolismi = "Yayıncı"
        rolid = Config.Yetenek.Streamer
    } 
    let wonxenemb = new MessageEmbed().setColor('RANDOM');
    const embed = new MessageEmbed().setColor(`YELLOW`)
    if (!uye) return message.channel.send(`Hata: yetenek rolü verebilmem için lütfen bir üyeyi etiketle __Örn:__ \`${client.sistem.Prefix}${module.exports.Isim} <@wonxen/ID> <Yetenek İsmi>\`!`).then(x => x.delete({timeout: 5000}));
    if(args[1] !== "vokal" && args[1] !== "Vokal" && 
       args[1] !== "müzisyen" && args[1] !== "Müzisyen" &&
       args[1] !== "telli" && args[1] !== "Telli" &&
       args[1] !== "yazılımcı" && args[1] !== "Yazılımcı" &&
       args[1] !== "yayıncı" && args[1] !== "Yayıncı" &&
       args[1] !== "tasarımcı" && args[1] !== "Tasarımcı" &&
       args[1] !== "ressam" && args[1] !== "Ressam" &&
       args[1] !== "şair" && args[1] !== "Şair" 
       ) return message.channel.send(`Hata: \`İsim belirtilmedi\` Lütfen aşağıdaki gibi yetenek ismi belirleyin! __Örn:__ \`.yetenek <@Wonxen/ID> yazılımcı\`\n\`\`\`diff\n- Vokal\n- Müzisyen\n- Telli\n- Yazılımcı\n- Tasarımcı\n- Ressam\n- Şair\n- Yayıncı\`\`\``);
      uye.roles.cache.has(rolid) ? uye.roles.remove(rolid) : uye.roles.add(rolid);
      if(!uye.roles.cache.has(rolid)) {
        message.lineReply(wonxenemb.setDescription(`${uye} kişisine **${rolismi}** adlı rolü başarıyla verdim!`))
        message.react(client.emoji(Config.Others.CheckTick))
      } else {
        message.lineReply(wonxenemb.setDescription(`${uye} kişisinden **${rolismi}** adlı rolü başarıyla geri aldım!`))
        message.react(client.emoji(Config.Others.CheckTick))
      };
    }
};