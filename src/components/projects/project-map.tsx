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

function pinIcon(name: string, selected: boolean) {
  return L.divIcon({
    className: "map-pin-wrap",
    html: `<button type="button" class="map-pin${selected ? " is-selected" : ""}"><span class="map-pin-dot"></span><span class="map-pin-name">${escapeHtml(name)}</span></button>`,
    iconSize: [240, 36],
    iconAnchor: [8, 18],
  });
}

export default function ProjectMap({
  projects,
  selectedId,
  onOpen,
}: {
  projects: Project[];
  selectedId: string | null;
  onOpen: (id: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const onOpenRef = useRef(onOpen);
  const selectedRef = useRef(selectedId);
  onOpenRef.current = onOpen;
  selectedRef.current = selectedId;

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const map = L.map(node, { scrollWheelZoom: true }).setView([41.05, 28.95], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const markers = new Map<string, L.Marker>();
    const placed = projects.filter((project) => project.latNum !== null && project.lngNum !== null);
    for (const project of placed) {
      const marker = L.marker([project.latNum as number, project.lngNum as number], {
        icon: pinIcon(project.name, project.id === selectedRef.current),
        title: project.name,
        keyboard: true,
        zIndexOffset: project.id === selectedRef.current ? 800 : 0,
      });
      marker.on("click", () => onOpenRef.current(project.id));
      marker.addTo(map);
      markers.set(project.id, marker);
    }
    if (placed.length === 1) {
      map.setView([placed[0].latNum as number, placed[0].lngNum as number], 14);
    } else if (placed.length > 1) {
      map.fitBounds(
        placed.map((project) => [project.latNum as number, project.lngNum as number] as [number, number]),
        { padding: [56, 56] },
      );
    }

    const paint = (id: string | null) => {
      for (const project of placed) {
        const marker = markers.get(project.id);
        if (!marker) continue;
        const selected = project.id === id;
        marker.setIcon(pinIcon(project.name, selected));
        marker.setZIndexOffset(selected ? 800 : 0);
      }
    };
    const onSelect = (event: Event) => paint((event as CustomEvent<string>).detail);
    node.addEventListener("project-select", onSelect);

    const timer = window.setTimeout(() => map.invalidateSize(), 60);
    return () => {
      window.clearTimeout(timer);
      node.removeEventListener("project-select", onSelect);
      map.remove();
    };
  }, [projects]);

  useEffect(() => {
    host.current?.dispatchEvent(new CustomEvent("project-select", { detail: selectedId }));
  }, [selectedId]);

  const missing = projects.filter((project) => project.latNum === null || project.lngNum === null).length;

  return (
    <div className="map-stage">
      <div ref={host} className="h-full w-full" />
      <p className="map-note">
        点击项目名称，在下方查看详情。表格未填经纬度时，用公开地图按地址定位。
        {missing > 0 ? ` ${missing} 个项目没有定位，未标在图上。` : ""}
      </p>
    </div>
  );
}
