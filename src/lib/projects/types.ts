export type RawProject = {
  name: string;
  website: string;
  developer: string;
  handover: string;
  address: string;
  district: string;
  price: string;
  lat: string;
  lng: string;
  supply: string;
  brief: string;
  reviews: string;
  city: string;
  note: string;
};

export type CheckItem = {
  heading: string;
  body: string;
  href?: string;
  hrefLabel?: string;
};

export type UnitPlan = {
  type: string;
  net: string;
  gross: string;
};

export type PublicCheck = {
  checkedOn: string;
  summary: string;
  image?: { src: string; caption: string };
  units: UnitPlan[];
  items: CheckItem[];
};

export type Project = RawProject & {
  id: string;
  supplyLabel: string;
  districtZh: string;
  latNum: number | null;
  lngNum: number | null;
  coordFrom: "sheet" | "street" | "none";
  check?: PublicCheck;
};

export type Catalog = {
  projects: Project[];
  fetchedAt: string;
  sheetOk: boolean;
  sheetError?: string;
};
