import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      }
    };
    const click = (e: MouseEvent) => {
      const r = document.createElement("div");
      r.className = "ripple";
      r.style.left = e.clientX - 7 + "px";
      r.style.top = e.clientY - 7 + "px";
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 1100);
    };
    const enter = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        if (dot.current) { dot.current.style.width = "44px"; dot.current.style.height = "44px"; }
        if (ring.current) { ring.current.style.opacity = "0"; }
      }
    };
    const leave = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        if (dot.current) { dot.current.style.width = "14px"; dot.current.style.height = "14px"; }
        if (ring.current) { ring.current.style.opacity = "1"; }
      }
    };

    let raf = 0;
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block" />
    </>
  );
}
