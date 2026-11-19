import { nameKeys } from "./address.ts";

export type RentListing = {
  url: string;
  title: string;
  rooms: string;
  amountTry: number;
  district: string;
  neighborhood: string;
};

export type ProjectRent = {
  label: string;
  source: "Emlakjet" | null;
  scrapedOn: string;
  listings: RentListing[];
};

/**
 * Monthly asking rents scraped 2026-11-19.
 * Sahibinden returned HTTP 403. Hepsiemlak stopped on a Cloudflare check.
 * Figures are Emlakjet asking rents in TRY. Where a room type has several
 * listings, label uses the median. 1 USD = 51.282 TRY was not needed.
 */
const FOUND: { name: string; rent: ProjectRent }[] = [
  {
    name: "Avrupa Residence TEM",
    rent: {
      label: "1+1, 55.000 TL",
      source: "Emlakjet",
      scrapedOn: "2026-11-19",
      listings: [
        {
          url: "https://www.emlakjet.com/ilan/avrupa-konutlari-tem-havuz-peyzaj-manzarali-kiralik-11-daire-19605139",
          title: "Avrupa Konutları Tem Havuz Peyzaj Manzaralı Kiralık 1+1 Daire",
          rooms: "1+1",
          amountTry: 55000,
          district: "Gaziosmanpaşa",
          neighborhood: "Karayolları Mahallesi",
        },
      ],
    },
  },
  {
    name: "Hayat City Mahmutbey",
    rent: {
      label: "2+1, 62.000 TL",
      source: "Emlakjet",
      scrapedOn: "2026-11-19",
      listings: [
        {
          url: "https://www.emlakjet.com/ilan/hayat-city-sitesinde-kiralik-buyuk-tip-21-daire-20016790",
          title: "Hayat Cıty Sitesinde Kiralık Büyük Tip 2+1 Daire",
          rooms: "2+1",
          amountTry: 62000,
          district: "Bağcılar",
          neighborhood: "Göztepe Mahallesi",
        },
      ],
    },
  },
  {
    name: "REFERANS BEYLİKDÜZÜ",
    rent: {
      label: "2+1, 52.000 TL; 3+1, 75.000 TL",
      source: "Emlakjet",
      scrapedOn: "2026-11-19",
      listings: [
        {
          url: "https://www.emlakjet.com/ilan/referans-beylikduzu-sitesinde-kiralik-21-daire-19964325",
          title: "Referans Beylikdüzü Sitesinde Kiralık 2+1 Daire",
          rooms: "2+1",
          amountTry: 52000,
          district: "Beylikdüzü",
          neighborhood: "Marmara Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/referans-beylikduzu-esyali-kiralik-luks-31-daire-peyzaj-cephe-19720789",
          title: "Referans Beylikdüzü Eşyalı Kiralık Lüks 3+1 Daire Peyzaj Cephe",
          rooms: "3+1",
          amountTry: 75000,
          district: "Beylikdüzü",
          neighborhood: "Kavaklı Mahallesi",
        },
      ],
    },
  },
  {
    name: "Avangart İstanbul",
    rent: {
      label: "1+1, 73.000 TL; 2+1, 100.000 TL; 3+1, 136.000 TL; 4+1, 145.000 TL",
      source: "Emlakjet",
      scrapedOn: "2026-11-19",
      listings: [
        {
          url: "https://www.emlakjet.com/ilan/avangart-istanbul-11-esyali-kiralik-guncel-20014617",
          title: "Avangart İstanbul 1+1 Eşyalı Kiralık Güncel",
          rooms: "1+1",
          amountTry: 72500,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/avangart-istanbul-31-kiralik-daire-vadistanbul-20068265",
          title: "Avangart İstanbul 3+1 Kiralık Daire - Vadistanbul",
          rooms: "3+1",
          amountTry: 120000,
          district: "Sarıyer",
          neighborhood: "Ayazağa Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/avangart-istanbul-11-esyali-kiralik-daire-tek-yetkili-19241894",
          title: "Avangart İstanbul 1+1 Eşyalı Kiralık Daire Tek Yetkili",
          rooms: "1+1",
          amountTry: 72500,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/avangart-istanbul-vadi-cepheli-en-iyi-konumda-11-19810552",
          title: "Avangart İstanbul | Vadi Cepheli En İyi Konumda 1+1",
          rooms: "1+1",
          amountTry: 73000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/avangart-istanbul-11-esyali-kiralik-daire-yil-pesin-19834401",
          title: "Avangart İstanbul 1+1 Eşyalı Kiralık Daire Yıl Peşin",
          rooms: "1+1",
          amountTry: 75000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/avangart-istanbul-11-esyali-kiralik-daire-guncel-kiralik-daire-19881195",
          title: "Avangart İstanbul 1+1 Eşyalı Kiralık Daire Güncel Kiralık Daire",
          rooms: "1+1",
          amountTry: 75000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/avangart-istanbul-sitesinde-31-guncel-yuksek-kat-kiralik-daire-20108248",
          title: "Avangart İstanbul Sitesinde 3+1 Güncel Yüksek Kat Kiralık Daire",
          rooms: "3+1",
          amountTry: 132000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/vadi-istanbul-avangart-sitesi-skyland-yani-21-esyali-vadi-cephe-19855363",
          title: "Vadi İstanbul Avangart Sitesi Skyland Yanı 2+1 Eşyalı Vadi Cephe",
          rooms: "2+1",
          amountTry: 100000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/avangart-istanbul-vadi-cephe-yuksek-kat-en-iyi-konum-41-kiralik-19883301",
          title: "Avangart İstanbul Vadi Cephe Yüksek Kat En İyi Konum 4+1 Kiralık",
          rooms: "4+1",
          amountTry: 145000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/avangart-vadi-istanbul-da-31-kiralik-buyuk-tip-daires-19810649",
          title: "Avangart Vadi İstanbul'da 3+1 Kiralık Büyük Tip Daires",
          rooms: "3+1",
          amountTry: 140000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/vadistanbul-avangart-da-full-esyali-31-guncel-kiralik-daire-19866314",
          title: "Vadistanbul Avangart'da Full Eşyalı 3+1 Güncel Kiralık Daire",
          rooms: "3+1",
          amountTry: 140000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/vadistanbul-avangart-guncel-kiralik-21-daire-19707881",
          title: "Vadistanbul Avangart Güncel Kiralık 2+1 Daire",
          rooms: "2+1",
          amountTry: 95000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/vadistanbul-avangart-da-kiralik-vadi-cephe-21-bos-guncel-daire-20101259",
          title: "Vadistanbul Avangart'da Kiralık Vadi Cephe 2+1 Boş Güncel Daire",
          rooms: "2+1",
          amountTry: 90000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/vadistanbul-avangart-kiralik-21-esyali-guncel-vadi-cephe-20027506",
          title: "Vadistanbul Avangart Kiralık 2+1 Eşyalı Güncel Vadi Cephe",
          rooms: "2+1",
          amountTry: 100000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/vadistanbul-avangart-guncel-21-esyali-vadi-cephe-kiralik-20075295",
          title: "Vadistanbul Avangart Güncel 2+1 Eşyalı Vadi Cephe Kiralık",
          rooms: "2+1",
          amountTry: 100000,
          district: "Kağıthane",
          neighborhood: "Seyrantepe Mahallesi",
        },
      ],
    },
  },
  {
    name: "Nurol Life",
    rent: {
      label: "3+1, 145.000 TL",
      source: "Emlakjet",
      scrapedOn: "2026-11-19",
      listings: [
        {
          url: "https://www.emlakjet.com/ilan/nurol-life-31-lux-esyali-yuksek-kat-kiralik-daire-vadistanbul-19898052",
          title: "Nurol Life 3+1 Lux Eşyalı Yüksek Kat Kiralık Daire-vadistanbul",
          rooms: "3+1",
          amountTry: 145000,
          district: "Sarıyer",
          neighborhood: "Huzur Mahallesi",
        },
      ],
    },
  },
  {
    name: "Bomonti Residences by Rotana",
    rent: {
      label: "1+1, 75.000 TL; 2+1, 110.000 TL; 3+1, 190.000 TL",
      source: "Emlakjet",
      scrapedOn: "2026-11-19",
      listings: [
        {
          url: "https://www.emlakjet.com/ilan/bomonti-rotana-residence-manzarali-esyali-31-kiralik-daire-19814536",
          title: "Bomonti Rotana Residence: Manzaralı, Eşyalı 3+1 Kiralık Daire",
          rooms: "3+1",
          amountTry: 190000,
          district: "Şişli",
          neighborhood: "Merkez Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/bomonti-rotana-rezidansta-muthis-manzarali-bos-11-kiralik-daire-19928878",
          title: "Bomonti Rotana Rezidansta Müthiş Manzaralı Boş 1+1 Kiralık Daire",
          rooms: "1+1",
          amountTry: 75000,
          district: "Şişli",
          neighborhood: "Merkez Mahallesi",
        },
        {
          url: "https://www.emlakjet.com/ilan/bomonti-residence-by-rotana-esyali-ferah-yuksek-kat-21-kiralik-19553789",
          title: "Bomonti Residence By Rotana Eşyalı Ferah Yüksek Kat 2+1 Kiralık",
          rooms: "2+1",
          amountTry: 110000,
          district: "Şişli",
          neighborhood: "Merkez Mahallesi",
        },
      ],
    },
  },
];

const NA: ProjectRent = {
  label: "N.A",
  source: null,
  scrapedOn: "2026-11-19",
  listings: [],
};

const BY_KEY = new Map<string, ProjectRent>();
for (const row of FOUND) {
  for (const key of nameKeys(row.name)) BY_KEY.set(key, row.rent);
}

export function rentFor(name: string): ProjectRent {
  for (const key of nameKeys(name)) {
    const hit = BY_KEY.get(key);
    if (hit) return hit;
  }
  return NA;
}
