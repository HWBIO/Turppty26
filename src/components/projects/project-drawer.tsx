import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects/types";

function Field({ label, value, pending }: { label: string; value: string; pending?: boolean }) {
  return (
    <div>
      <div className="text-xs tracking-widest text-muted">{label}</div>
      <div className={pending ? "mt-1 text-muted" : "mt-1"}>{value || "—"}</div>
    </div>
  );
}

export function ProjectDrawer({
  project,
  visible,
  onClose,
}: {
  project: Project | null;
  visible: boolean;
  onClose: () => void;
}) {
  const [imageOk, setImageOk] = useState(true);

  useEffect(() => {
    setImageOk(true);
  }, [project?.id]);

  useEffect(() => {
    if (!visible) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  const check = project?.check;
  const handoverPending = !project?.handover;
  const pricePending = !project?.price;

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
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs tracking-widest text-muted">
                  {project.city || "伊斯坦布尔"}
                  {project.district ? ` · ${project.district}` : ""}
                  {project.districtZh ? ` ${project.districtZh}` : ""}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight">{project.name}</h2>
              </div>
              <button
                type="button"
                className="press shrink-0 border border-line px-3 py-1.5 text-sm"
                onClick={onClose}
              >
                关闭
              </button>
            </div>

            {check?.image && imageOk ? (
              <figure className="mt-6">
                <img
                  src={check.image.src}
                  alt={`${project.name} 效果图`}
                  className="w-full object-cover"
                  onError={() => setImageOk(false)}
                />
                <figcaption className="mt-2 text-xs text-muted">{check.image.caption}</figcaption>
              </figure>
            ) : null}

            <div className="fact-grid mt-8 border-t border-line pt-6">
              <Field label="开发商" value={project.developer} />
              <Field
                label="交楼时间"
                value={project.handover || "待确认"}
                pending={handoverPending}
              />
              <Field
                label="报价范围"
                value={project.price || (check ? "官网未标价" : "未填写")}
                pending={pricePending}
              />
              <Field label="供应规模" value={project.supplyLabel || project.supply} />
              <Field label="地址" value={project.address} />
              <Field label="所在城区" value={[project.district, project.districtZh].filter(Boolean).join(" · ")} />
            </div>

            {project.website ? (
              <a
                className="mt-6 inline-block text-sm text-accent underline decoration-1 underline-offset-4"
                href={project.website}
                target="_blank"
                rel="noreferrer"
              >
                项目官网
              </a>
            ) : null}

            {check ? (
              <>
                <h3 className="mt-10 font-serif text-xl font-semibold">根据官网整理</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-ink">{check.summary}</p>
                <p className="mt-2 text-xs text-muted">核对日期 {check.checkedOn}。表格里已填写的交楼时间和报价，以上方字段为准。</p>

                {check.units.length > 0 ? (
                  <>
                    <h3 className="mt-10 font-serif text-xl font-semibold">户型面积</h3>
                    <p className="mt-2 text-xs text-muted">单位平方米，取自官网英文页户型表。</p>
                    <table className="mt-4 w-full text-sm">
                      <thead>
                        <tr className="border-b border-line text-left text-xs tracking-widest text-muted">
                          <th className="py-2 font-medium">户型</th>
                          <th className="py-2 font-medium">净面积</th>
                          <th className="py-2 font-medium">毛面积</th>
                        </tr>
                      </thead>
                      <tbody>
                        {check.units.map((unit) => (
                          <tr key={unit.type} className="border-b border-line">
                            <td className="py-2">{unit.type}</td>
                            <td className="py-2 tabular-nums">{unit.net}</td>
                            <td className="py-2 tabular-nums">{unit.gross}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : null}

                <h3 className="mt-10 font-serif text-xl font-semibold">公开信息核对</h3>
                <div className="mt-4 flex flex-col gap-5">
                  {check.items.map((item) => (
                    <section key={item.heading}>
                      <h4 className="font-medium">{item.heading}</h4>
                      <p className="mt-1 text-sm leading-7 text-muted">{item.body}</p>
                      {item.href ? (
                        <a
                          className="mt-1 inline-block text-sm text-accent underline underline-offset-4"
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.hrefLabel ?? "来源"}
                        </a>
                      ) : null}
                    </section>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-8 text-sm text-muted">这个项目还没有做公开核对，上面只显示表格里的字段。</p>
            )}

            {project.reviews ? (
              <>
                <h3 className="mt-10 font-serif text-xl font-semibold">表格中的用户评价</h3>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-7">{project.reviews}</p>
              </>
            ) : null}

            {project.brief ? (
              <>
                <h3 className="mt-10 font-serif text-xl font-semibold">表格简介原文</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{project.brief}</p>
              </>
            ) : null}

            {project.note ? <p className="mt-6 text-sm text-muted">备注：{project.note}</p> : null}

            <p className="mt-12 border-t border-line pt-4 text-xs leading-6 text-muted">
              本页供客户浏览项目信息，不构成投资、购房或入籍的法律意见。报价和交楼时间以表格及开发商书面文件为准。
            </p>
          </div>
        ) : null}
      </aside>
    </>
  );
}
