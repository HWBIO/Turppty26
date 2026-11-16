import { lazy, Suspense, useEffect, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ProjectDrawer } from "@/components/projects/project-drawer";
import type { Catalog, Project } from "@/lib/projects/types";

const ProjectMap = lazy(() => import("@/components/projects/project-map"));

type View = "list" | "map";

function priceText(project: Project): string {
  if (project.price) return project.price;
  return project.check ? "官网未标价" : "未填写";
}

export function ProjectBoard({ catalog }: { catalog: Catalog }) {
  const [view, setView] = useState<View>("list");
  const [openId, setOpenId] = useState<string | null>(null);
  const [renderedId, setRenderedId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (openId) {
      setRenderedId(openId);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setRenderedId(null), 280);
    return () => window.clearTimeout(timer);
  }, [openId]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  const openProject = catalog.projects.find((project) => project.id === renderedId) ?? null;
  const placed = catalog.projects.filter((project) => project.latNum !== null).length;

  return (
    <div className="min-h-screen">
      <header className="masthead">
        <div>
          <div className="wordmark">Turppty</div>
          <div className="font-serif text-lg font-semibold leading-tight">土耳其投资置业</div>
        </div>
        <p className="hidden text-sm text-muted lg:block">
          {catalog.projects.length} 个项目
          {view === "map" ? ` · ${placed} 个已上图` : ""}
          {catalog.sheetOk ? " · 名单读取自表格" : " · 表格暂时读不到"}
        </p>
        <div className="view-switch" role="group" aria-label="视图">
          <button
            type="button"
            className="press"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            列表
          </button>
          <button
            type="button"
            className="press"
            aria-pressed={view === "map"}
            onClick={() => setView("map")}
          >
            地图
          </button>
        </div>
      </header>

      {!catalog.sheetOk ? (
        <p className="border-b border-line bg-accent-soft px-8 py-3 text-sm text-ink">
          内部表格这次没有读到（{catalog.sheetError}）。下面暂用 2026-11-16 的表格副本，刷新后会再试。
        </p>
      ) : null}

      {view === "list" ? (
        <main className="ledger">
          <p className="mb-6 max-w-2xl text-sm leading-7 text-muted">
            给投资移民客户看的项目备选。点项目名称看详情。交楼和报价如果表格没填，不会用中介数字顶上。
          </p>
          {catalog.projects.length === 0 ? (
            <p className="border-t border-line py-10 text-muted">表格里还没有项目名称。</p>
          ) : (
            <>
              <div className="ledger-head">
                <span>项目名称</span>
                <span>所在城区</span>
                <span>开发商</span>
                <span>交楼时间</span>
                <span>报价范围</span>
              </div>
              {catalog.projects.map((project, index) => (
                <article key={project.id} className="ledger-row">
                  <div>
                    <button type="button" className="name-link" onClick={() => setOpenId(project.id)}>
                      {project.name}
                    </button>
                    <p className="mt-1 text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                      {project.supplyLabel ? ` · ${project.supplyLabel}` : ""}
                    </p>
                  </div>
                  <div>
                    <div>{project.district || "—"}</div>
                    {project.districtZh ? <div className="text-xs text-muted">{project.districtZh}</div> : null}
                  </div>
                  <div className="text-sm">{project.developer || "—"}</div>
                  <div className={project.handover ? "text-sm" : "text-sm text-muted"}>
                    {project.handover || "待确认"}
                  </div>
                  <div className={project.price ? "text-sm" : "text-sm text-muted"}>{priceText(project)}</div>
                </article>
              ))}
            </>
          )}
        </main>
      ) : (
        <ClientOnly fallback={<div className="map-stage grid place-items-center text-sm text-muted">地图加载中</div>}>
          <Suspense fallback={<div className="map-stage grid place-items-center text-sm text-muted">地图加载中</div>}>
            <ProjectMap projects={catalog.projects} onOpen={setOpenId} />
          </Suspense>
        </ClientOnly>
      )}

      <ProjectDrawer project={openProject} visible={visible && openProject !== null} onClose={() => setOpenId(null)} />
    </div>
  );
}
