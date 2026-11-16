import { createFileRoute } from "@tanstack/react-router";
import { ProjectBoard } from "@/components/projects/project-board";
import { getCatalog } from "@/lib/projects/catalog";

export const Route = createFileRoute("/")({
  loader: () => getCatalog(),
  component: Home,
});

function Home() {
  const catalog = Route.useLoaderData();
  return <ProjectBoard catalog={catalog} />;
}
