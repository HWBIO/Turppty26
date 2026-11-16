import { useEffect } from "react";
import { ProjectDetail } from "@/components/projects/project-detail";
import type { Project } from "@/lib/projects/types";

export function ProjectDrawer({
  project,
  visible,
  onClose,
}: {
  project: Project | null;
  visible: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!visible) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  return (
    <>
      <button
        type="button"
        className={visible ? "backdrop show" : "backdrop"}
        aria-label="关闭详情"
        onClick={onClose}
      />
      <aside
        className={visible ? "drawer show" : "drawer"}
        role="dialog"
        aria-modal="true"
        aria-hidden={!visible}
        aria-label={project?.name ?? "项目详情"}
      >
        {project ? (
          <div className="px-10 py-8">
            <div className="mb-2 flex justify-end">
              <button type="button" className="press border border-line px-3 py-1.5 text-sm" onClick={onClose}>
                关闭
              </button>
            </div>
            <ProjectDetail project={project} layout="stack" />
          </div>
        ) : null}
      </aside>
    </>
  );
}
