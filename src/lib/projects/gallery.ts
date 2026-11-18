import { IMAGE_MANIFEST } from "./image-manifest.ts";

export const MAX_GALLERY = 20;

export type ResolvedGallery = {
  files: string[];
  total: number;
  caption: string;
};

export function sourceKey(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    parsed.search = "";
    parsed.pathname = parsed.pathname.replace(/\/$/, "");
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url.split("#")[0]?.split("?")[0] ?? url;
  }
}

export function isPublicHttp(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".local") || host === "0.0.0.0" || host === "::1") return false;
    if (/^(127\.|10\.|192\.168\.|169\.254\.)/.test(host)) return false;
    if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

export function splitSourceUrls(value: string): string[] {
  const found = value.match(/https?:\/\/[^\s,;，；]+/gi) ?? [];
  const urls: string[] = [];
  const seen = new Set<string>();
  for (const raw of found) {
    const url = raw.replace(/[)）]+$/g, "");
    if (!isPublicHttp(url)) continue;
    const key = sourceKey(url);
    if (seen.has(key)) continue;
    seen.add(key);
    urls.push(url);
  }
  return urls;
}

export function isDirectImage(url: string): boolean {
  return /\.(jpe?g|png|webp|gif|avif)(?:$|[?#])/i.test(url);
}

export function galleryFromManifest(imageSource: string): ResolvedGallery | null {
  const urls = splitSourceUrls(imageSource);
  const files: string[] = [];
  let total = 0;
  let caption = "";
  for (const url of urls) {
    const entry = IMAGE_MANIFEST[sourceKey(url)];
    if (!entry) continue;
    total += entry.total;
    caption = caption || entry.caption;
    for (const file of entry.files) {
      if (!files.includes(file)) files.push(file);
    }
  }
  if (!files.length) return null;
  return {
    files: files.slice(0, MAX_GALLERY),
    total: Math.max(total, files.length),
    caption: caption || "图片来自表格「图源」。",
  };
}

export function directGallery(imageSource: string): string[] | null {
  const urls = splitSourceUrls(imageSource);
  if (!urls.length || !urls.every(isDirectImage)) return null;
  return urls.slice(0, MAX_GALLERY);
}

function decode64(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function coordinateFromHtml(html: string): { lat: number; lng: number } | null {
  const lat = html.match(/data-lat="([A-Za-z0-9+/=_-]+)"/);
  const lng = html.match(/data-lng="([A-Za-z0-9+/=_-]+)"/);
  if (!lat?.[1] || !lng?.[1]) return null;
  try {
    const la = Number(decode64(lat[1]));
    const ln = Number(decode64(lng[1]));
    if (!Number.isFinite(la) || !Number.isFinite(ln)) return null;
    if (la < -90 || la > 90 || ln < -180 || ln > 180) return null;
    return { lat: la, lng: ln };
  } catch {
    return null;
  }
}

function pushImage(found: string[], seen: Set<string>, url: string) {
  if (found.length >= 60) return;
  if (!/^https?:\/\//i.test(url)) return;
  if (!isDirectImage(url)) return;
  if (/\/(100x80|120x120|125x125|147x184|350x275|650x450|750x150)\//i.test(url)) return;
  if (/logo|icon|banner|flag|\/dil\/|bos\.jpg|testimonial|profil/i.test(url)) return;
  const clean = url.split("#")[0] ?? url;
  if (seen.has(clean)) return;
  seen.add(clean);
  found.push(clean);
}

/** Pull a gallery out of a listing page. TEKCE pages expose it as schema.org images. */
export function imagesFromHtml(html: string): string[] {
  const found: string[] = [];
  const seen = new Set<string>();
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(block[1] ?? "") as { "@graph"?: unknown; image?: unknown };
      const nodes = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
      for (const node of nodes) {
        if (!node || typeof node !== "object") continue;
        const image = (node as { image?: unknown }).image;
        const list = Array.isArray(image) ? image : typeof image === "string" ? [image] : [];
        for (const item of list) {
          if (typeof item === "string") pushImage(found, seen, item);
          else if (item && typeof item === "object" && "url" in item && typeof item.url === "string") {
            pushImage(found, seen, item.url);
          }
        }
      }
    } catch {
      /* a broken block should not hide the rest of the page */
    }
  }
  if (found.length > 0) return found;

  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i);
  const content = og?.[0]?.match(/content=["']([^"']+)["']/i);
  if (content?.[1]) pushImage(found, seen, content[1]);
  for (const match of html.matchAll(
    /(?:src|data-src)=["'](https?:\/\/[^"']+\.(?:jpe?g|png|webp|gif|avif)[^"']*)["']/gi,
  )) {
    if (match[1]) pushImage(found, seen, match[1]);
  }
  return found;
}
