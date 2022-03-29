const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const wonxen = client.veri.RegisterSystem;
const wonxenveri = client.veri;
const wonxez = client.bots;
module.exports = {
    Isim: "isimler",
    Komut: ["isimsorgu"],
    Kullanim: "isimsorgu <@wonxen/ID>",
    Aciklama: "Belirlenen üyenin önceki isim ve yaşlarını gösterir.",
    Kategori: "Kayıt Komutları",
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
    let embed = new MessageEmbed().setColor("RANDOM").setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })).setTimestamp();
    if((!wonxen.Man && !wonxen.Woman) || !wonxen.Register) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!wonxen.Register.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}isimsorgu <@wonxen/ID>\``).then(sil => sil.delete({timeout: 5000}));
    let isimsorgu = kullaniciverisi.get(`k.${uye.id}.isimler`) || [];
   let Liste = isimsorgu.length || `0`;
  isimsorgu = isimsorgu.reverse();
  let IsimGecmisi;
  IsimGecmisi = isimsorgu.length > 0 ? isimsorgu.map((value, index) => `\`${index + 1}.\` ${value.Isim}`).join("\n") : "Üyenin herhangi bir kayıtı bulunamadı.";
    message.channel.send(embed.setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true})).setDescription(`\n${uye} Kullanıcısının toplamda \`${Liste}\` isim kayıtı bulundu.\n\n${IsimGecmisi}`));
    }
};
