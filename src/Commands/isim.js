const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const wonxen = client.veri.RegisterSystem;
const wonxenveri = client.veri;
const wonxez = client.bots;
module.exports = {
    Isim: "isim",
    Komut: ["nick", "i"],
    Kullanim: "isim <@wonxen/ID> <isim> <yaş>",
    Aciklama: "Belirlenen üyenin sununucu içerisindeki isim ve yaşını değiştir.",
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
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}isim <@wonxen/ID> isim yaş\``).then(sil => sil.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirlediğiniz üye sizden yetkili veya aynı yetkidesiniz.`).then(x => x.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isimdata = kullaniciverisi.get(`k.${uye.id}.isimler`) || [];
    let isimler = isimdata.length > 0 ? isimdata.map((value, index) => `\`${index + 1}.\` ${value.Isim}`).join("\n") : "Sistem de isim kaydı bulunamadı!";
    let BelirlenenIsim;
    let isim = args.filter(argüman => isNaN(argüman)).map(argüman => argüman.charAt(0).replace('i', "İ").toUpperCase()+argüman.slice(1)).join(" ");
    let yaş = args.filter(argüman => !isNaN(argüman))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(`Hata: Lütfen tüm argümanları doldurunuz!  __Örn:__  \`${client.sistem.Prefix}isim <@wonxen/ID> isim yaş\``).then(sil => sil.delete({timeout: 5000}));
        BelirlenenIsim = `${uye.user.username.includes(wonxenveri.Tag) ? wonxenveri.Tag : (wonxenveri.Tagsız ? wonxenveri.Tagsız : (wonxenveri.Tag || ""))} ${isim} | ${yaş}`;
        uye.setNickname(`${BelirlenenIsim}`).catch();
        kullaniciverisi.push(`k.${uye.id}.isimler`, {
            Isim: BelirlenenIsim,
            Yetkili: message.author.id,
            Zaman: Date.now()
        });
  
  message.channel.send(embed.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`${uye} Kullanıcının ismi başarıyla \`${BelirlenenIsim}\` olarak değiştirildi.`).addField(`Kullanıcısının toplamda \`${isimdata.length}\` isim kayıtı bulundu.` || `0`, isimler, true)).then(message.react(wonxenveri.Others.CheckTick));
    }
};
