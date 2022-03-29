const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kullaniciverisi = new qDb.table("aKullanici");
const kullanicicinsiyet = new qDb.table("aCinsiyet");
const moment = require('moment');
const wonxen = client.veri;
const wonxez = client.bots;
module.exports = {
    Isim: "unjail",
    Komut: ["cezalıçıkar"],
    Kullanim: "cezalıçıkar <@wonxen/ID>",
    Aciklama: "Belirlenen üyeyi cezalıdan çıkartır.",
    Kategori: "Yetkili",
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
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "jail-log");
    let embed = new MessageEmbed().setColor("RANDOM").setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true })).setTimestamp();
    let cezano = cezaNoDb.get(`cezano.${client.sistem.ID}`);
    if(!wonxen.Roller.JailHammer || !wonxen.Roller.JailHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!wonxen.Roller.JailHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.Prefix}unjail <@wonxen/ID>\``).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let jaildekiler = cezaDb.get(`cezalı`) || [];
    let kalıcıjaildekiler = cezaDb.get(`kalıcıcezalı`) || [];
    if (kalıcıjaildekiler.some(j => j.includes(uye.id))) cezaDb.set(`kalıcıcezalı`, kalıcıjaildekiler.filter(x => !x.includes(uye.id)));
    if (jaildekiler.some(j => j.id === uye.id)) cezaDb.set(`cezalı`, jaildekiler.filter(x => x.id !== uye.id));
    kullaniciverisi.set(`ceza.${jaildekiler.No}.BitisZaman`, Date.now());
    let erkeks = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(wonxen.RegisterSystem.Man);
    let teyitsiz = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(wonxen.RegisterSystem.Unregistered);
    let kizs = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(wonxen.RegisterSystem.Woman);
    let cinsiyet  = kullanicicinsiyet.get(`veri.${uye.id}.cinsiyet`);
    if(cinsiyet == `erkek`) {
         try {
           uye.roles.set(erkeks)

         } catch(err) { console.log(err) }
     } else {
        if(cinsiyet == `kadin`) {
         try {
           uye.roles.set(kizs)

         } catch(err) { console.log(err) }
      } else {
        try {
           uye.roles.set(teyitsiz)
           if(wonxen.Tagsız) uye.setNickname(`${wonxen.Tagsız} İsim | Yaş`).catch();
           else if(wonxen.Tag) uye.setNickname(`${wonxen.Tag} İsim | Yaş`).catch();    
         } catch(err) { console.log(err) }
      }
     }
    if(uye.voice.channel) uye.voice.kick().catch();
    message.channel.send(embed.setDescription(`${uye} (\`${uye.id}\`) üyesi, ${message.author} (\`${message.author.id}\`) tarafından cezalıdan çıkarıldı.`)).then(sil => sil.delete({timeout: 7500})).catch();
    message.react(wonxen.Others.CheckTick)
    logs.wsend(embed.setTitle('Bir Üye Cezası Kaldırıldı!').setDescription(`${uye} üyesi, ${message.author} tarafından **${client.tarihsel}** tarihin de cezalıdan çıkartıldı.`).setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true }))).catch();
    }
};
