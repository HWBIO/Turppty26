import { nameKeys } from "./address.ts";

export type ShotKind = "render" | "plan" | "surround" | "other";

export type GalleryShot = {
  src: string;
  caption: string;
  kind: ShotKind;
};

export type NamedGallery = {
  imageFrom: "sheet" | "curated";
  shots: GalleryShot[];
};

export const PROJECT_GALLERIES: Record<string, NamedGallery> = {
  "avrupa residence tem": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/avrupa-residence-tem/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
    ],
  },
  "bakirci kaya residence": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/bakirci-kaya/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/02.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/03.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/04.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/05.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/06.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/07.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/08.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/09.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/10.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/11.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/13.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/bakirci-kaya/16.jpg", kind: "surround", caption: "周边或总平面，取自该项目页面。" },
    ],
  },
  "maslak koru": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/maslak-koru/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/maslak-koru/02.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/maslak-koru/03.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/maslak-koru/04.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/maslak-koru/05.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/maslak-koru/06.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/maslak-koru/07.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/maslak-koru/08.jpg", kind: "surround", caption: "周边或总平面，取自该项目页面。" },
    ],
  },
  "eliteworldresidence": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/elite-world/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
    ],
  },
  "avrupa konutlari sisli 2": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/avrupa-sisli-2/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/avrupa-sisli-2/02.jpg", kind: "surround", caption: "周边或总平面，取自该项目页面。" },
      { src: "/project-photos/avrupa-sisli-2/03.jpg", kind: "surround", caption: "周边或总平面，取自该项目页面。" },
      { src: "/project-photos/avrupa-sisli-2/07.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
  "taksim 360": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/taksim-360/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/taksim-360/02.jpg", kind: "surround", caption: "周边或总平面，取自该项目页面。" },
      { src: "/project-photos/taksim-360/04.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-360/05.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
  "avrupa konutlari gunesli": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/avrupa-gunesli/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
    ],
  },
  "hayat city mahmutbey": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/hayat-city/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/hayat-city/02.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/hayat-city/03.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/hayat-city/04.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/hayat-city/05.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/hayat-city/06.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/hayat-city/07.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/hayat-city/08.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/hayat-city/09.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
    ],
  },
  "referans beylikduzu": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/referans-beylikduzu/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/referans-beylikduzu/02.jpg", kind: "surround", caption: "周边或总平面，取自该项目页面。" },
      { src: "/project-photos/referans-beylikduzu/03.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/referans-beylikduzu/04.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/referans-beylikduzu/05.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
  "taksim palas": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/taksim-palas/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/08.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/09.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/10.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/11.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/12.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/13.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/14.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/15.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/16.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/17.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/18.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/19.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/taksim-palas/20.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
  "bomonti residences by rotana": {
    imageFrom: "sheet",
    shots: [
      { src: "/project-photos/bomonti-rotana/01.jpg", kind: "render", caption: "效果图，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/02.jpg", kind: "surround", caption: "周边或总平面，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/03.jpg", kind: "surround", caption: "周边或总平面，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/04.jpg", kind: "surround", caption: "周边或总平面，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/05.jpg", kind: "surround", caption: "周边或总平面，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/06.jpg", kind: "surround", caption: "周边或总平面，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/07.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/08.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/09.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/10.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/11.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/12.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/13.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/14.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/15.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/16.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/17.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/18.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/19.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/bomonti-rotana/20.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
    ],
  },
  "ofton elysium soul": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/ofton-elysium/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
    ],
  },
  "flat 24": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/flat-24/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/flat-24/11.jpg", kind: "surround", caption: "周边或总平面，取自该项目页面。" },
      { src: "/project-photos/flat-24/03.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/flat-24/04.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/flat-24/05.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/flat-24/06.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/flat-24/09.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/flat-24/10.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
  "rams park house maslak": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/rams-park-house/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/rams-park-house/02.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/rams-park-house/03.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/rams-park-house/04.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/rams-park-house/05.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/rams-park-house/06.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/rams-park-house/10.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/rams-park-house/12.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/rams-park-house/13.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/rams-park-house/14.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
  "luxera topkapi": {
    imageFrom: "sheet",
    shots: [
      { src: "/project-photos/luxera-topkapi/01.jpg", kind: "render", caption: "效果图，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/02.jpg", kind: "plan", caption: "户型图，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/03.jpg", kind: "plan", caption: "户型图，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/04.jpg", kind: "plan", caption: "户型图，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/05.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/06.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/07.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/08.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/09.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/10.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/11.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/12.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/13.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/14.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/15.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/16.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/17.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/18.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/19.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
      { src: "/project-photos/luxera-topkapi/20.jpg", kind: "other", caption: "项目图片，取自表格图源。" },
    ],
  },
  "bakirci zenit topkapi": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/bakirci-zenit/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/bakirci-zenit/07.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/bakirci-zenit/08.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/bakirci-zenit/09.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/bakirci-zenit/10.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/bakirci-zenit/11.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
  "anthill residence": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/anthill/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/anthill/02.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/03.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/04.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/05.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/06.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/07.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/08.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/09.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/10.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/11.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/12.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
      { src: "/project-photos/anthill/13.jpg", kind: "plan", caption: "户型图，取自该项目页面。" },
    ],
  },
  "nurol life": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/nurol-life/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/nurol-life/05.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/06.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/07.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/08.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/09.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/10.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/11.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/12.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/13.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/14.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/nurol-life/15.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
  "mega garden park": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/mega-garden/01.jpg", kind: "render", caption: "效果图，取自该项目页面。" },
      { src: "/project-photos/mega-garden/07.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/mega-garden/08.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/mega-garden/09.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
  "imperium no1 residence": {
    imageFrom: "curated",
    shots: [
      { src: "/project-photos/imperium-no1/01.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/imperium-no1/02.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/imperium-no1/03.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/imperium-no1/04.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
      { src: "/project-photos/imperium-no1/05.jpg", kind: "other", caption: "项目图片，取自该项目页面。" },
    ],
  },
};

export function localGallery(name: string): NamedGallery | undefined {
  for (const key of nameKeys(name)) {
    const gallery = PROJECT_GALLERIES[key];
    if (gallery?.shots.length) return gallery;
  }
  return undefined;
}

