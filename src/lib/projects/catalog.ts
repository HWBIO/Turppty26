import { createServerFn } from "@tanstack/react-start";
import { projectsFromCsv } from "./columns";
import { presentProjects } from "./present";
import type { Catalog, RawProject } from "./types";

const SHEET_ID = "13W2WiwaUNVrkb2ulvALBrYaI2oa5d2ifFgCR5aqo6Nc";
const SHEET_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

/** Used only when the public sheet cannot be read. Mirrors the sheet as of 2026-11-16. */
const SNAPSHOT: RawProject[] = [
  {
    name: "Bakırcı Kaya Residence",
    website:
      "https://www.bakirciyapi.com/en/bakirci-kaya-residence-project/bakirci-kaya-residence-details",
    developer: "BakırcıGYO",
    handover: "",
    address: "Mevlana Cd. 41-1. Seyitnizam, Mevlana Cd. 41-1, 34015. Zeytinburnu/İstanbul",
    district: "Zeytinburnu",
    price: "",
    lat: "",
    lng: "",
    supply: "96 Residential + 6 Commercial",
    brief:
      "Bakırcı Kaya Residence offers 96 curated homes — an exceptional opportunity for both investment and vibrant urban living. With studio, 1+1, and 2+1 layouts, the development enjoys direct motorway access to the E-5, quick connections to rail and metrobus, and a prime position on the university, hospital, and shopping corridor — combining rich social amenities with uncompromising comfort.",
    reviews: "",
    city: "",
    note: "",
  },
];

export const getCatalog = createServerFn({ method: "GET" }).handler(async (): Promise<Catalog> => {
  const fetchedAt = new Date().toISOString();
  try {
    const response = await fetch(SHEET_CSV, {
      headers: {
        Accept: "text/csv",
        "User-Agent": "turppty-catalog/1.0",
      },
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`表格返回 ${response.status}`);
    }
    const text = await response.text();
    if (text.trimStart().startsWith("<")) {
      throw new Error("表格没有公开成 CSV");
    }
    return {
      projects: presentProjects(projectsFromCsv(text)),
      fetchedAt,
      sheetOk: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "表格读取失败";
    return {
      projects: presentProjects(SNAPSHOT),
      fetchedAt,
      sheetOk: false,
      sheetError: message,
    };
  }
});
