const { GuildMember, MessageEmbed, Client } = require("discord.js");
const Conf = require("../Settings/Bot.json");
const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
module.exports = {
  Etkinlik: "message",
  /**
   * @param {Client} client
   */
  onLoad: function (client) {},
  /**
   * @param {client} ready
   */
  onRequest: async function (message) {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        moment.locale('tr')
        let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "mesaj-log")
        const dmlog = new MessageEmbed()
          .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
          .setColor("BLUE")
          .setDescription(`__**Kullanıcı:**__ <@!${message.author.id}> (\`${message.author.tag}\` - \`${message.author.id}\`) 
          __**Tarih:**__ \`${moment().format('LLL')}\``)
          .addField("Gönderilen Mesaj", "```" + message.content + "```")
          .setThumbnail(message.author.avatarURL({ dynamic: true }))
          .setFooter(`Developed By ${client.users.cache.get(client.sistem.BotOwner).tag}`, `${client.user.displayAvatarURL({ dynamic: true })}`)
          .setTimestamp()
        logs.wsend(dmlog);
      }
    }
};