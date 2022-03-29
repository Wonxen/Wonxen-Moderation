const { Client, Message, MessageEmbed, Guild, WebhookClient } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const wonxen = client.veri;
const wonxenveri = client.veri;
const wonxez = client.bots;
const moment = require('moment')
moment.locale('tr')
require('discord-inline-reply');
module.exports = {
    Isim: "rol",
    Komut: ["rol","r"],
    Kullanim: "rol <ver-al> <Rol-Id>",
    Aciklama: "Belirlenen üyeye belirlenen rolü verip almak için kullanılır!",
    Kategori: "Yetkili Komutları",
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
    let logs = client.guilds.cache.get(client.sistem.ID).channels.cache.find(c => c.name === "rol-log");
    let embed = new MessageEmbed().setColor("RANDOM").setTimestamp().setFooter(wonxez.Footer,message.guild.iconURL({ dynamic: true }))
    let wonxenemb = new MessageEmbed().setColor('RANDOM');
    let kullanici = message.mentions.users.first() || message.guild.members.cache.get(args[1])
    let x = message.guild.member(kullanici);
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a => a.name == args.slice(2).join(' '));
    if (!wonxen.Roller.RoleHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emoji(wonxenveri.Others.RedTick)} ${message.member}, Rol ver/al işlemi için __yeterli yetkiye__ sahip değilsin!`).then(x => x.delete({timeout: 5000}));
    if(args[0] !== "ver" && args[0] !== "al") return message.channel.send(`Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`.rol ver/al @wonxen/ID <EtiketRol/RolID>\``).then(x => x.delete({timeout: 5000}));
    if(!kullanici) return message.channel.send('Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`.rol ver/al @wonxen/ID <EtiketRol/RolID>\`').then(x => x.delete({timeout: 5000}));
    if(!rol) return message.channel.send('Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`.rol ver/al @wonxen/ID <EtiketRol/RolID>\`').then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.comparePositionTo(rol) < 1) {
      return message.channel.send(`Hata: \`Vermek istediğiniz rol sizin rollerinizden üstün!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
    }
    if(rol.name == "__________________") {
      return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
    }


    if(args[0] === "ver") {
      try{
        
        await (x.roles.add(rol.id).catch())
        message.lineReply(wonxenemb.setDescription(`${kullanici} kişisine <@&${rol.id}> adlı rolü başarıyla verdim.`)).then(message.react(wonxenveri.Others.CheckTick));
        logs.wsend(embed.setAuthor(`Bir kullanıcıya rol verildi`, client.user.displayAvatarURL({ dynamic: true })).setDescription(`${message.author} (\`${message.author.id}\`) tarafından ${kullanici} (\`${kullanici.id}\`) adlı kullanıcıya \`${moment().format('LLL')}\` tarihinde ${rol} isimli rol verildi.`));
         } catch (e) {
            console.log(e);
            message.channel.send('Hata: \`Sistemsel olarak hata oluştu lütfen @wonxen yetkilisine başvurunuz\`!').then(x => x.delete({timeout: 5000}));
          }
    };
  
    if(args[0] === "al") {
      try{
        await (x.roles.remove(rol.id).catch())
        message.lineReply(wonxenemb.setDescription(`${kullanici} kişisinden <@&${rol.id}> adlı rolü başarıyla geri aldım.`)).then(message.react(wonxenveri.Others.CheckTick));
        logs.wsend(embed.setAuthor(`Bir kullanıcıdan rol alındı`, client.user.displayAvatarURL({ dynamic: true })).setDescription(`${message.author} (\`${message.author.id}\`) tarafından ${kullanici} (\`${kullanici.id}\`) adlı kullanıcıdan \`${moment().format('LLL')}\` tarihinde ${rol} isimli rolü aldı.`));
       
          } catch (e) {
            console.log(e);
            message.channel.send('Hata: \`Sistemsel olarak hata oluştu lütfen @wonxen yetkilisine başvurunuz\`!').then(x => x.delete({timeout: 5000}));
          }
      }
  }
};


