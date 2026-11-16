import type { RawProject } from "./types";
import { parseCsv } from "./csv";

/**
 * Staff header row. The live sheet may still use the old English headers;
 * both are accepted until the sheet is rewritten.
 *
 * 项目名称,项目官网,开发商,交楼时间,地址,所在城区,报价范围,纬度,经度,供应规模,项目简介,用户评价,城市,数据备注
 */
const FIELDS = [
  "name",
  "website",
  "developer",
  "handover",
  "address",
  "district",
  "price",
  "lat",
  "lng",
  "supply",
  "brief",
  "reviews",
  "city",
  "note",
] as const;

type Field = (typeof FIELDS)[number];

const ALIASES: Record<Field, string[]> = {
  name: ["项目名称", "property name", "name", "项目名"],
  website: ["项目官网", "website", "官网", "url"],
  developer: ["开发商", "developer"],
  handover: ["交楼时间", "handover", "delivery", "交楼"],
  address: ["地址", "address"],
  district: ["所在城区", "district", "城区", "区域"],
  price: ["报价范围", "price", "报价", "价格"],
  lat: ["纬度", "lat", "latitude"],
  lng: ["经度", "lng", "lon", "longitude"],
  supply: ["供应规模", "supply", "户型供应"],
  brief: ["项目简介", "brief", "简介"],
  reviews: ["用户评价", "reviews", "评价"],
  city: ["城市", "city"],
  note: ["数据备注", "备注", "note"],
};

function normHeader(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function projectsFromCsv(text: string): RawProject[] {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const header = rows[0].map(normHeader);
  const index = new Map<Field, number>();
  for (const field of FIELDS) {
    const aliases = new Set(ALIASES[field].map(normHeader));
    const at = header.findIndex((cell) => aliases.has(cell));
    if (at >= 0) index.set(field, at);
  }
  if (!index.has("name")) {
    throw new Error("表格第一行没有「项目名称」或 Property Name");
  }

  const projects: RawProject[] = [];
  for (const row of rows.slice(1)) {
    const pick = (field: Field) => {
      const at = index.get(field);
      return at === undefined ? "" : (row[at] ?? "").trim();
    };
    const name = pick("name");
    if (!name) continue;
    projects.push({
      name,
      website: pick("website"),
      developer: pick("developer"),
      handover: pick("handover"),
      address: pick("address"),
      district: pick("district"),
      price: pick("price"),
      lat: pick("lat"),
      lng: pick("lng"),
      supply: pick("supply"),
      brief: pick("brief"),
      reviews: pick("reviews"),
      city: pick("city"),
      note: pick("note"),
    });
  }
  return projects;
}
