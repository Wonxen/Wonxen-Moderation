const { GuildMember, MessageEmbed, Client } = require("discord.js");
const Conf = require("../Settings/Bot.json");
const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
module.exports = {
  Etkinlik: "messageDelete",
  /**
   * @param {Client} client
   */
  onLoad: function (client) {},
  /**
   * @param {client} ready
   */
  onRequest: async function (message, channel) {
    if (message.author.bot || message.channel.type === "dm") return;
    if (message.author.bot) return;
    moment.locale('tr')
    var user = message.author;
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "mesaj-log");
    const embed = new MessageEmbed()
      .setColor("#050000")
      .setTitle("Mesaj Silindi",client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`__**Kullanıcı:**__ <@!${message.author.id}> (\`${message.author.tag}\` - \`${message.author.id}\`) 
    __**Kanal:**__ <#${message.channel.id}> (\`${message.channel.name}\` - \`${message.channel.id}\`)
    __**Tarih:**__ \`${moment().format('LLL')}\``)
      .addField("Silinen Mesaj", "```" + message.content + "```",true)
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setFooter(`Developed By ${client.users.cache.get(client.sistem.BotOwner).tag}`, `${client.users.cache.get(client.sistem.BotOwner).displayAvatarURL({ dynamic: true })}`)
      .setTimestamp()
    logs.wsend(embed);
  }
}