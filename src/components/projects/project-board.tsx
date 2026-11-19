import { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ProjectDetail } from "@/components/projects/project-detail";
import { ProjectDrawer } from "@/components/projects/project-drawer";
import type { Catalog, Project } from "@/lib/projects/types";

const ProjectMap = lazy(() => import("@/components/projects/project-map"));

type View = "list" | "map";

function TripNote() {
  return (
    <p className="view-note">
      本次探险项目几乎都在 Istanbul「二环」内（指北到 E80 高速，南至 15 国道，西至 O7 快速路，东至 O4 快速路这一带）。
      <br />
      项目关注点：价格、品牌、出租单价、周边客群画像、持有成本等。
    </p>
  );
}

function priceText(project: Project): string {
  if (project.price) return project.price;
  return project.check ? "官网未标价" : "未填写";
}

/** One entry per line. Semicolons, including the full-width form, separate entries. */
function entryLines(value: string): string[] {
  return value
    .split(/[;；]/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function LedgerEntries({ lines, muted, className }: { lines: string[]; muted?: boolean; className?: string }) {
  return (
    <div className={["ledger-entries", muted ? "text-muted" : "", className].filter(Boolean).join(" ")}>
      {lines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
}

/** Sheet District is the Turkish name, with the Chinese name on a second line when filled. */
function districtLines(project: Project): { tr: string; zh: string } {
  const parts = project.district
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (parts.length >= 2) return { tr: parts[0], zh: parts.slice(1).join(" ") };
  return { tr: parts[0] ?? "", zh: project.districtZh };
}

export function ProjectBoard({ catalog }: { catalog: Catalog }) {
  const [view, setView] = useState<View>("list");
  const [openId, setOpenId] = useState<string | null>(null);
  const [focusReviews, setFocusReviews] = useState(false);
  const [mapId, setMapId] = useState<string | null>(null);
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
    if (!visible || !focusReviews) return;
    const timer = window.setTimeout(() => {
      document.getElementById("reviews")?.scrollIntoView({ block: "start" });
    }, 320);
    return () => window.clearTimeout(timer);
  }, [visible, focusReviews, renderedId]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  const openProject = catalog.projects.find((project) => project.id === renderedId) ?? null;
  const mapProject = catalog.projects.find((project) => project.id === mapId) ?? null;
  const placed = catalog.projects.filter((project) => project.latNum !== null).length;

  return (
    <div className="min-h-screen">
      <header className="masthead">
        <div>
          <div className="wordmark">Turppty</div>
          <div className="font-serif text-lg font-semibold leading-tight">土耳其探险之旅</div>
        </div>
        <p className="hidden text-sm text-muted lg:block">
          {catalog.projects.length} 个项目
          {view === "map" ? ` · ${placed} 个已上图` : ""}
          {catalog.sheetOk ? "" : " · 表格暂时读不到"}
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
            onClick={() => {
              setOpenId(null);
              setView("map");
            }}
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
          <TripNote />
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
                <span>Lease/m</span>
                <span>Review</span>
              </div>
              {catalog.projects.map((project, index) => {
                const next = catalog.projects[index + 1];
                const split =
                  project.name === "REFERANS BEYLİKDÜZÜ" && next?.name === "Bakırcı Zenit Topkapı";
                const district = districtLines(project);
                return (
                  <Fragment key={project.id}>
                    <article className="ledger-row">
                      <div>
                        <button
                          type="button"
                          className="name-link"
                          onClick={() => {
                            setFocusReviews(false);
                            setOpenId(project.id);
                          }}
                        >
                          {project.name}
                        </button>
                        {project.supplyLabel ? (
                          <p className="mt-1 text-xs text-muted">{project.supplyLabel}</p>
                        ) : null}
                      </div>
                      <div>
                        <div className="text-xs">{district.tr || "—"}</div>
                        {district.zh ? <div className="text-[0.5rem] text-muted">{district.zh}</div> : null}
                      </div>
                      <div className="text-sm">{project.developer || "—"}</div>
                      <div className={project.handover ? "text-sm" : "text-sm text-muted"}>
                        {project.handover || "待确认"}
                      </div>
                      <LedgerEntries lines={entryLines(priceText(project))} muted={!project.price} />
                      <LedgerEntries
                        className="ledger-lease"
                        lines={entryLines(project.leaseLabel)}
                        muted={project.leaseLabel === "N.A"}
                      />
                      <div className="ledger-review">
                        {project.userReviews.length > 0 ? (
                          <>
                            <span className="review-label">Review</span>
                            <button
                              type="button"
                              className="press"
                              onClick={() => {
                                setFocusReviews(true);
                                setOpenId(project.id);
                              }}
                            >
                              有
                            </button>
                          </>
                        ) : null}
                      </div>
                    </article>
                    {split ? <div className="ledger-split" /> : null}
                  </Fragment>
                );
              })}
            </>
          )}
        </main>
      ) : (
        <div className="map-view">
          <div className="ledger !pb-0">
            <TripNote />
          </div>
          <ClientOnly fallback={<div className="map-stage grid place-items-center text-sm text-muted">地图加载中</div>}>
            <Suspense fallback={<div className="map-stage grid place-items-center text-sm text-muted">地图加载中</div>}>
              <ProjectMap projects={catalog.projects} selectedId={mapId} onOpen={setMapId} />
            </Suspense>
          </ClientOnly>
          <section className="map-detail" aria-live="polite">
            {mapProject ? (
              <ProjectDetail project={mapProject} layout="columns" />
            ) : (
              <p className="map-detail-empty">点击地图上的项目名称，在这里看详情。</p>
            )}
          </section>
        </div>
      )}

      {view === "list" ? (
        <ProjectDrawer project={openProject} visible={visible && openProject !== null} onClose={() => setOpenId(null)} />
      ) : null}
    </div>
  );
}
