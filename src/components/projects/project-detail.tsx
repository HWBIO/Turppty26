import { ImageBanner } from "@/components/projects/image-banner";
import { splitSourceUrls } from "@/lib/projects/gallery";
import type { Project } from "@/lib/projects/types";

function Field({ label, value, pending }: { label: string; value: string; pending?: boolean }) {
  return (
    <div>
      <div className="text-xs tracking-widest text-muted">{label}</div>
      <div className={pending ? "mt-1 text-muted" : "mt-1"}>{value || "—"}</div>
    </div>
  );
}

export function ProjectDetail({ project, layout }: { project: Project; layout: "stack" | "columns" }) {
  const check = project.check;
  const handoverPending = !project.handover;
  const pricePending = !project.price;

  const heading = (
    <div>
      <p className="text-xs tracking-widest text-muted">
        {project.city || "伊斯坦布尔"}
        {project.district ? ` · ${project.district}` : ""}
        {project.districtZh ? ` ${project.districtZh}` : ""}
      </p>
      <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight">{project.name}</h2>
    </div>
  );

  const image = <ImageBanner images={project.images} total={project.imageTotal} name={project.name} />;

  const facts = (
    <div className="fact-grid mt-8 border-t border-line pt-6">
      <Field label="开发商" value={project.developer} />
      <Field label="交楼时间" value={project.handover || "待确认"} pending={handoverPending} />
      <Field
        label="报价范围"
        value={project.price || (check ? "官网未标价" : "未填写")}
        pending={pricePending}
      />
      <Field label="供应规模" value={project.supplyLabel || project.supply} />
      <Field label="地址" value={project.address} />
      <Field label="所在城区" value={[project.district, project.districtZh].filter(Boolean).join(" · ")} />
    </div>
  );

  const website = project.website ? (
    <a
      className="mt-6 inline-block text-sm text-accent underline decoration-1 underline-offset-4"
      href={project.website}
      target="_blank"
      rel="noreferrer"
    >
      项目官网
    </a>
  ) : null;

  const sourceUrls = splitSourceUrls(project.imageSource);
  const sources =
    sourceUrls.length > 0 ? (
      <div className="mt-2 flex flex-col gap-1">
        {sourceUrls.map((url, index) => (
          <a
            key={url}
            className="inline-block text-sm text-accent underline decoration-1 underline-offset-4"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {sourceUrls.length > 1 ? `图源 ${index + 1}` : "图源"}
          </a>
        ))}
      </div>
    ) : null;

  const narrative = (
    <>
      {check ? (
        <>
          <h3 className="font-serif text-xl font-semibold">根据官网整理</h3>
          <p className="mt-3 text-sm leading-7 text-ink">{check.summary}</p>
          <p className="mt-2 text-xs text-muted">核对日期 {check.checkedOn}。表格里已填写的交楼时间和报价，以字段栏为准。</p>

          {check.units.length > 0 ? (
            <>
              <h3 className="mt-8 font-serif text-xl font-semibold">户型面积</h3>
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

          <h3 className="mt-8 font-serif text-xl font-semibold">公开信息核对</h3>
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
        <p className="text-sm leading-7 text-muted">
          {project.imageFrom === "sheet"
            ? "图片来自表格「图源」。交楼时间和报价没有另补，仍以表格为准。"
            : project.imageFrom === "curated"
              ? "图下来源已核对。交楼时间和报价没有用中介数字补上，仍以表格为准。"
              : "这个项目还没有找到可展示的公开图片，字段栏只显示表格里的内容。"}
        </p>
      )}

      {project.reviews ? (
        <>
          <h3 className="mt-8 font-serif text-xl font-semibold">表格中的用户评价</h3>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7">{project.reviews}</p>
        </>
      ) : null}

      {project.brief ? (
        <>
          <h3 className="mt-8 font-serif text-xl font-semibold">项目简介(by AI)</h3>
          {project.briefZh ? <p className="mt-3 text-sm leading-7">{project.briefZh}</p> : null}
          <p className="mt-3 text-sm leading-7 text-muted">{project.brief}</p>
        </>
      ) : null}

      {project.note ? <p className="mt-6 text-sm text-muted">备注：{project.note}</p> : null}

      <p className="mt-10 border-t border-line pt-4 text-xs leading-6 text-muted">
        本页供客户浏览项目信息，不构成投资、购房或入籍的法律意见。报价和交楼时间以表格及开发商书面文件为准。
      </p>
    </>
  );

  if (layout === "columns") {
    return (
      <div className="detail-split">
        <div>
          {heading}
          {image}
          {facts}
          {website}
          {sources}
        </div>
        <div>{narrative}</div>
      </div>
    );
  }

  return (
    <div>
      {heading}
      {image}
      {facts}
      {website}
      {sources}
      <div className="mt-10">{narrative}</div>
    </div>
  );
}
