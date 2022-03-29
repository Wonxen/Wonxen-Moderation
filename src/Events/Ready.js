const { GuildMember, MessageEmbed, Client } = require("discord.js");
const Conf = require("../Settings/Bot.json");
const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
module.exports = {
  Etkinlik: "ready",
  /**
   * @param {Client} client
   */
  onLoad: function (client) {},
  /**
   * @param {client} ready
   */
  onRequest: async function () {
    client.user.setPresence({ activity: { name: Conf.Text, type: Conf.Type }, status: Conf.Status })
      .then(
        console.log(
          `[ ~ BOT ~ ] : ${client.user.tag} Hazırız Kaptan Yelkenler Fora Falan Fıstık İşte Sür Gidelim.`
        )
      )
      .catch(() => console.log("[+] Belirsiz bir hata ile karşılaşıldı."));
    //--------------------------------------------------------------------------------------------------------------\\
    client.channels.cache
      .get(Conf.Voice)
      .join()
      .catch(() =>
        console.log("[+] Sesli kanala giriş yapılırken bir hata ile karşılaşıldı.")
      );
    console.log(
      `[${moment().format(
        "YYYY-MM-DD HH:mm:ss"
      )}] Komut dosyaları başarıyla tamamlandı bot aktif edildi.`
    );
  },
};
