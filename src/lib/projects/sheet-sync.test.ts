import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { projectsFromCsv } from "./columns.ts";
import { coordinateFromHtml, directGallery, imagesFromHtml, MAX_GALLERY } from "./gallery.ts";
import { presentProject, presentProjects } from "./present.ts";
import type { RawProject } from "./types.ts";

const csv = fs.readFileSync(path.join(process.cwd(), "src/lib/projects/sheet-fallback.csv"), "utf8");

function blank(): RawProject {
  return {
    name: "Nowhere Test",
    website: "",
    developer: "",
    handover: "",
    address: "1 Nowhere Street, Atlantis",
    district: "",
    price: "",
    lat: "",
    lng: "",
    supply: "",
    brief: "",
    reviews: "",
    city: "",
    note: "",
    imageSource: "",
    leaseSheet: "",
  };
}

describe("sheet sync", () => {
  const projects = presentProjects(projectsFromCsv(csv));

  it("places every sheet row, including renamed and new ones", () => {
    assert.equal(projects.length, 22);
    assert.equal(projects.filter((project) => project.latNum !== null && project.lngNum !== null).length, 22);
    const taksim = projects.find((project) => project.name.startsWith("Taksim 360"));
    assert.ok(taksim);
    assert.equal(taksim.coordFrom, "address");
    assert.equal(taksim.latNum, 41.0363842);
    for (const name of [
      "Taksim Palas",
      "Bomonti Residences by Rotana",
      "Renovated 5-Studio Building",
      "Flat 24",
      "Mega Garden Park",
    ]) {
      const project = projects.find((item) => item.name === name);
      assert.ok(project, name);
      assert.equal(project.coordFrom, "address");
      assert.ok(project.briefZh, name);
    }
  });

  it("keeps sheet coordinates ahead of the reviewed file", () => {
    const raw = { ...blank(), name: "Taksim Palas", address: "Feriköy, Gediz Sk. No:5, 34377 Şişli/İstanbul", lat: "41.2", lng: "29.1" };
    const project = presentProject(raw, new Set());
    assert.equal(project.coordFrom, "sheet");
    assert.equal(project.latNum, 41.2);
    assert.equal(project.lngNum, 29.1);
  });

  it("lets a filled Tenant/m cell replace the stored lease", () => {
    const project = presentProject(
      { ...blank(), name: "Avrupa Residence TEM", leaseSheet: "1+1, $9" },
      new Set(),
    );
    assert.equal(project.leaseLabel, "1+1, $9");
    const fallback = presentProject({ ...blank(), name: "Avrupa Residence TEM", leaseSheet: "  " }, new Set());
    assert.equal(fallback.leaseLabel, "1+1, $1,073");
  });

  it("does not invent a pin for an unknown address", () => {
    const project = presentProject(blank(), new Set());
    assert.equal(project.coordFrom, "none");
    assert.equal(project.latNum, null);
  });

  it("uses stored 图源 galleries and caps them at 20", () => {
    const luxera = projects.find((project) => project.name === "Luxera Topkapı");
    const bomonti = projects.find((project) => project.name === "Bomonti Residences by Rotana");
    const studio = projects.find((project) => project.name === "Renovated 5-Studio Building");
    const kaya = projects.find((project) => project.name === "Bakırcı Kaya Residence");
    assert.ok(luxera && bomonti && studio && kaya);
    assert.equal(luxera.imageFrom, "sheet");
    assert.equal(luxera.images.length, MAX_GALLERY);
    assert.equal(luxera.imageTotal, 27);
    assert.equal(bomonti.images.length, 20);
    assert.equal(bomonti.imageTotal, 31);
    assert.equal(studio.images.length, 14);
    assert.equal(studio.imageTotal, 14);
    assert.equal(kaya.imageFrom, "curated");
    assert.equal(kaya.images.length, 1);
    for (const project of [luxera, bomonti, studio]) {
      for (const image of project.images) {
        assert.equal(fs.existsSync(path.join(process.cwd(), "public", image.src)), true, image.src);
        const thumb = image.src.replace(/(\.[a-z0-9]+)$/i, "-thumb$1");
        assert.equal(fs.existsSync(path.join(process.cwd(), "public", thumb)), true, thumb);
      }
    }
  });

  it("still finds a gallery when the sheet URL has a hash", () => {
    const raw = {
      ...blank(),
      name: "Luxera Topkapı",
      imageSource: "https://tekce.com/ad/ist-01782-spacious-apartments-in-a-secure-complex-in-zeytinburnu-istanbul#43344",
    };
    const project = presentProject(raw, new Set());
    assert.equal(project.images.length, 20);
  });

  it("reads galleries and listing coordinates out of a page", () => {
    const html = `<script type="application/ld+json">{"image":["https://cdn.example.com/a.jpg","https://cdn.example.com/b.jpg","https://cdn.example.com/logo.png"]}</script><div data-lat="NDEuMDAzMTQzNg==" data-lng="MjguOTMyMTc3Mg=="></div>`;
    assert.deepEqual(imagesFromHtml(html), ["https://cdn.example.com/a.jpg", "https://cdn.example.com/b.jpg"]);
    assert.deepEqual(coordinateFromHtml(html), { lat: 41.0031436, lng: 28.9321772 });
    const urls = Array.from({ length: 25 }, (_, index) => `https://cdn.example.com/${index}.jpg`).join("\n");
    assert.equal(directGallery(urls)?.length, MAX_GALLERY);
  });
});
