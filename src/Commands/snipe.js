const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const moment = require('moment');
require('moment-duration-format');
const wonxen = client.veri;
const wonxenveri = client.veri;
const wonxez = client.bots;
module.exports = {
    Isim: "snipe",
    Komut: ["snipe"],
    Kullanim: "snipe",
    Aciklama: "Komutun kullanıldığı kanal da en son silinmiş mesajın içeriğini ve tarihini gösterir.",
    Kategori: "Üye",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {
    client.on("messageDelete", async message => {
        if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
        await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { 
            yazar: message.author.id,
            yazilmaTarihi: message.createdTimestamp, 
            silinmeTarihi: Date.now(), 
            dosya: message.attachments.first() ? true : false });
        if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
    });
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`);
    if (!mesaj) return message.channel.send('Hata: `Bu Kanalda silinmiş bir mesaj yok!`').then(message.react(wonxenveri.Others.RedTick)).then(x => x.delete(5000));
    let mesajYazari = await client.users.fetch(mesaj.yazar);
    let embed = new MessageEmbed().setDescription(`\`>\` **Mesajı Yazan Kişi:** ${mesajYazari} - (\`${mesajYazari.tag}\`-\`${mesajYazari.id}\`) \n\`>\` **Mesajın Silinme Tarihi:** \`${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} önce\` \n\`>\` **Mesaj İçeriği:** ${mesaj.icerik}\n ${mesaj.dosya ? "\n**Atılan mesaj dosya içeriyor**" : ""}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })).setColor("RANDOM");
    message.lineReply(embed).then(message.react(wonxenveri.Others.CheckTick)).then(x => x.delete({timeout: 2*15000}));
    }
};