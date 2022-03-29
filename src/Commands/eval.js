const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const wonxen = client.sistem;
const wonxenveri = client.veri;
module.exports = {
    Isim: "eval",
    Komut: ["eval"],
    Kullanim: "eval @param {wonxen} discord",
    Aciklama: "Eval bot sahibinin test komutudur.",
    Kategori: "Bot/Taç",
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
    if(!wonxen.Staff.some(id => message.author.id === id)) return;
    if(!wonxen.Staff.some(id => message.author.id === id)) return;
    if(!wonxen.Staff.some(id => message.author.id === id)) return;
    if (!args[0]) return message.channel.send(`Hata: \`Kod belirtilmedi.\` ${message.author.tag} Lütfen kod belirt!`);
    let code = args.join(' ');

    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.Token}`, 'g'))) evaled.replace("Token", "Yasaklı komut").replace(client.Token, "Yasaklı komut");
      message.channel.send(`${evaled.replace(client.Token, "Yasaklı komut")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };
}
};
