const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const kullaniciverisi = new qDb.table("aKullanici");
const moment = require('moment');
module.exports = {
    Etkinlik: "ready",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
       
    },
    /**
     * @param {GuildMember} member
     */
    onRequest: async function () {
      setInterval(() => {
              TagKontrolEt();
          }, 10000);
    }
  };

  function TagKontrolEt() {
    let wonxen = client.veri;
    let sid = client.sistem.ID;
    //if (wonxen.RegisterSystem.Unregistered) client.guilds.cache.get(sid).members.cache.filter(uye => uye.roles.cache.size === 1).array().forEach((uye, index) => setTimeout(() => { uye.roles.add(wonxen.RegisterSystem.Unregistered).catch(console.error); uye.setNickname('⸸ İsim | Yaş'); }, index*1000));
    client.guilds.cache.get(sid).members.cache.filter(uye => uye.user.username.includes(wonxen.Tag) && !uye.hasPermission('ADMINISTRATOR') && !uye.roles.cache.has(wonxen.Roller.JailRole) && !uye.roles.cache.has(wonxen.RegisterSystem.Unregistered) && !uye.roles.cache.has(wonxen.Roller.YasakliTagRole) && !uye.roles.cache.has(wonxen.Roller.SupheliRole) && (!uye.roles.cache.has(wonxen.RegisterSystem.Family) || !uye.displayName.startsWith(wonxen.Tag))).array().forEach((uye, index) => {
        setTimeout(() => {
          uye.setNickname(uye.displayName.replace(wonxen.Tagsız, wonxen.Tag));
          uye.roles.add(wonxen.RegisterSystem.Family);
        }, index*5000);
      });
  };