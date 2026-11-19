import { createServerFn } from "@tanstack/react-start";
import fallbackCsv from "./sheet-fallback.csv?raw";
import { projectsFromCsv } from "./columns";
import { presentProjects } from "./present";
import type { Catalog } from "./types";

const SHEET_ID = "13W2WiwaUNVrkb2ulvALBrYaI2oa5d2ifFgCR5aqo6Nc";
const SHEET_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

/** Sheet snapshot, captured 2026-11-18. Used only when the live sheet cannot be read. */
async function catalogFrom(
  text: string,
  fetchedAt: string,
  sheetOk: boolean,
  sheetError?: string,
): Promise<Catalog> {
  const raw = projectsFromCsv(text);
  const base = presentProjects(raw);
  const { fillGaps } = await import("./enrich.server");
  return {
    projects: await fillGaps(raw, base),
    fetchedAt,
    sheetOk,
    sheetError,
  };
}

export const getCatalog = createServerFn({ method: "GET" }).handler(async (): Promise<Catalog> => {
  const fetchedAt = new Date().toISOString();
  try {
    const response = await fetch(`${SHEET_CSV}&cb=${Date.now()}`, {
      headers: {
        Accept: "text/csv",
        "User-Agent": "turppty-catalog/1.0",
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
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
    return await catalogFrom(text, fetchedAt, true);
  } catch (error) {
    const message = error instanceof Error ? error.message : "表格读取失败";
    return await catalogFrom(fallbackCsv, fetchedAt, false, message);
  }
});
