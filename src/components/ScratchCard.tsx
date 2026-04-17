import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // gradient scratch surface
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#d23652");
    grad.addColorStop(0.5, "#ffc8d6");
    grad.addColorStop(1, "#fff3a0");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(10,10,10,0.85)";
    ctx.font = "bold 22px monospace";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH HERE", rect.width / 2, rect.height / 2 - 6);
    ctx.font = "12px monospace";
    ctx.fillText("drag to reveal a secret", rect.width / 2, rect.height / 2 + 18);

    ctx.globalCompositeOperation = "destination-out";

    const checkProgress = () => {
      const img = ctx.getImageData(0, 0, c.width, c.height).data;
      let cleared = 0;
      for (let i = 3; i < img.length; i += 32) if (img[i] === 0) cleared++;
      const total = img.length / 32;
      if (cleared / total > 0.4) setRevealed(true);
    };

    const scratch = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
    };

    const getPos = (e: MouseEvent | TouchEvent): [number, number] => {
      const r = c.getBoundingClientRect();
      if ("touches" in e) return [e.touches[0].clientX - r.left, e.touches[0].clientY - r.top];
      return [(e as MouseEvent).clientX - r.left, (e as MouseEvent).clientY - r.top];
    };

    const start = (e: MouseEvent | TouchEvent) => { drawing.current = true; const [x, y] = getPos(e); scratch(x, y); };
    const move = (e: MouseEvent | TouchEvent) => { if (!drawing.current) return; const [x, y] = getPos(e); scratch(x, y); };
    const end = () => { if (drawing.current) { drawing.current = false; checkProgress(); } };

    c.addEventListener("mousedown", start);
    c.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    c.addEventListener("touchstart", start);
    c.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
    return () => {
      c.removeEventListener("mousedown", start);
      c.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      c.removeEventListener("touchstart", start);
      c.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, []);

  return (
    <section className="relative py-32 px-6 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> a hidden message
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-12">
            scratch to <span className="italic text-cherry">reveal.</span>
          </h2>
        </Reveal>

        <div className="relative max-w-2xl mx-auto">
          <div className="bg-ink text-cream rounded-3xl p-10 md:p-14 paper text-center min-h-[260px] flex flex-col items-center justify-center">
            <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-60 mb-3">message</div>
            <div className="font-display text-3xl md:text-5xl italic leading-tight">
              "enjoying my temporary downfall. <br />
              once i come back — <span className="text-cherry">you'll never smile again.</span>"
            </div>
            <div className="mt-4 font-mono text-xs opacity-50">— for the doubters</div>
          </div>
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full rounded-3xl cursor-crosshair touch-none transition-opacity duration-700 ${revealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            className="text-center mt-4 font-mono text-xs text-cherry"
          >
            ✓ secret unlocked.
          </motion.div>
        </div>
      </div>
    </section>
  );
}
