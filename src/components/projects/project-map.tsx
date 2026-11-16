import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Project } from "@/lib/projects/types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&" + "amp;")
    .replaceAll("<", "&" + "lt;")
    .replaceAll(">", "&" + "gt;")
    .replaceAll('"', "&" + "quot;")
    .replaceAll("'", "&" + "#39;");
}

function pinIcon(name: string) {
  return L.divIcon({
    className: "map-pin-wrap",
    html: `<div class="map-pin"><span class="map-pin-dot"></span><span class="map-pin-name">${escapeHtml(name)}</span></div>`,
    iconSize: [240, 36],
    iconAnchor: [8, 18],
  });
}

export default function ProjectMap({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (id: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const map = L.map(node, { scrollWheelZoom: true }).setView([41.015, 28.97], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const placed = projects.filter((project) => project.latNum !== null && project.lngNum !== null);
    for (const project of placed) {
      const marker = L.marker([project.latNum as number, project.lngNum as number], {
        icon: pinIcon(project.name),
        title: project.name,
        keyboard: true,
      });
      marker.on("click", () => onOpenRef.current(project.id));
      marker.addTo(map);
    }
    if (placed.length === 1) {
      map.setView([placed[0].latNum as number, placed[0].lngNum as number], 15);
    } else if (placed.length > 1) {
      map.fitBounds(
        placed.map((project) => [project.latNum as number, project.lngNum as number] as [number, number]),
        { padding: [48, 48] },
      );
    }
    const timer = window.setTimeout(() => map.invalidateSize(), 60);
    return () => {
      window.clearTimeout(timer);
      map.remove();
    };
  }, [projects]);

  const missing = projects.filter((project) => project.latNum === null || project.lngNum === null).length;

  return (
    <div className="map-stage">
      <div ref={host} className="h-full w-full" />
      <p className="map-note">
        点击项目名称打开详情。坐标来自表格；未填经纬度时，已核对项目用街道级定位。
        {missing > 0 ? ` ${missing} 个项目没有坐标，未标在图上。` : ""}
      </p>
    </div>
  );
}
