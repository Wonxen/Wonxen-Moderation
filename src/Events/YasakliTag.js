const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
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
            yasakliTagKontrolEt();
          }, 10000);
    }
  };

  function yasakliTagKontrolEt() {
    let wonxen = client.veri;
    let wonxenveri = client.veri
    let sid = client.sistem.ID;
    
    // Yasaklı tag tarama (Yasaklı Tag Checkleme)
    let YasakTaglar = wonxenveri.YasakTaglar || [];
    let yasakTaglilar = cezaDb.get("yasakTaglilar") || [];
  for (let kisi of yasakTaglilar) {
    let uye = client.guilds.cache.get(sid).members.cache.get(kisi.slice(1));
    if (uye && YasakTaglar.some(tag => uye.user.username.includes(tag)) && !uye.roles.cache.has(wonxen.Roller.YasakliTagRole)) uye.roles.set(uye.roles.cache.has(wonxen.Roller.Booster) ? [wonxen.Roller.Booster, wonxen.Roller.YasakliTagRole] : [wonxen.Roller.YasakliTagRole]).catch();
    if (uye && !YasakTaglar.some(tag => uye.user.username.includes(tag)) && uye.roles.cache.has(wonxen.Roller.YasakliTagRole)) {
      cezaDb.set("yasakTaglilar", yasakTaglilar.filter(x => !x.includes(uye.id)));
      uye.roles.set(wonxen.RegisterSystem.Unregistered).catch();
      if(wonxen.Tagsız) uye.setNickname(`${wonxen.Tagsız} İsim | Yaş`).catch();
      else if(wonxen.Tag) uye.setNickname(`${wonxen.Tag} İsim | Yaş`).catch();
    };
  };
  };