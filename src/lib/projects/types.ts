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
  /** Raw 「图源」 cell. May hold one or more page or image URLs. */
  imageSource: string;
  /** Raw Tenant/m cell. Shown as Lease/m when non-empty. */
  leaseSheet: string;
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

export type ProjectImage = { src: string; caption: string };

export type ReviewSentiment = "negative" | "neutral" | "positive";

export type ProjectReview = {
  sentiment: ReviewSentiment;
  source: string;
  url: string;
  date: string;
  original: string;
  translation: string;
};

export type Project = RawProject & {
  id: string;
  supplyLabel: string;
  districtZh: string;
  latNum: number | null;
  lngNum: number | null;
  coordFrom: "sheet" | "address" | "geocode" | "listing" | "name" | "none";
  images: ProjectImage[];
  imageTotal: number;
  imageFrom: "sheet" | "curated" | "none";
  /** Monthly asking rent, or "N.A" when no matching listing was found. */
  leaseLabel: string;
  /** First image, kept for callers that only need a cover. */
  image?: ProjectImage;
  briefZh: string;
  /** Collected reviews. Empty when none could be verified for this exact project. */
  userReviews: ProjectReview[];
  check?: PublicCheck;
};

export type Catalog = {
  projects: Project[];
  fetchedAt: string;
  sheetOk: boolean;
  sheetError?: string;
};
