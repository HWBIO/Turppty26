/**
 * Reviewed coordinates for sheet addresses.
 * Lookup key is addressKey() from address.ts (folded, punctuation removed).
 * Sheet 纬度/经度 still win. Addresses missing from this file are geocoded
 * when the catalog is loaded. Name keys are only a fallback if that fails.
 */
export type GeocodeSource = "curated" | "project-site" | "listing" | "osm";
export type GeocodePrecision = "building" | "street" | "neighbourhood";
export type StoredGeocode = {
  address: string;
  lat: number;
  lng: number;
  source: GeocodeSource;
  precision: GeocodePrecision;
  note: string;
};

export const GEOCODE_BY_ADDRESS: Record<string, StoredGeocode> = {
  "mevlana cd 41 1 seyitnizam mevlana cd 41 1 34015 zeytinburnu istanbul": {
    address: "Mevlana Cd. 41-1. Seyitnizam, Mevlana Cd. 41-1, 34015. Zeytinburnu/İstanbul",
    lat: 41.0090637,
    lng: 28.9063465,
    source: "curated",
    precision: "street",
    note: "Kept from the previous map: OpenStreetMap point on Mevlana Caddesi, Seyitnizam, not a surveyed parcel.",
  },
  "abdi ipekci cd no 58 karayollari 34255 gaziosmanpasa istanbul": {
    address: "Abdi İpekçi Cd. No:58, Karayolları, 34255 Gaziosmanpaşa/İstanbul",
    lat: 41.089142,
    lng: 28.8974079,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "ayazaga kemerburgaz cd no 7 34475 sariyer istanbul": {
    address: "Ayazağa, Kemerburgaz Cd. No:7, 34475 Sarıyer/İstanbul",
    lat: 41.111636,
    lng: 28.9887436,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "seyrantepe ibrahim karaoglanoglu cd 29a 34418 kagithane istanbul": {
    address: "Seyrantepe, İbrahim Karaoğlanoğlu Cd. 29A, 34418 Kağıthane/İstanbul",
    lat: 41.0957905,
    lng: 28.9891303,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "gulbahar 34394 sisli istanbul": {
    address: "Gülbahar, 34394 Şişli/İstanbul",
    lat: 41.072051,
    lng: 29.0000664,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "mecidiyekoy mahallesi cemal sahir sok 34394 sisli istanbul": {
    address: "Mecidiyeköy Mahallesi, Cemal Sahir Sok., 34394 Şişli/İstanbul",
    lat: 41.0668318,
    lng: 29.000724,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "sehit muhtar tarlabasi blv no 150 d 170 34435 beyoglu istanbul": {
    address: "Şehit Muhtar, Tarlabaşı Blv no: 150 D:170، 34435 Beyoğlu/İstanbul",
    lat: 41.0363842,
    lng: 28.9787337,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map. The sheet name now has an extra line, so the old name key no longer matched.",
  },
  "mahmutbey dilmenler cd no 26 34218 bagcilar istanbul": {
    address: "Mahmutbey, Dilmenler Cd. No:26, 34218 Bağcılar/İstanbul",
    lat: 41.0550204,
    lng: 28.8288506,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "mahmutbey halkali cd no 68 34218 bagcilar istanbul": {
    address: "Mahmutbey, Halkalı Cd No:68, 34218 Bağcılar/İstanbul",
    lat: 41.0398306,
    lng: 28.8349724,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "goztepe mahallesi mahmutbey bosna cd no 20 34730 bagcilar istanbul": {
    address: "Göztepe Mahallesi, Mahmutbey, Bosna Cd. No:20, 34730 Bağcılar/İstanbul",
    lat: 41.0531706,
    lng: 28.8298667,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "yakuplu kavakli mahallesi kocatepe cad beylikduzu istanbul": {
    address: "Yakuplu / Kavaklı Mahallesi (Kocatepe Cad.), Beylikdüzü/İstanbul",
    lat: 40.9884187,
    lng: 28.669736,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "maltepe gumussuyu cd 19 2 34010 zeytinburnu istanbul": {
    address: "Maltepe, Gümüşsuyu Cd. 19/2, 34010 Zeytinburnu/İstanbul",
    lat: 41.0252818,
    lng: 28.9087881,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "seyrantepe cendere cad no 110 34418 kagithane istanbul": {
    address: "Seyrantepe, Cendere Cad. No: 110, 34418 Kağıthane/İstanbul",
    lat: 41.0962725,
    lng: 28.9820172,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "cumhuriyet incirli dede cd no 6 34380 sisli istanbul": {
    address: "Cumhuriyet, İncirli Dede Cd. No:6, 34380 Şişli/İstanbul",
    lat: 41.0566417,
    lng: 28.9768273,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "huzur seyrantepe metin oktay caddesi no 3 34396 sariyer istanbul": {
    address: "Huzur, Seyrantepe, Metin Oktay Caddesi No:3, 34396 Sarıyer/İstanbul",
    lat: 41.1052428,
    lng: 28.9921366,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "maltepe davutpasa cd no 127 34010 zeytinburnu istanbul": {
    address: "Maltepe, Davutpaşa Cd. No:127, 34010 Zeytinburnu/İstanbul",
    lat: 41.0206171,
    lng: 28.9034623,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map. The TEKCE listing pin is a few hundred metres away and is not used for the project.",
  },
  "ferikoy gediz sk no 5 34377 sisli istanbul": {
    address: "Feriköy, Gediz Sk. No:5, 34377 Şişli/İstanbul",
    lat: 41.05207478166637,
    lng: 28.980029225349426,
    source: "project-site",
    precision: "building",
    note: "Property Istanbul map for Gediz Sk. No:5. OpenStreetMap has Gediz Sokağı but not this door number.",
  },
  "merkez mah duci bomonti arkasi sk no 4 sisli istanbul": {
    address: "Merkez Mah. Duçi Bomonti Arkası Sk. No:4, Şişli/İstanbul",
    lat: 41.059322,
    lng: 28.979453,
    source: "osm",
    precision: "building",
    note: "OpenStreetMap place Bomonti Arjaan by Rotana at Bomonti Arkası Sokağı 4. The sheet's Duçi prefix matches Rotana's own address line.",
  },
  "koca mustafapasa fatih istanbul": {
    address: "Koca Mustafapaşa, Fatih/İstanbul",
    lat: 41.0031436,
    lng: 28.9321772,
    source: "listing",
    precision: "building",
    note: "The sheet only names the neighbourhood. Pin is the TEKCE listing coordinate. The neighbourhood centre is about 400m south.",
  },
  "15 temmuz bahar cd no 77 34212 bagcilar istanbul": {
    address: "15 Temmuz, Bahar Cd. No:77, 34212 Bağcılar/İstanbul",
    lat: 41.03289,
    lng: 28.812062,
    source: "project-site",
    precision: "building",
    note: "VIP Property project map for Bahar Cd. No:77. OpenStreetMap only has the street. The developer's sales office is published at No:158/75.",
  },
  "maslak 1453 cd 34485 sariyer istanbul": {
    address: "Maslak, 1453 Cd., 34485 Sarıyer/İstanbul",
    lat: 41.1337016,
    lng: 29.0248402,
    source: "curated",
    precision: "building",
    note: "Kept from the previous map.",
  },
  "veliefendi cimen sk no 81 34025 zeytinburnu istanbul": {
    address: "Veliefendi, Çimen Sk. No:81, 34025 Zeytinburnu/İstanbul",
    lat: 40.996904,
    lng: 28.893591,
    source: "project-site",
    precision: "building",
    note: "Published Mega Garden Park pin beside Çimen Sokak, Veliefendi. The blocks on Çimen 3. Sokak are roughly 60m away.",
  },
};

export const GEOCODE_BY_NAME: Record<string, { lat: number; lng: number }> = {
  "bakirci kaya residence": { lat: 41.0090637, lng: 28.9063465 },
  "avrupa residence tem": { lat: 41.089142, lng: 28.8974079 },
  "maslak koru": { lat: 41.111636, lng: 28.9887436 },
  "eliteworldresidence": { lat: 41.0957905, lng: 28.9891303 },
  "avrupa konutlari sisli 2": { lat: 41.072051, lng: 29.0000664 },
  "avrupa konutlari sisli1": { lat: 41.0668318, lng: 29.000724 },
  "taksim 360\n(abb牌)": { lat: 41.0363842, lng: 28.9787337 },
  "taksim 360": { lat: 41.0363842, lng: 28.9787337 },
  "lania residence": { lat: 41.0550204, lng: 28.8288506 },
  "avrupa konutlari gunesli": { lat: 41.0398306, lng: 28.8349724 },
  "hayat city mahmutbey": { lat: 41.0531706, lng: 28.8298667 },
  "referans beylikduzu": { lat: 40.9884187, lng: 28.669736 },
  "bakirci zenit topkapi": { lat: 41.0252818, lng: 28.9087881 },
  "avangart istanbul": { lat: 41.0962725, lng: 28.9820172 },
  "anthill residence": { lat: 41.0566417, lng: 28.9768273 },
  "nurol life": { lat: 41.1052428, lng: 28.9921366 },
  "luxera topkapi": { lat: 41.0206171, lng: 28.9034623 },
  "taksim palas": { lat: 41.05207478166637, lng: 28.980029225349426 },
  "bomonti residences by rotana": { lat: 41.059322, lng: 28.979453 },
  "renovated 5-studio building": { lat: 41.0031436, lng: 28.9321772 },
  "flat 24": { lat: 41.03289, lng: 28.812062 },
  "rams park house maslak": { lat: 41.1337016, lng: 29.0248402 },
  "mega garden park": { lat: 40.996904, lng: 28.893591 },
};
