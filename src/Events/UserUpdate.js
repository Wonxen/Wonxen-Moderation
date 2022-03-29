const { GuildMember, MessageEmbed,Client,WebhookClient} = require("discord.js");
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const moment = require('moment');
const cezaDb = new qDb.table("aCezalar");
const wonxen = client.veri
module.exports = {
    Etkinlik: "userUpdate",
    /**
     * @param {Client} client
    */
    onLoad: function (client) {
       
    },

    /**
    * @param {User} oldMember
    * @param {User} newMember
    */
    onRequest: async function (oldUser, newUser) {
        if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
        let client = oldUser.client;
        let guild = client.guilds.cache.get(client.sistem.ID);
        if(!guild) return console.error(`Hata: ${__filename} Sunucu bulunamadı!`);
        let user = guild.members.cache.get(oldUser.id);
        let ayarlar = client.veri
        let yasakTaglilar = cezaDb.get('yasakTaglilar') || [];
        let log = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "tag-log");
        const embed = new MessageEmbed().setAuthor(user.user.tag, user.user.avatarURL({dynamic: true})).setThumbnail(user.user.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp().setFooter(`Developer ${client.users.cache.get(client.sistem.BotOwner).tag}`, `${client.users.cache.get(client.sistem.BotOwner).avatarURL({ dynamic: true })}`);
        if ((ayarlar.YasakTaglar && ayarlar.YasakTaglar.some(tag => newUser.username.includes(tag))) && (wonxen.Roller.YasakliTagRole && !user.roles.cache.has(wonxen.Roller.YasakliTagRole))) {
          user.roles.set(user.roles.cache.has(wonxen.Roller.Booster) ? [wonxen.Roller.Booster, wonxen.Roller.YasakliTagRole] : [wonxen.Roller.YasakliTagRole]).catch();
          user.send(`**${user.guild.name}** sunucumuzun yasaklı taglarından birini kullanıcı adına aldığın için jaile atıldın! Tagı geri bıraktığında jailden çıkacaksın.`).catch();
          if(!yasakTaglilar.some(x => x.includes(newUser.id))) cezaDb.push('yasakTaglilar', `y${newUser.id}`);
          return;
        };
        if ((ayarlar.YasakTaglar && !ayarlar.YasakTaglar.some(tag => newUser.username.includes(tag))) && (wonxen.Roller.YasakliTagRoleu && user.roles.cache.has(wonxen.Roller.YasakliTagRole)) && yasakTaglilar.some(x => x.includes(newUser.id))) {
          user.roles.set(wonxen.RegisterSystem.Unregistered).catch();
          user.send(`**${user.guild.name}** sunucumuzun yasaklı taglarından birine sahip olduğun için jaildeydin ve şimdi bu yasaklı tagı çıkardığın için jailden çıkarıldın!`).catch();
          cezaDb.set('yasakTaglilar', yasakTaglilar.filter(x => !x.includes(newUser.id)));
          return;
        };


        // Tag Çıkardı Ekledi (Checkleyip Rol verme İsim Ayarlama İşlemi)
        if(newUser.username.includes(wonxen.Tag) && !user.roles.cache.has(wonxen.RegisterSystem.Family)){
             user.roles.add(wonxen.RegisterSystem.Family).catch();
             if(user.manageable) user.setNickname(user.displayName.replace(wonxen.Tagsız, wonxen.Tag)).catch();
             log.send(embed.setColor('#000c09').setDescription(`${user} kişisi ismine \`${wonxen.Tag}\` alarak <@&${wonxen.RegisterSystem.Family}> ailemize katıldı.`)).catch();
       } else if(!newUser.username.includes(wonxen.Tag) && user.roles.cache.has(wonxen.RegisterSystem.Family)){
             user.roles.remove(wonxen.RegisterSystem.Family).catch();
             log.send(embed.setColor('#f79b15').setDescription(`${user} kişisi isminden \`${wonxen.Tag}\` çıkartarak <@&${wonxen.RegisterSystem.Family}> ailemize ayrıldı.`)).catch();
        }
    }
  };