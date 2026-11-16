import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectBoard } from "@/components/projects/project-board";
import { getCatalog } from "@/lib/projects/catalog";
import type { Catalog } from "@/lib/projects/types";

export const Route = createFileRoute("/")({
  headers: () => ({ "Cache-Control": "no-store" }),
  loader: () => getCatalog(),
  component: Home,
});

function Home() {
  const initial = Route.useLoaderData();
  const [catalog, setCatalog] = useState<Catalog>(initial);

  useEffect(() => {
    let cancelled = false;
    getCatalog()
      .then((next) => {
        if (!cancelled) setCatalog(next);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return <ProjectBoard catalog={catalog} />;
}
