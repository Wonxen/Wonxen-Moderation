const { GuildMember, MessageEmbed, Client } = require("discord.js");
const Conf = require("../Settings/Config.json");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
const fs = require("fs");

module.exports = {
  Etkinlik: "message",
  /**
   * @param {Client} client
   */
  onLoad: function (client) {},
  /**
   * @param {client} ready
   */
  onRequest: async function (message) {
    let iltifatSayi = 0;
    let iltifatlar = [
      "Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.",
      "Mavi gözlerin, gökyüzü oldu dünyamın.",
      "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
      "Huzur kokuyor geçtiğin her yer.",
      "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
      "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
      "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
      "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
      "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
      "Etkili gülüş kavramını ben senden öğrendim.",
      "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
      "Gözlerinle baharı getirdin garip gönlüme.",
      "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
      "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
      "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
      "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
      "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
      "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
      "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
      "Biraz Çevrendeki İnsanları Takarmısın ?",
      "Biliyormusun? wonxen seni çok seviyor...",
      "Kimse sevmesin ben severim seni caneeeem",
      "Senii seviooommm",
      "Kalbime giden yolu aydınlatıyor gözlerin. Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.",
      "Onu Bunu Boşver de bize gel 2 bira içelim.",
      "Merhem oldun yaralarıma",
      "Mucizelerden bahsediyordum sen geldin aklıma.",
      "Yaşanılacak en güzel mevsim sensin.",
      "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
      "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
      "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
      "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
      "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
      "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
      "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
      "Bir gamzen var sanki cennette bir çukur.",
      "Gecemi aydınlatan yıldızımsın.",
      "Ponçik burnundan ısırırım seni",
      "Bu dünyanın 8. harikası olma ihtimalin?",
      "Ştt fıstık naber?",
      "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
      "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
      "Müsaitsen aklım bu gece sende kalacak.",
      "Gemim olsa ne yazar liman sen olmadıktan sonra...",
      "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
      "Sabahları görmek istediğim ilk şey sensin.",
      "Mutluluk ne diye sorsalar cevabı gülüşünde ve o sıcak bakışında arardım.",
      "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
      "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
      "Sesini duymaktan hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
      "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
      "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
      "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
      "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
      "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
      "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre configlayın.",
      "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
      "Gülüşün ne güzel öyle cumhuriyetin gelişi gibi...",
      "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
      "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
      "Mavi gözlerin, gökyüzü oldu dünyamın.",
      "Seni gören kelebekler, narinliğin karşısında mest olur.",
      "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
      "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
      "Huzur kokuyor geçtiğin her yer.",
      "En güzel manzaramsın benim, seyretmeye doyamadığım.",
      "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
      "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
      "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
      "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
      "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
      "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
      "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
      "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
      "Etkili gülüş kavramını ben senden öğrendim.",
      "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
      "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
      "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan h er toprak benim de vatanımdır.",
      "Gözlerinle baharı getirdin garip gönlüme.",
      "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
      "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
      "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
      "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
      "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
      "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
      "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
      "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
      "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
      "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
      "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
      "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
      "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
      "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
      "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
      "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
      "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim.",
    ];
    if (message.channel.id === Conf.RegisterSystem.Chat && !message.author.bot) {
      iltifatSayi++;
      if (iltifatSayi >= 50) {
        iltifatSayi = 0;
        message.lineReply(iltifatlar.random());
      }
    }
  },
};
