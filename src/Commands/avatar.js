const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const wonxen = client.veri.RegisterSystem;
const wonxenveri = client.veri;
const wonxez = client.bots;

module.exports = {
    Isim: "avatar",
    Komut: ["av", "pp"],
    Kullanim: "pp <@wonxen/ID>",
    Aciklama: "Etiketlenen üyenin avatarını büyültür.",
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
    const user = args[0] ? message.mentions.users.first() || await client.users.fetch(args[0]) : message.author;
    const gif = user.displayAvatarURL({ dynamic: true }).endsWith(".gif") ? ` | [GIF](${user.displayAvatarURL({ format: "gif" })})` : "";
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true}))
      .setDescription(`**[WEBP](${user.displayAvatarURL({ format: "webp", })}) | [JPEG](${user.displayAvatarURL({ format: "jpeg", })}) | [PNG](${user.displayAvatarURL({ format: "png" })}) ${gif}**`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
      .setFooter(`${message.member.displayName} tarafından istendi.`, message.author.avatarURL({ dynamic: true }))
    message.channel.send(embed);
}
};
