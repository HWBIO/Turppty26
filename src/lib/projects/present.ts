import type { Project, PublicCheck, RawProject } from "./types";

const STREET_LAT = 41.0090637;
const STREET_LNG = 28.9063465;

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
  const latNum = hasSheetCoord ? sheetLat : kaya ? STREET_LAT : null;
  const lngNum = hasSheetCoord ? sheetLng : kaya ? STREET_LNG : null;

  const districtKey = fold(raw.district);
  return {
    ...raw,
    id,
    supplyLabel: supplyLabel(raw.supply),
    districtZh: DISTRICT_ZH[districtKey] ?? "",
    latNum,
    lngNum,
    coordFrom: hasSheetCoord ? "sheet" : latNum !== null ? "street" : "none",
    check: kaya ? KAYA_CHECK : undefined,
  };
}

export function presentProjects(rows: RawProject[]): Project[] {
  const used = new Set<string>();
  return rows.map((row) => presentProject(row, used));
}
