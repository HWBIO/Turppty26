import type { Project, PublicCheck, RawProject } from "./types";
import { briefInChinese } from "./brief-zh";

const STREET_LAT = 41.0090637;
const STREET_LNG = 28.9063465;

const PLACED: Record<string, [number, number]> = {
  "bakirci kaya residence": [STREET_LAT, STREET_LNG],
  "avrupa residence tem": [41.089142, 28.8974079],
  "maslak koru": [41.111636, 28.9887436],
  "eliteworldresidence": [41.0957905, 28.9891303],
  "avrupa konutlari sisli 2": [41.072051, 29.0000664],
  "avrupa konutlari sisli1": [41.0668318, 29.000724],
  "taksim 360": [41.0363842, 28.9787337],
  "lania residence": [41.0550204, 28.8288506],
  "avrupa konutlari gunesli": [41.0398306, 28.8349724],
  "hayat city mahmutbey": [41.0531706, 28.8298667],
  "referans beylikduzu": [40.9884187, 28.669736],
  "bakirci zenit topkapi": [41.0252818, 28.9087881],
  "avangart istanbul": [41.0962725, 28.9820172],
  "anthill residence": [41.0566417, 28.9768273],
  "nurol life": [41.1052428, 28.9921366],
  "luxera topkapi": [41.0206171, 28.9034623],
  "rams park house maslak": [41.1337016, 29.0248402],
};

const PHOTOS: Record<string, { src: string; caption: string }> = {
  "bakirci kaya residence": {
    src: "https://www.bakirciyapi.com/images/icerikslayt/3032026134023_BAKIRCI_KAYA_RESIDENCE_hero.webp",
    caption: "效果图来自项目官网。",
  },
  "avrupa residence tem": {
    src: "https://www.avrupakentgyo.com/Images/Photos/73a0e632-0d6c-417a-b28e-7213807c8508.jpg",
    caption: "实拍来自 Avrupakent GYO 项目页。",
  },
  "maslak koru": {
    src: "https://media.cctinvestments.com/properties/maslak-koru/01.jpg",
    caption: "官网没有放出可引用的图片。效果图来自公开项目介绍。",
  },
  eliteworldresidence: {
    src: "https://www.eliteworldhotels.com.tr/Upload/r-img-1-1-4182317.webp",
    caption: "效果图来自表格所链的 Elite World Residence 页面。",
  },
  "avrupa konutlari sisli 2": {
    src: "https://www.avruparesidencesisli2.com/Images/Photos/hayatin-merkezinde.jpg",
    caption: "效果图来自项目官网。",
  },
  "avrupa konutlari sisli1": {
    src: "/project-photos/avrupa-sisli-1.jpg",
    caption: "官网图片无法直接打开。效果图来自标明为 Şişli 1 的公开项目页。",
  },
  "taksim 360": {
    src: "https://taksim360.com.tr/taksim360/cdn/uploads/000000021_2023-10-ana-sayfa_1.webp",
    caption: "效果图来自项目官网。",
  },
  "lania residence": {
    src: "https://www.imtilak.net/imgprojects/1035/569/1909/c059a83a31963c6d4c20a3b7e2cf461d11-1B.webp",
    caption: "官网没有放出图片。效果图来自公开项目页，画面带有来源水印。",
  },
  "avrupa konutlari gunesli": {
    src: "https://www.avrupakonutlarigunesli.com/Images/Photos/photo-3.jpg",
    caption: "效果图来自项目官网。",
  },
  "hayat city mahmutbey": {
    src: "https://www.ozakgyo.com/upi/files/2026/11/1793874852_933.webp",
    caption: "效果图来自 Özak GYO 项目页。",
  },
  "referans beylikduzu": {
    src: "/project-photos/referans-beylikduzu.webp",
    caption: "官网没有放出图片。效果图来自 Emlakjet 项目页。",
  },
  "bakirci zenit topkapi": {
    src: "https://www.bakirciyapi.com/images/icerikslayt/4032026141118_bakirci-topkapicover.webp",
    caption: "效果图来自项目官网。",
  },
  "avangart istanbul": {
    src: "https://www.deal-tr.com/storage/App/Models/File/Avangart%20Istanbul%20(5).webp",
    caption: "官网这次打不开。效果图来自公开项目页。",
  },
  "anthill residence": {
    src: "https://anthillresidences.com/en/images/img_mimari_03.jpg",
    caption: "效果图来自项目官网。",
  },
  "nurol life": {
    src: "https://residenceindex.com/media/images/project/project_image_4260089541430fe73e5f39847cd11985.jpg",
    caption: "GYO 页面没有放出图片。照片来自公开项目页，塔楼旁是球场。",
  },
  "luxera topkapi": {
    src: "https://www.deal-tr.com/storage/App/Models/File/Luxera%20Topkap%C4%B15.webp",
    caption: "官网效果图文件已损坏。这张来自公开项目页，楼身标有 Luxera。",
  },
  "rams park house maslak": {
    src: "https://ramsparkhouse.com/wp-content/uploads/2026/08/dis-scaled.webp",
    caption: "效果图来自项目官网。",
  },
};

const DISTRICT_ZH: Record<string, string> = {
  zeytinburnu: "泽伊廷布尔努",
};

function fold(value: string): string {
  return value
    .replaceAll("İ", "i")
    .replaceAll("I", "i")
    .replaceAll("ı", "i")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function slug(name: string): string {
  const folded = fold(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return folded || "project";
}

function coord(value: string, min: number, max: number): number | null {
  if (!value.trim()) return null;
  const n = Number(value.replace(",", "."));
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

function supplyLabel(supply: string): string {
  if (/96/.test(supply) && /6/.test(supply) && /residential|konut|住宅|commercial|ticari|商业/i.test(supply)) {
    return "96 套住宅 + 6 个商业单元";
  }
  return supply;
}

function isKaya(name: string): boolean {
  const folded = fold(name);
  return folded.includes("kaya") && folded.includes("residence");
}

const KAYA_CHECK: PublicCheck = {
  checkedOn: "2026-11-16",
  summary:
    "位于伊斯坦布尔欧洲侧 Zeytinburnu（泽伊廷布尔努）Seyitnizam。官网土耳其文页面以 Topkapı 区位介绍。规划 96 套住宅和 6 个沿街商业单元，户型为 1+0、1+1、2+1，车位 102 个。官网给出的总建筑面积为 14,644 平方米，总居住面积为 7,270 平方米，并写明可衔接 E-5，靠近轨道交通与地铁公交，处在大学、医院和商业带上。",
  image: {
    src: "https://files.propertyistanbul.com/2026/11/bakirci-kaya-residence-01.jpg",
    caption: "效果图来自 Property Istanbul，不是现场实拍。",
  },
  units: [
    { type: "1+0 A", net: "41.18", gross: "67.54" },
    { type: "1+1 A", net: "40.84", gross: "66.98" },
    { type: "1+1 B", net: "41.95", gross: "68.80" },
    { type: "2+1 A", net: "62.87", gross: "103.11" },
    { type: "2+1 B", net: "54.77", gross: "89.82" },
    { type: "2+1 C", net: "54.31", gross: "89.07" },
    { type: "2+1 D", net: "56.08", gross: "91.97" },
    { type: "2+1 E", net: "53.88", gross: "88.36" },
    { type: "2+1 F", net: "53.71", gross: "88.08" },
    { type: "2+1 G", net: "54.45", gross: "89.30" },
    { type: "2+1 H", net: "55.90", gross: "91.68" },
    { type: "2+1 I", net: "53.12", gross: "87.12" },
  ],
  items: [
    {
      heading: "交楼时间",
      body: "官网中英文项目页都没有交楼年月。中介页面（MBANY、Emlakplatform，2026-11-06 更新）写 2027-03-30。2026 年 8 月关于 Bakırcı GYO 上市的公开帖，转述招股材料把本项目交楼目标写作 2027 年 6 月。Property Istanbul 则标为规划中。三处不一致，表格留空时页面不代填。",
      href: "https://www.mbany.com/en/projects/bakirci-kaya-residence",
      hrefLabel: "中介页上的交楼日期",
    },
    {
      heading: "报价",
      body: "官网不标价。中介页面写起步价 450,000 美元，其中 2+1 约 450,000–470,000 美元，并称现金可再减 10%。增值税 1%、地契费用 2% 据称为另计，地契类型写成地役权（irtifak）。这些都不是开发商官网报价。另有页面把同一起价折成里拉，汇率对不上，故不采用。",
      href: "https://www.emlakplatform.com.tr/en/projects/bakirci-kaya-residence",
      hrefLabel: "另一中介页",
    },
    {
      heading: "地址与坐标",
      body: "表格地址为 Mevlana Cd. 41-1, Seyitnizam, 34015 Zeytinburnu。官网未印这行门牌。地图使用 OpenStreetMap 上 Mevlana Caddesi（Seyitnizam）的街道坐标 41.00906, 28.90635，不是实测地块。表格填入纬度、经度后以表格为准。",
      href: "https://www.propertyistanbul.com/properties/bakirci-kaya-residence/",
      hrefLabel: "Property Istanbul 的区位说明",
    },
    {
      heading: "开发商名称",
      body: "项目官网署名 Bakırcı Yapı / Bakırcı Grup。表格写 BakırcıGYO。2026 年 8 月的上市讨论把本项目列入 Bakırcı GYO 的在建组合。列表仍显示表格里的开发商。",
      href: "https://www.bakirciyapi.com/en/bakirci-kaya-residence-project/bakirci-kaya-residence-details",
      hrefLabel: "官网英文页",
    },
    {
      heading: "入籍与工程进度",
      body: "中介页写「可申请土耳其国籍」「完工约 65%」。官网没有这两句。投资入籍以土耳其官方现行规定为准，本页不作承诺。",
    },
    {
      heading: "评价与门户",
      body: "Google 地图未检索到本项目地点的用户评价。X 上相关帖是开发商上市讨论，不是入住评价。Sahibinden、Hepsiemlak、Emlakjet 未检索到本项目挂牌。Emlakjet 有同集团已交付的 Bakırcı Kemer（Eyüpsultan，2016 年），不是本项目。",
      href: "https://x.com/cumhuriyet48/status/2091911960023495020",
      hrefLabel: "X 上转述的交楼目标",
    },
  ],
};

export function presentProject(raw: RawProject, usedIds: Set<string>): Project {
  let id = slug(raw.name);
  if (usedIds.has(id)) {
    let n = 2;
    while (usedIds.has(`${id}-${n}`)) n++;
    id = `${id}-${n}`;
  }
  usedIds.add(id);

  const sheetLat = coord(raw.lat, -90, 90);
  const sheetLng = coord(raw.lng, -180, 180);
  const kaya = isKaya(raw.name);
  const hasSheetCoord = sheetLat !== null && sheetLng !== null;
  const placed = PLACED[fold(raw.name)];
  const latNum = hasSheetCoord ? sheetLat : placed ? placed[0] : null;
  const lngNum = hasSheetCoord ? sheetLng : placed ? placed[1] : null;

  const districtKey = fold(raw.district);
  return {
    ...raw,
    id,
    supplyLabel: supplyLabel(raw.supply),
    districtZh: DISTRICT_ZH[districtKey] ?? "",
    latNum,
    lngNum,
    coordFrom: hasSheetCoord ? "sheet" : latNum !== null ? "geocode" : "none",
    image: PHOTOS[fold(raw.name)],
    briefZh: briefInChinese(raw.brief),
    check: kaya ? KAYA_CHECK : undefined,
  };
}

export function presentProjects(rows: RawProject[]): Project[] {
  const used = new Set<string>();
  return rows.map((row) => presentProject(row, used));
}
