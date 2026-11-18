import { addressKey } from "./address.ts";
import {
  MAX_GALLERY,
  coordinateFromHtml,
  imagesFromHtml,
  isDirectImage,
  isPublicHttp,
  sourceKey,
  splitSourceUrls,
} from "./gallery.ts";
import { coordinateFromAddress } from "./place.ts";
import type { Project, RawProject } from "./types.ts";

const UA = "TurpptyCatalog/1.0 (https://turppty26.cyberfilling.com)";

const ISTANBUL = { minLat: 40.75, maxLat: 41.35, minLng: 28.4, maxLng: 29.5 };

const geoMemo = new Map<string, { lat: number; lng: number } | null>();
const pageMemo = new Map<string, string>();

let pace: Promise<unknown> = Promise.resolve();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function paced<T>(fn: () => Promise<T>): Promise<T> {
  const run = pace.then(fn, fn);
  pace = run.then(
    () => sleep(1100),
    () => sleep(1100),
  );
  return run;
}

function inIstanbul(lat: number, lng: number): boolean {
  return lat >= ISTANBUL.minLat && lat <= ISTANBUL.maxLat && lng >= ISTANBUL.minLng && lng <= ISTANBUL.maxLng;
}

function expandAddress(address: string): string {
  return address
    .replace(/\s+/g, " ")
    .replace(/\bCd\.?/gi, "Caddesi")
    .replace(/\bSk\.?/gi, "Sokak")
    .replace(/\bSok\.?/gi, "Sokak")
    .replace(/\bBlv\.?/gi, "Bulvarı")
    .replace(/\bMah\.?/gi, "Mahallesi")
    .replace(/No:\s*/gi, "")
    .trim();
}

async function nominatim(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "5");
    url.searchParams.set("countrycodes", "tr");
    url.searchParams.set("q", query);
    const response = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "tr,en" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { lat?: string; lon?: string }[];
    for (const item of data) {
      const lat = Number(item.lat);
      const lng = Number(item.lon);
      if (Number.isFinite(lat) && Number.isFinite(lng) && inIstanbul(lat, lng)) return { lat, lng };
    }
    return null;
  } catch {
    return null;
  }
}

async function photon(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = new URL("https://photon.komoot.io/api/");
    url.searchParams.set("q", query);
    url.searchParams.set("lat", "41.02");
    url.searchParams.set("lon", "28.95");
    url.searchParams.set("limit", "5");
    const response = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      features?: { geometry?: { coordinates?: number[] } }[];
    };
    for (const feature of data.features ?? []) {
      const pair = feature.geometry?.coordinates;
      if (!pair || pair.length < 2) continue;
      const lng = pair[0] ?? NaN;
      const lat = pair[1] ?? NaN;
      if (inIstanbul(lat, lng)) return { lat, lng };
    }
    return null;
  } catch {
    return null;
  }
}

async function geocodeAddress(address: string, name: string): Promise<{ lat: number; lng: number } | null> {
  const key = addressKey(address);
  if (!key) return null;
  if (geoMemo.has(key)) return geoMemo.get(key) ?? null;
  const expanded = expandAddress(address);
  const title = name.split("\n")[0]?.trim() ?? "";
  const hit =
    (await paced(() => nominatim(`${expanded}, Türkiye`))) ??
    (await paced(() => photon(`${title} ${expanded} İstanbul`)));
  geoMemo.set(key, hit);
  return hit;
}

async function fetchPage(url: string): Promise<string | null> {
  const key = sourceKey(url);
  if (pageMemo.has(key)) return pageMemo.get(key) || null;
  if (!isPublicHttp(url) || isDirectImage(url)) return null;
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html" },
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    });
    if (!response.ok) {
      pageMemo.set(key, "");
      return null;
    }
    const text = (await response.text()).slice(0, 2_000_000);
    if (!text.trimStart().startsWith("<") && !text.includes("<html")) {
      pageMemo.set(key, "");
      return null;
    }
    pageMemo.set(key, text);
    return text;
  } catch {
    pageMemo.set(key, "");
    return null;
  }
}

async function galleryFromPages(imageSource: string): Promise<{
  images: string[];
  total: number;
  coord: { lat: number; lng: number } | null;
}> {
  const urls = splitSourceUrls(imageSource);
  const images: string[] = [];
  let coord: { lat: number; lng: number } | null = null;
  for (const url of urls) {
    if (isDirectImage(url)) {
      if (!images.includes(url)) images.push(url);
      continue;
    }
    const html = await fetchPage(url);
    if (!html) continue;
    coord = coord ?? coordinateFromHtml(html);
    for (const src of imagesFromHtml(html)) {
      if (!images.includes(src)) images.push(src);
    }
  }
  return { images, total: images.length, coord };
}

/**
 * Fill anything the reviewed coordinate file and the stored galleries do not
 * already cover, so a new sheet row can appear before the next deploy.
 * Reviewed addresses are not sent to the geocoder again.
 */
export async function fillGaps(rows: RawProject[], projects: Project[]): Promise<Project[]> {
  const next = projects.map((project) => ({
    ...project,
    images: project.images.map((image) => ({ ...image })),
  }));
  let geocodesLeft = 4;

  for (let i = 0; i < next.length; i++) {
    const project = next[i];
    const raw = rows[i];
    if (!project || !raw) continue;

    const needsPoint = project.coordFrom === "name" || project.coordFrom === "none";
    if (needsPoint && !coordinateFromAddress(raw.address) && geocodesLeft > 0 && raw.address.trim()) {
      geocodesLeft -= 1;
      const live = await geocodeAddress(raw.address, raw.name);
      if (live) {
        project.latNum = live.lat;
        project.lngNum = live.lng;
        project.coordFrom = "geocode";
      }
    }

    if (!raw.imageSource.trim() || project.imageFrom === "sheet") continue;
    const remote = await galleryFromPages(raw.imageSource);
    if (remote.images.length > 0) {
      const shown = remote.images.slice(0, MAX_GALLERY);
      project.images = shown.map((src) => ({ src, caption: "图片来自表格「图源」所链的页面。" }));
      project.image = project.images[0];
      project.imageTotal = remote.total;
      project.imageFrom = "sheet";
    }
    if (
      (project.coordFrom === "name" || project.coordFrom === "none") &&
      remote.coord &&
      inIstanbul(remote.coord.lat, remote.coord.lng)
    ) {
      project.latNum = remote.coord.lat;
      project.lngNum = remote.coord.lng;
      project.coordFrom = "listing";
    }
  }

  return next;
}
