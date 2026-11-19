import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/lib/projects/types";

function thumbSrc(src: string): string {
  if (src.startsWith("/project-photos/") && !src.includes("-thumb.")) {
    return src.replace(/(\.[a-z0-9]+)$/i, "-thumb$1");
  }
  return src;
}

export function ImageBanner({
  images,
  total,
  name,
}: {
  images: ProjectImage[];
  total: number;
  name: string;
}) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<number[]>([]);
  const startX = useRef<number | null>(null);
  const signature = images.map((image) => image.src).join("|");

  useEffect(() => {
    setIndex(0);
    setFailed([]);
  }, [signature]);

  useEffect(() => {
    if (!failed.includes(index)) return;
    const next = images.findIndex((_, item) => !failed.includes(item));
    if (next >= 0) setIndex(next);
  }, [failed, index, images]);

  if (images.length === 0) return null;
  if (failed.length >= images.length) {
    return <p className="banner-caption">图片暂时打不开。</p>;
  }

  const count = images.length;
  const safeIndex = Math.min(index, count - 1);
  const current = images[safeIndex];
  if (!current) return null;
  const many = count > 1;

  function step(delta: number) {
    setIndex((prev) => {
      const size = images.length;
      return (prev + delta + size) % size;
    });
  }

  const capNote = total > count ? `图源共 ${total} 张，这里显示前 ${count} 张。` : "";

  return (
    <figure className="banner">
      <div
        className="banner-frame"
        tabIndex={many ? 0 : undefined}
        aria-roledescription="carousel"
        aria-label={`${name} 图片`}
        onKeyDown={(event) => {
          if (!many) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
        }}
        onPointerDown={(event) => {
          if (!many) return;
          startX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (!many || startX.current === null) return;
          const delta = event.clientX - startX.current;
          startX.current = null;
          if (delta > 48) step(-1);
          else if (delta < -48) step(1);
        }}
      >
        <img
          key={current.src}
          src={current.src}
          alt={`${name} 图片 ${safeIndex + 1}`}
          referrerPolicy="no-referrer"
          onError={() => setFailed((prev) => (prev.includes(safeIndex) ? prev : [...prev, safeIndex]))}
        />
        {many ? (
          <>
            <button type="button" className="banner-nav banner-prev press" aria-label="上一张" onClick={() => step(-1)}>
              ‹
            </button>
            <button type="button" className="banner-nav banner-next press" aria-label="下一张" onClick={() => step(1)}>
              ›
            </button>
          </>
        ) : null}
      </div>
      <p className="banner-count" aria-live="polite">
        {safeIndex + 1}/{count}
      </p>
      {many ? (
        <div className="banner-strip" role="tablist" aria-label="选择图片">
          {images.map((image, item) => (
            <button
              key={image.src}
              type="button"
              className="banner-thumb"
              role="tab"
              aria-selected={item === safeIndex}
              aria-label={`第 ${item + 1} 张`}
              onClick={() => setIndex(item)}
            >
              <img src={thumbSrc(image.src)} alt="" />
            </button>
          ))}
        </div>
      ) : null}
      <figcaption className="banner-caption">
        {current.caption}
        {capNote ? ` ${capNote}` : ""}
      </figcaption>
    </figure>
  );
}
