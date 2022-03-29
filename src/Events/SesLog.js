const { GuildMember, MessageEmbed,Client,WebhookClient} = require("discord.js");
const System = require("../Settings/System.json");
const moment = require('moment');
moment.locale("tr");

module.exports = {
    Etkinlik: "voiceStateUpdate",
    /**
     * @param {Client} client
    */
    onLoad: function (client) {
       
    },

    /**
    * @param {User} oldMember
    * @param {User} newMember
    */
    onRequest: async function (oldState, newState) {
            let logs = client.guilds.cache.get(System.ID).channels.cache.find(c => c.name === "ses-log");
            if (!oldState.channelID && newState.channelID) return logs.wsend(`> ${newState.guild.members.cache.get(newState.id).displayName} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).user.id}\`) __üyesi__ \`${newState.guild.channels.cache.get(newState.channelID).name}\` __adlı sesli__ \`${moment().format('LLL')}\` __tarihinde kanala katıldı.__`).catch();
            if (oldState.channelID && !newState.channelID) return logs.wsend(`> ${newState.guild.members.cache.get(newState.id).displayName} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).user.id}\`) __üyesi__ \`${newState.guild.channels.cache.get(oldState.channelID).name}\` __adlı sesli __ \`${moment().format('LLL')}\` __tarihinde kanaldan ayrıldı.__`).catch();
            if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return logs.wsend(`> ${newState.guild.members.cache.get(newState.id).displayName} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).user.id}\`) __üyesi ses __ \`${moment().format('LLL')}\` __tarihinde kanalını değiştirdi.__ (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` ➜ \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`).catch();
            if (oldState.channelID && oldState.selfMute && !newState.selfMute) return logs.wsend(`> ${newState.guild.members.cache.get(newState.id).displayName} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).user.id}\`) __üyesi__ \`${newState.guild.channels.cache.get(newState.channelID).name}\` __adlı sesli kanalda__ \`${moment().format('LLL')}\` __tarihinde kendi susturmasını kaldırdı.__`).catch();
            if (oldState.channelID && !oldState.selfMute && newState.selfMute) return logs.wsend(`> ${newState.guild.members.cache.get(newState.id).displayName} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).user.id}\`) __üyesi__ \`${newState.guild.channels.cache.get(newState.channelID).name}\` __adlı sesli kanalda__ \`${moment().format('LLL')}\` __tarihinde  kendini susturdu.__`).catch();
            if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return logs.wsend(`> ${newState.guild.members.cache.get(newState.id).displayName} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).user.id}\`) __üyesi__ \`${newState.guild.channels.cache.get(newState.channelID).name}\` __adlı sesli kanalda__ \`${moment().format('LLL')}\` __tarihinde  kendi sağırlaştırmasını kaldırdı.__`).catch();
            if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return logs.wsend(`> ${newState.guild.members.cache.get(newState.id).displayName} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).user.id}\`) __üyesi__ \`${newState.guild.channels.cache.get(newState.channelID).name}\` __adlı sesli kanalda__\`${moment().format('LLL')}\` __tarihinde  kendini sağırlaştırdı.__`).catch();
    }
  };