import { nameKeys } from "./address.ts";
import type { ProjectReview } from "./types.ts";

export type { ProjectReview };

const REVIEWS: Record<string, ProjectReview[]> = {
  "anthill residence": [
    {
      sentiment: "negative",
      source: "Şikayet Haberleri",
      url: "https://sikayethaberleri.com/2019/02/06/istanbul-anthill-rezidans/",
      date: "2019-02-06",
      original:
        "İstanbul Anthill Rezidans’ta oturuyorum. Yönetimin ve çalışanların keyfi tutumlarından sitedeki aileler olarak bıktık. Kullandığımız suyu daire sakinlerine dubai fiyatlarıyla satıyorlar. Kesilen hizmetleri açtırmak ayrı bir dert. Ödeme yapıldığı halde suların gelmesi iki gün sürüyor. Biraz oturanlara saygı lütfen.",
      translation:
        "我住在伊斯坦布尔 Anthill 公寓。作为小区里的住户家庭，我们已经受够了物业和管理人员随心所欲的态度。他们把我们用的水以迪拜的价格卖给住户。被停掉的服务要重新开通，又是另一桩麻烦。即使已经付了钱，水也要两天才会来。请对住户稍微尊重一点。",
    },
    {
      sentiment: "negative",
      source: "Google Maps · Erdem Akalin",
      url: "https://www.google.com/maps/search/?api=1&query=Anthill%20Residence%20Incirli%20Dede%20Cd.%20No%3A6%20Sisli",
      date: "8 ay önce",
      rating: "1/5",
      original:
        "B Blok da 2+1 de kiracı olarak oturuyorum. Bana concierge tarafından 2+1ler için 3 tane kart hakkı tanımlandığı söylenmişti . Ancak , bugün 3. kişi için tanimlanmis olan kartı hiçbir neden olmadan iptal ettiler . Bu kadar aidat ödediğim halde , böyle bir davranış beklemezdim doğrusu .",
      translation:
        "我租住在 B 栋的 2+1。礼宾跟我说过，2+1 可以办 3 张门卡。可今天他们没有任何理由，把给第三个人办的卡停了。我交了这么多物业费，真没想到会这样。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Yücel Yilmaz",
      url: "https://www.google.com/maps/search/?api=1&query=Anthill%20Residence%20Incirli%20Dede%20Cd.%20No%3A6%20Sisli",
      date: "2 hafta önce",
      rating: "5/5",
      original: "Süper rahat keyifli  2 gün geçirdim teşekkürler Anthill",
      translation: "非常舒服、很开心，我在这里过了两天。谢谢 Anthill。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Hümeyra Aslan",
      url: "https://www.google.com/maps/search/?api=1&query=Anthill%20Residence%20Incirli%20Dede%20Cd.%20No%3A6%20Sisli",
      date: "8 ay önce",
      rating: "5/5",
      original:
        "Çalışanların hepsi çok güler yüzlü insanlardı. Genel olarak alanlar tertemiz ve hijyenikti. Jakuzi ve sıcak taş yataklarının olması bizim için çokça artıydı çok rahatlatıcıydı. Rahatlıkla tercih edebilirsiniz.",
      translation:
        "员工都很和气。整体地方干净、卫生。有按摩浴缸和热石床，对我们是很大的加分，也很放松。可以放心选择。",
    },
  ],
  "bomonti residences by rotana": [
    {
      sentiment: "negative",
      source: "Şikayetvar · Gürhan",
      url: "https://www.sikayetvar.com/bomonti-residences-by-rotana/bomonti-residences-by-rotana-memnuniyetsizligi",
      date: "2025-07-06",
      original:
        "Bomonti Residance By Rotana'da oturmaktayım, ** blok kat ** tam tamına 2 aydır duşumu kullanamıyorum! Giderde sıkıntı var, alt kata olan daireye tavanından su gidiyormuş. Gider borusundan olan sıkıntıdan. Uzun zamandır bekliyorum kaç defa şikayet yaptım gelip yapmadılar. Kendim gider kısmını biraz açtım baktım ki. İçerisine fayans yapıştırı dökülmüş ve taş gibi olmuş galiba daire yapan taş ustaları gide dökmüş.\n\nYine her gün şikayetimizden dolayı ekipler bir kaç defa gelip baktılar sonunda bizden olmadığını binadan kaynaklanın sıkıntı olduğunu tespit ettiler. Bunu üzerine ustalar geldi banyonun taşlarını ve giderini söktü ama yine tekrar kayıp oldular yine onca şikayetimiz üzerine verdikleri cevap taş ustalarını işten çıkarmışlar yeni birini alana kadar beklememiz gerekmiş. Bu şekil saçmalık mı olur. Banyo kullanamıyorum. En son biri gelecek dediler malum tatil sezonu çok önceden ayarladığımız için kızım ben kalırım yeter ki banyo yapılsın diye kaldı söyledikleri günde bir usta gelip kum döktükten sonra yine 1 haftadır ses yok. Kızım tatilinden oldu biz sinirden tatilimizi yapamadık ve geri dönüyorum sırf adli işlemler başlatmak bilir kişi getirmek için.\n\nNe böyle yönetim ve residance idaresi gördüm aidat gelince gününde ödüyoruz ama. Kesinlikle hizmet sıfır! Kesinlikle Rotana by Arjaan grubuna yakışmıyor.",
      translation:
        "我住在 Bomonti Residence By Rotana，** 栋 ** 层，整整两个月没法用淋浴。排水有问题，水从排水管漏到楼下那套房子的天花板。我等了很久，投诉了很多次，他们都不来修。我自己把排水口打开一点看，里面倒进了瓷砖胶，已经硬得像石头，大概是做这套房的瓦工倒进去的。\n\n因为我们每天都在投诉，维修队来看了几次，最后确认问题不在我们这边，是楼里的问题。之后师傅来了，把浴室的石材和排水拆开，然后又消失了。我们继续投诉，得到的答复是他们把瓦工辞退了，要等招到新的人。这算什么道理。我用不了浴室。最后他们说会有人来。假期我们早就订好了，我女儿说她留下，只要把浴室修好就行。他们说好的那天来了一个师傅，倒了些沙子，然后又一个星期没有消息。我女儿的假期没了，我们气得也没去成，现在赶回来，就是为了走法律程序、请鉴定人。\n\n我没见过这样的物业和公寓管理。物业费一到日子我们就交。服务绝对是零。这绝对配不上 Rotana by Arjaan 这个牌子。",
    },
    {
      sentiment: "positive",
      source: "Şikayetvar · Gürhan",
      url: "https://www.sikayetvar.com/bomonti-residences-by-rotana/bomonti-residences-by-rotana-memnuniyetsizligi",
      date: "2025-07-12",
      original:
        "Çok uzun aradan sonra eksik işi tamamladılar çok şükür diyoruz. Gelen usta çok iyi iş çıkardı ona da tekrardan teşekkür ediyorum.",
      translation: "拖了很久之后，他们终于把没做完的活补上了，我们谢天谢地。来的师傅手艺很好，我再一次谢谢他。",
    },
  ],
  "maslak koru": [
    {
      sentiment: "positive",
      source: "Google Maps · mehmet hanifi kizgin",
      url: "https://www.google.com/maps/search/?api=1&query=Maslak%20Koru%20Kemerburgaz%20Cd.%20No%3A7%20Sariyer",
      date: "bir yıl önce",
      rating: "4/5",
      original: "Dereden gelen koku insanları rahatsız ediyor",
      translation: "小溪那边传来的气味让人难受。",
    },
  ],
  "taksim 360": [
    {
      sentiment: "negative",
      source: "Google Maps · Michael",
      url: "https://www.google.com/maps/search/?api=1&query=Taksim%20360%20Tarlabasi%20Blv%20150%20Beyoglu",
      date: "3 ay önce",
      rating: "1/5",
      original:
        "Burada ki otelde konakladık aracımızı otoparklarına koyduk aracı çıkartırken resmen bizi rehin aldılar aracımızı vermediler asla arabanızı buranın otoparkına sokmayın",
      translation:
        "我们住在这里的酒店，把车停进了他们的停车场。取车的时候他们简直把我们扣住了，不把车给我们。千万别把车开进这里的停车场。",
    },
    {
      sentiment: "negative",
      source: "Google Maps · muhammed lutfi Aydin",
      url: "https://www.google.com/maps/search/?api=1&query=Taksim%20360%20Tarlabasi%20Blv%20150%20Beyoglu",
      date: "4 yıl önce",
      rating: "1/5",
      original:
        "Taksim 360, Aslına benzetme, Klasik görünüm verilmeye çalışılmış, ancak yapmacık olmuş. Daha kaliteli çalışılabilinirdi.",
      translation: "Taksim 360 想仿成原来的样子，努力做成古典外观，但显得做作。本来可以做得更讲究。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Seval TOGRAL",
      url: "https://www.google.com/maps/search/?api=1&query=Taksim%20360%20Tarlabasi%20Blv%20150%20Beyoglu",
      date: "3 ay önce",
      rating: "5/5",
      original:
        "Mekanın atmosferi ve yemekleri harikaydı fakat özellikle bizimle ilgilenen Burak Beyin güler yüzü, dikkati ve nezaketi akşamımızı ekstra keyifli kıldı. Masa ile son derece ilgili, seri ve kibar bir şekilde ilgilendi. Kesinlikle tavsiye ediyorum.",
      translation:
        "店里的气氛和菜都很好，尤其是招待我们的 Burak 先生，他的笑容、细心和礼貌让这个晚上特别愉快。他对餐桌非常上心，做事利落又客气。我一定会推荐。",
    },
  ],
  "hayat city mahmutbey": [
    {
      sentiment: "negative",
      source: "Google Maps · Sinan AY",
      url: "https://www.google.com/maps/search/?api=1&query=Hayat%20City%20Mahmutbey%20Bosna%20Cd.%20No%3A20",
      date: "bir ay önce",
      rating: "1/5",
      original:
        "Kesinlikle daire almayın satıştan sonra problem çözmüyorlar daire camları tamamen çizik ilgilenmiyorlar dairedeki sorunlar buraya sığmaz . Kimseye tavsiye etmiyorum uzak durun.",
      translation:
        "千万别买这里的房子。卖完之后他们不解决问题，房子的玻璃全是划痕，他们也不管。这套房里的问题写都写不完。我不向任何人推荐，离远一点。",
    },
    {
      sentiment: "negative",
      source: "Google Maps · isim soyisim",
      url: "https://www.google.com/maps/search/?api=1&query=Hayat%20City%20Mahmutbey%20Bosna%20Cd.%20No%3A20",
      date: "bir hafta önce",
      rating: "1/5",
      original: "Sanayi tesislerinin ortasında tek bina, proje diye yutturmasinlar, ayrıca etrafı berbat muhit çok kötü.",
      translation: "工业厂房中间孤零零一栋楼，别拿“项目”来糊弄人。周围也很糟，地段非常差。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Mustafa Bayındır",
      url: "https://www.google.com/maps/search/?api=1&query=Hayat%20City%20Mahmutbey%20Bosna%20Cd.%20No%3A20",
      date: "10 ay önce",
      rating: "5/5",
      original:
        "Yüksek yatırım getirisi potansiyeliyle dikkat çeken bir proje. Konsept, lokasyon ve planlama açısından güçlü bir izlenim veriyor. Yaşamın yakında başlayacak olması projeyi daha da cazip kılıyor.",
      translation:
        "这个项目因为投资回报潜力高而引人注意。概念、位置和规划都给人比较强的印象。生活配套即将启动，也让项目更有吸引力。",
    },
  ],
  "referans beylikduzu": [
    {
      sentiment: "negative",
      source: "Google Maps · Deniz Pehlivan",
      url: "https://www.google.com/maps/search/?api=1&query=Referans%20Beylikduzu%20Kocatepe%20Cad%20Kavakli",
      date: "11 ay önce",
      rating: "1/5",
      original:
        "Spor salonunun hep bi bahane ile kapalı olduğu, zamanında açılmadığı, çalışanın keyfine göre hizmet veren, sıcak sularının arıza nedeni ile kesik olduğu, fiyatı çok ederi az  site.",
      translation:
        "健身房总有借口不开，到点也不开门，员工看心情服务。热水会因为故障停掉。这个小区价格很高，实际不值。",
    },
  ],
  "taksim palas": [
    {
      sentiment: "negative",
      source: "Google Maps · Dogus Savu",
      url: "https://www.google.com/maps/search/?api=1&query=Taksim%20Palas%20Cobanoglu%20Sk.%20No%3A72%20Ferikoy",
      date: "6 ay önce",
      rating: "1/5",
      original:
        "Berbat bir site yönetimi. Spor salonu hala yok, 2-3 gün sıcak suyunuz ve ısıtmanız olmadan yaşamanız gerekebiliyor. Ev alacak veya kiralayacak kişilere kesinlikle tavsiye etmiyorum.",
      translation:
        "物业很差。健身房到现在还没有。你可能得过两三天没有热水、没有暖气的日子。要买或租这里的人，我绝对不推荐。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Akif Sandıklı",
      url: "https://www.google.com/maps/search/?api=1&query=Taksim%20Palas%20Cobanoglu%20Sk.%20No%3A72%20Ferikoy",
      date: "bir ay önce",
      rating: "5/5",
      original: "Konum mükemmel sıfır bina yatay mimari",
      translation: "位置极好，全新的楼，横向的建筑格局。",
    },
  ],
  "imperium no1 residence": [
    {
      sentiment: "neutral",
      source: "Google Maps · Plustr",
      url: "https://www.google.com/maps/search/?api=1&query=Imperium%20no1%20residence%20Ayyildiz%20Sk%20No%3A11%20Kagithane",
      date: "bir ay önce",
      rating: "3/5",
      original:
        "Sanırım otel olarak çalışıyor, Otelin iç kısmı ve hizmeti açısından yorum yapamıyorum ama lokasyonu çok iyi bence. Şişli, Taksim ve diğer merkezi yerlere yakın. Toplu ulaşım olarak metrobüs durağına yakın.",
      translation:
        "我猜它是当酒店在运营。酒店内部和服务我评价不了，但我觉得位置很好，离希什利、塔克西姆和其他市中心都近。公共交通方面，离地铁公交车站也近。",
    },
  ],
  "flat 24": [
    {
      sentiment: "positive",
      source: "Google Maps · nevzat kara",
      url: "https://www.google.com/maps/search/?api=1&query=Flat%2024%20Bahar%20Cd.%20No%3A77%20Bagcilar",
      date: "3 yıl önce",
      rating: "5/5",
      original: "İnşaat halinde bitince çok güzel olacak öyle tahmin ediyorum",
      translation: "现在还在施工，我估计建完会很好看。",
    },
  ],
  "rams park house maslak": [
    {
      sentiment: "negative",
      source: "Google Maps · Halil K.",
      url: "https://www.google.com/maps/search/?api=1&query=RAMS%20Park%20House%20Maslak%201453%20Cd.",
      date: "bir ay önce",
      rating: "1/5",
      original:
        "Yolu yok izi yok saçma sapan bir yerde yeni bir rezidans katliamı. Parsel parsel rantın dağıtıldığı bu memlekete büyük ihanet ediliyor. Uzak durun",
      translation:
        "没路，没踪迹，在一个莫名其妙的地方又搞了一场新的公寓浩劫。这块地被一块块拿去分炒作收益，对这个国家是很大的辜负。离远一点。",
    },
    {
      sentiment: "negative",
      source: "Google Maps · Oğuz Öcal",
      url: "https://www.google.com/maps/search/?api=1&query=RAMS%20Park%20House%20Maslak%201453%20Cd.",
      date: "bir ay önce",
      rating: "2/5",
      original:
        "Dere yatağında olduğu için su bastı. İlk yorumların tamamı bölgedeki emlakçıların yorumları, bu nedenle detaylı araştırmalısınız.",
      translation: "因为它在河滩上，被水淹过。最早的评论全是这一带中介写的，所以你得自己仔细查。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · cumhur boz",
      url: "https://www.google.com/maps/search/?api=1&query=RAMS%20Park%20House%20Maslak%201453%20Cd.",
      date: "9 ay önce",
      rating: "5/5",
      original: "Proje çok güzel yeni başlıyor 2027 sonu teslim derler  hayırlı olsun",
      translation: "项目很漂亮，刚开工。他们说 2027 年底交房。祝顺利。",
    },
  ],
  "luxera topkapi": [
    {
      sentiment: "positive",
      source: "Google Maps · Ömer Faruk Çelik",
      url: "https://www.google.com/maps/search/?api=1&query=Luxera%20Topkapi%20Davutpasa%20Cd.%20No%3A127",
      date: "9 ay önce",
      rating: "5/5",
      original:
        "Her gün önünden geçtiğim güzergaha satış ofisi açılmış, hafta sonu ziyaret ettim. Çok güzel ilgilenildi. Ama daha da önemlisi tam yatırımlık proje yapmışlar. Muhtemelen yatırımcısı olacağım. İlginize bir kez daha buradan teşekkür etmek istedim.",
      translation:
        "我每天经过的路上开了售楼处，周末去看了。接待得很周到。更重要的是，他们做的正是适合投资的项目。我大概会成为投资人。再一次为他们的接待道谢。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Altan Toy",
      url: "https://www.google.com/maps/search/?api=1&query=Luxera%20Topkapi%20Davutpasa%20Cd.%20No%3A127",
      date: "8 ay önce",
      rating: "5/5",
      original:
        "Davutpaşa caddesi üzerinde, ayrıca metro ve metrobüs duraklarının arasında yer alıyor. Yüksek kira getirisi hedefleyenlerin mutlaka görmesi gereken bir konut projesi.",
      translation: "它在 Davutpaşa 大街上，又夹在地铁和地铁公交车站之间。想要高租金回报的人一定要看看这个住宅项目。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Cihan GÖKDEMİR",
      url: "https://www.google.com/maps/search/?api=1&query=Luxera%20Topkapi%20Davutpasa%20Cd.%20No%3A127",
      date: "9 ay önce",
      rating: "5/5",
      original: "Modern mimarisi ile bölgeye yenilik kazandıracak harika bir karma proje.",
      translation: "现代的建筑会给这一带带来新气象，是个很好的综合体项目。",
    },
  ],
  "bakirci zenit topkapi": [
    {
      sentiment: "positive",
      source: "Google Maps · emre sönmez",
      url: "https://www.google.com/maps/search/?api=1&query=Bakirci%20Zenit%20Topkapi%20Gumussuyu%20Cd.%2019",
      date: "bir ay önce",
      rating: "5/5",
      original:
        "Ailece yaşanabilecek güzel bir proje olacağını düşünüyorum. Daire tiplerinin farklı ihtiyaçlara hitap etmesi ve konumunun merkezi olması güzel. Özellikle geniş daire seçenekleri dikkatimi çekti. Hayırlı olmasını dilerim.",
      translation:
        "我觉得这会是一个适合一家人住的好项目。户型能对应不同需求，位置也在中心，这点很好。尤其是大户型引起了我的注意。祝顺利。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Murat BAĞRAN",
      url: "https://www.google.com/maps/search/?api=1&query=Bakirci%20Zenit%20Topkapi%20Gumussuyu%20Cd.%2019",
      date: "bir ay önce",
      rating: "5/5",
      original:
        "Projeyi gezme fırsatım oldu, gerçekten güzel düşünülmüş. Daire seçenekleri ve genel yerleşimi hoşuma gitti. Özellikle konumu ve deprem konusunda alınan önlemler bence önemli avantajlar. Emeği geçenlerin eline sağlık.",
      translation:
        "我有机会看了这个项目，确实想得很周到。户型选择和整体布局我都喜欢。我觉得位置，以及抗震方面做的措施，是重要优点。辛苦做这个项目的人了。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Özlem Önal",
      url: "https://www.google.com/maps/search/?api=1&query=Bakirci%20Zenit%20Topkapi%20Gumussuyu%20Cd.%2019",
      date: "bir ay önce",
      rating: "5/5",
      original:
        "Konumu güzel, daire seçenekleri de oldukça çeşitli. Projenin genel havasını beğendim. Özellikle 3+1 dubleks daireler farklı bir seçenek olmuş. Emeği geçenlere başarılar, hayırlı olsun.",
      translation:
        "位置好，户型也相当多。我喜欢项目的整体感觉。尤其是 3+1 复式，成了一个不一样的选择。祝做这个项目的人成功，也祝项目顺利。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Kerem şuşoğlu",
      url: "https://www.google.com/maps/search/?api=1&query=Bakirci%20Zenit%20Topkapi%20Gumussuyu%20Cd.%2019",
      date: "bir ay önce",
      rating: "5/5",
      original:
        "Günümüzde ev alırken sadece konuma değil, güvenliğe de dikkat etmek gerekiyor. Projede sismik izolatör kullanılması benim açımdan önemli bir detay. Modern daire seçenekleriyle de dikkat çeken bir proje olmuş.",
      translation:
        "现在买房不能只看位置，也得看安全。项目用了隔震器，对我来说是重要的一点。现代的户型选择也让这个项目很显眼。",
    },
  ],
  "avangart istanbul": [
    {
      sentiment: "positive",
      source: "Google Maps · hüseyin karakoca",
      url: "https://www.google.com/maps/search/?api=1&query=Avangart%20Istanbul%20Cendere%20Cad.%20No%3A110",
      date: "3 yıl önce",
      rating: "5/5",
      original:
        "Yapısı güzel şehrin ortasında ulaşım iyi ormana yakın konforlu güvenli konaklama için uygun rezidans güzel mekan",
      translation: "建筑好看，在城市中间，交通好，离林子近。作为舒适、安全的住处，这个公寓合适，地方也好。",
    },
    {
      sentiment: "positive",
      source: "Google Maps · Mehdi Dogan",
      url: "https://www.google.com/maps/search/?api=1&query=Avangart%20Istanbul%20Cendere%20Cad.%20No%3A110",
      date: "2 yıl önce",
      rating: "5/5",
      original: "Biraz labirent gibi ama. Çok güzel bir site... manzarası efsane...",
      translation: "有点像迷宫。但小区非常好，景色绝了。",
    },
  ],
  "nurol life": [
    {
      sentiment: "positive",
      source: "Google Maps · Ali Kouhi",
      url: "https://www.google.com/maps/search/?api=1&query=Nurol%20Life%20Metin%20Oktay%20Caddesi%20No%3A3",
      date: "bir ay önce",
      rating: "5/5",
      original:
        "Manzara, konum, tavan yüksekliği, camların tam açılması, havuz, otopark 10 numara. Yönetim çok disiplinli her yer pırıl pırıl. 6 yıl oturdum.",
      translation:
        "景色、位置、层高、窗户能完全打开、泳池、停车场，都是满分。物业很有规矩，到处干干净净。我住了 6 年。",
    },
  ],
  "mega garden park": [
    {
      sentiment: "positive",
      source: "Google Maps · Ali Büyükyılmaz",
      url: "https://www.google.com/maps/search/?api=1&query=MEGA%20GARDENPARK%20Veliefendi%20Zeytinburnu",
      date: "bir yıl önce",
      rating: "5/5",
      original: "Güzel ve gözde yatırım proje",
      translation: "好看，也是个受关注的投资项目。",
    },
  ],
};

const SENTIMENT_ORDER: Record<ProjectReview["sentiment"], number> = {
  negative: 0,
  neutral: 1,
  positive: 2,
};

export function reviewsFor(name: string): ProjectReview[] {
  for (const key of nameKeys(name)) {
    const found = REVIEWS[key];
    if (found?.length) {
      return [...found].sort((a, b) => SENTIMENT_ORDER[a.sentiment] - SENTIMENT_ORDER[b.sentiment]);
    }
  }
  return [];
}

export function reviewCounts(name: string): { negative: number; neutral: number; positive: number } {
  const counts = { negative: 0, neutral: 0, positive: 0 };
  for (const review of reviewsFor(name)) counts[review.sentiment] += 1;
  return counts;
}
