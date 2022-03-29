const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const kullanicicinsiyet = new db.table("aCinsiyet");
const Config = require("../Settings/Config.json");
const wonxen = client.veri.RegisterSystem;
const wonxenveri = client.veri;
const wonxensistem = client.sistem;
const Ayarlar = client.veri.tepkiId;
const wonxenkanallar = client.veri.Kanallar;
const wonxez = client.bots;
module.exports = {
    Isim: "kadin",
    Komut: ["k", "kiz","kadın"],
    Kullanim: "kadin <@wonxen/ID> <isim> <yaş>",
    Aciklama: "Belirlenen üyeyi sunucu da kadın olarak kayıt eder.",
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
    let moment = require('moment')
    moment.locale('tr')
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "kayıt-log")
    let sohbet = message.guild.channels.cache.get(wonxen.Chat);
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })).setTimestamp();
    if((!wonxen.Man && !wonxen.Woman) || !wonxen.Register) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!wonxen.Register.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}kadın <@wonxen/ID> isim yaş\``).then(sil => sil.delete({timeout: 5000}));
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirlediğiniz üye sizden yetkili veya aynı yetkidesiniz.`).then(sil => sil.delete({timeout: 5000}));
    if(wonxen.Man.some(erkek => uye.roles.cache.has(erkek))) return message.channel.send(`Hata: Belirlediğiniz üye sunucuda zaten kayıtlı ne için tekrardan kayıt ediyorsun?`).then(sil => sil.delete({timeout: 5000}));
    if(wonxen.Woman.some(kadin => uye.roles.cache.has(kadin))) return message.channel.send(`Hata: Belirlediğiniz üye sunucuda zaten kayıtlı ne için tekrardan kayıt ediyorsun?`).then(sil => sil.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let BelirlenenIsim;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(`Hata: Lütfen tüm argümanları doldurunuz!  __Örn:__  \`${client.sistem.Prefix}kadın <@wonxen/ID> isim yaş\``).then(sil => sil.delete({timeout: 5000}));
        BelirlenenIsim = `${uye.user.username.includes(wonxenveri.Tag) ? wonxenveri.Tag : (wonxenveri.Tagsız ? wonxenveri.Tagsız : (wonxenveri.Tag || ""))} ${isim} | ${yaş}`;
        uye.setNickname(`${BelirlenenIsim}`).catch();
		       if(uye.user.username.includes(wonxenveri.Tag)) uye.roles.add(wonxen.tagRolu).catch();
            let kadın = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(wonxen.Woman)
            uye.roles.set(kadın).catch();	
        kullaniciverisi.push(`k.${uye.id}.isimler`, {
            Isim: BelirlenenIsim,
            Yetkili: message.author.id,
            Zaman: Date.now()
        });
            kullaniciverisi.add(`teyit.${message.author.id}.kadinteyit`, 1);
            kullanicicinsiyet.push(`veri.${uye.id}.cinsiyet`, `kadin`);
            message.lineReply(embed.setDescription(`\`•\` ${uye} Kullanıcıyı <@&${Config.RegisterSystem.Woman[0]}> rolünü vererek **Kadın** olarak kaydettim.\n\`•\` Kullanıcının ismi \`${BelirlenenIsim}\` olarak güncelleyip veri tabanına kaydettim.`)).then(message.react(wonxenveri.Others.CheckTick)).then(sil => sil.delete({timeout: 15000}));
            sohbet.send(`🎉 ${uye} adlı üye aramıza yeni katıldı bir hoş geldin diyelim ve senle birlikte topluluğumuz **${message.guild.memberCount}** kişi oldu!`).then(sil => sil.delete({timeout: 60000}));
            logs.wsend(embed.setDescription(`${uye} (\`${uye.user.tag}\`) adlı kullanıcı ${message.author} (\`${message.author.tag}\`) tarafından \`${moment().format('LLL')}\` tarihinde \`${BelirlenenIsim}\` ismiyle ve **Kadın** olarak kaydedildi.`))
    }
};
