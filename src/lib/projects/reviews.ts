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
