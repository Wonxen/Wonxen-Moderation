const { GuildMember, MessageEmbed, Client } = require("discord.js");
const Conf = require("../Settings/Bot.json");
const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
module.exports = {
  Etkinlik: "messageUpdate",
  /**
   * @param {Client} client
   */
  onLoad: function (client) {},
  /**
   * @param {client} ready
   */
  onRequest: async function (oldMessage, newMessage) {
    if (newMessage.author.bot || newMessage.channel.type === "dm") return;
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "mesaj-log");
    if (oldMessage.content == newMessage.content) return;
    moment.locale('tr')
    let embed = new MessageEmbed()
      .setColor("#fd0000")
      .setTitle("Mesaj Düzenlendi",client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`__**Kullanıcı:**__ <@!${newMessage.author.id}> (\`${newMessage.author.tag}\` - \`${newMessage.author.id}\`) 
    __**Kanal:**__ <#${newMessage.channel.id}> (\`${newMessage.channel.name}\` - \`${newMessage.channel.id}\`)
    __**Tarih:**__ \`${moment().format('LLL')}\``)
      .addField("Eski Mesaj", "```" + oldMessage.content + "```",true)
      .addField("Yeni Mesaj", "```" + newMessage.content + "```",true)
      .setThumbnail(newMessage.author.avatarURL({ dynamic: true }))
      .setFooter(`Developed By ${client.users.cache.get(client.sistem.BotOwner).tag}`, `${client.users.cache.get(client.sistem.BotOwner).displayAvatarURL({ dynamic: true })}`)
      .setTimestamp()
    logs.wsend(embed)
  }
}