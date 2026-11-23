"use client";

import Link from "next/link";
import { useRef } from "react";

// Work pieces scattered over the hero. Each one can be dragged; a click
// without a drag opens the project. Positions live in CSS (.piece:nth-child).
export default function Desk({ projects }) {
  const top = useRef(10);
  const drag = useRef(null);

  function down(e) {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    el.style.zIndex = ++top.current;
    drag.current = {
      el,
      x: e.clientX - (parseFloat(el.style.getPropertyValue("--dx")) || 0),
      y: e.clientY - (parseFloat(el.style.getPropertyValue("--dy")) || 0),
      sx: e.clientX,
      sy: e.clientY,
      moved: false,
    };
  }

  function move(e) {
    const d = drag.current;
    if (!d) return;
    if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 4) d.moved = true;
    d.el.style.setProperty("--dx", `${e.clientX - d.x}px`);
    d.el.style.setProperty("--dy", `${e.clientY - d.y}px`);
  }

  function up() {
    const d = drag.current;
    if (d?.moved) d.el.dataset.dragged = "1";
    drag.current = null;
  }

  function click(e) {
    const el = e.currentTarget;
    if (el.dataset.dragged) {
      e.preventDefault();
      delete el.dataset.dragged;
    }
  }

  return (
    <div className="desk">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}`}
          className="piece"
          draggable={false}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onClick={click}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised webp */}
          <img src={p.pin} alt={p.title} draggable={false} />
        </Link>
      ))}
    </div>
  );
}
