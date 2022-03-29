const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const Config = require("../Settings/Config.json");
const System = require("../Settings/System.json");

module.exports = {
    Isim: "booster",
    Komut: ["b","zengin","bisim"],
    Kullanim: "b <belirlenen isim>",
    Aciklama: "Sunucuya takviye atan üyeler bu komut ile isim değişimi yapar.",
    Kategori: "Booster",
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
  onRequest: async (client, message, args) => {
      if (!Config.Roller.Booster) return message.channel.send(`Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.`).then(x => x.delete({timeout: 5000}));
      if (!message.member.roles.cache.has(Config.Roller.Booster)) return message.channel.send(`Hata: Sunucuya takviye atmadığın için bu komutu kullanmaya hak sahibi değilsin.`).then(x => x.delete({ timeout: 5000 }));
      
      let uye = message.guild.member(message.author);
      let yazilacakIsim;
      let isim = args.join(' ');
      if (!isim) return message.channel.send(`Hata: Lütfen bir isim belirleyiniz!  __Örn:__  \`${System.Prefix}booster <Belirlenen Isim> Max: 32 Karakter!\``).then(x => x.delete({ timeout: 5000 }));
      yazilacakIsim = `${uye.user.username.includes(Config.Tag) ? Config.Tag : (Config.Tagsız ? Config.Tagsız : (Config.Tag|| ""))} ${isim}`;
      if(uye.manageable) uye.setNickname(`${yazilacakIsim}`).catch();
      message.react(Config.Others.CheckTick);
  }
};