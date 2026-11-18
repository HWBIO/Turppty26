import { addressKey, nameKeys } from "./address.ts";
import { GEOCODE_BY_ADDRESS, GEOCODE_BY_NAME, type StoredGeocode } from "./geocodes.ts";

export function coordinateFromAddress(address: string): StoredGeocode | null {
  const key = addressKey(address);
  if (!key) return null;
  return GEOCODE_BY_ADDRESS[key] ?? null;
}

export function coordinateFromName(name: string): { lat: number; lng: number } | null {
  for (const key of nameKeys(name)) {
    const hit = GEOCODE_BY_NAME[key];
    if (hit) return hit;
  }
  return null;
}
