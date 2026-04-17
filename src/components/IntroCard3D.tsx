import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Bold, readable, layered 3D intro card.
 * Mouse-tracked tilt + multi-layer depth + giant pull-quote.
 */
export default function IntroCard3D() {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 140, damping: 18, mass: 0.5 });

  const rotX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-12, 12]);

  // parallax layers
  const lift = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const liftY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const back = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const backY = useTransform(sy, [-0.5, 0.5], [10, -10]);

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="relative max-w-4xl mx-auto mt-10" style={{ perspective: 1400 }}>
      {/* drop shadow plate (sits on the page, not tilted) */}
      <div className="absolute inset-x-8 -bottom-6 h-12 bg-ink/15 blur-2xl rounded-full" />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* === BACK STACK PAPERS (offset shadows like 3 stacked cards) === */}
        <div
          className="absolute inset-0 bg-ink rounded-[28px]"
          style={{ transform: "translate(14px,14px) translateZ(-60px)" }}
        />
        <div
          className="absolute inset-0 bg-cherry rounded-[28px]"
          style={{ transform: "translate(8px,8px) translateZ(-30px)" }}
        />

        {/* === MAIN CARD === */}
        <div
          className="relative bg-cream rounded-[28px] border-[3px] border-ink overflow-hidden"
          style={{ transform: "translateZ(0)", boxShadow: "0 30px 60px -20px rgba(10,10,10,.35)" }}
        >
          {/* corner ribbons */}
          <div
            className="absolute -top-3 -left-3 bg-ink text-cream text-[10px] font-mono uppercase tracking-[0.3em] px-3 py-1.5 rotate-[-8deg] z-30"
            style={{ transform: "translateZ(60px) rotate(-8deg)" }}
          >
            ★ about.txt
          </div>
          <div
            className="absolute -top-3 -right-3 bg-cherry text-cream text-[10px] font-mono uppercase tracking-[0.3em] px-3 py-1.5 rotate-[8deg] z-30"
            style={{ transform: "translateZ(60px) rotate(8deg)" }}
          >
            real · raw · 2026
          </div>

          {/* faded background giant glyph */}
          <motion.div
            style={{ x: back, y: backY }}
            className="absolute -bottom-32 -right-16 font-display text-[420px] leading-none text-cherry/[0.06] select-none pointer-events-none"
          >
            N
          </motion.div>
          <motion.div
            style={{ x: useTransform(sx, [-0.5, 0.5], [-8, 8]), y: useTransform(sy, [-0.5, 0.5], [-6, 6]) }}
            className="absolute top-6 left-6 w-24 h-24 rounded-full bg-lemon/60 blur-2xl"
          />
          <motion.div
            style={{ x: useTransform(sx, [-0.5, 0.5], [10, -10]), y: useTransform(sy, [-0.5, 0.5], [8, -8]) }}
            className="absolute bottom-10 left-1/3 w-32 h-32 rounded-full bg-pinkish/70 blur-2xl"
          />

          {/* dotted grid */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #0a0a0a 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* === CONTENT === */}
          <div className="relative px-7 md:px-14 py-12 md:py-16">
            {/* tag row */}
            <motion.div
              style={{ x: lift, y: liftY }}
              className="flex items-center gap-3 mb-7 text-[11px] font-mono uppercase tracking-[0.3em] opacity-70"
            >
              <span className="w-8 h-px bg-ink" />
              who am i, in one breath
              <span className="w-8 h-px bg-ink" />
            </motion.div>

            {/* === THE PARAGRAPH (giant, bold, layered) === */}
            <motion.p
              style={{ x: lift, y: liftY }}
              className="font-display text-[34px] md:text-[54px] leading-[1.05] tracking-tight text-ink"
            >
              I'm{" "}
              <Word color="lemon" big>
                Nikhil&nbsp;Mehra
              </Word>{" "}
              — an{" "}
              <Word color="cherry" pill>
                introvert
              </Word>{" "}
              from{" "}
              <Word color="sky" pill>
                Kota
              </Word>{" "}
              who builds websites at{" "}
              <span className="inline-block bg-ink text-cream font-mono text-[26px] md:text-[40px] px-3 py-0.5 rounded-md align-middle -rotate-2">
                2&nbsp;AM
              </span>
              , learns games for fun, and{" "}
              <span className="relative inline-block italic font-bold text-cherry">
                refuses to be average
                <svg
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-1 w-full h-2 text-cherry"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M3 8 Q 80 2, 150 7 T 297 6" />
                </svg>
              </span>{" "}
              when{" "}
              <Word color="pink" pill>
                potential
              </Word>{" "}
              is sitting{" "}
              <span className="italic underline decoration-wavy decoration-ink/40 underline-offset-4">
                right here
              </span>
              .
            </motion.p>

            {/* divider */}
            <motion.div
              style={{ x: lift, y: liftY }}
              className="my-8 flex items-center gap-3"
            >
              <span className="h-px flex-1 bg-ink/15" />
              <span className="text-cherry text-xl">✦</span>
              <span className="h-px flex-1 bg-ink/15" />
            </motion.div>

            {/* signature row */}
            <motion.div
              style={{ x: lift, y: liftY }}
              className="flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-ink text-cream font-display text-2xl flex items-center justify-center border-2 border-cherry">
                  N
                </div>
                <div>
                  <div className="font-display text-2xl italic">— nikhil.</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-50">
                    signed @ 02:47 am · kota
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Stat n="19" label="goal age" />
                <Stat n="0" label="best friends" />
                <Stat n="∞" label="ambition" />
              </div>
            </motion.div>
          </div>

          {/* bottom barcode strip */}
          <div className="relative h-7 bg-ink flex items-center justify-between px-5 text-cream font-mono text-[9px] uppercase tracking-[0.3em]">
            <span>nikhil_mehra_v2026.exe</span>
            <span className="flex gap-[2px]">
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  className="bg-cream"
                  style={{ width: i % 3 === 0 ? 3 : 1, height: 14 }}
                />
              ))}
            </span>
            <span>● live</span>
          </div>
        </div>
      </motion.div>

      {/* hint */}
      <div className="text-center mt-8 text-[11px] font-mono uppercase tracking-[0.3em] opacity-50">
        ✦ move your cursor over the card ✦
      </div>
    </div>
  );
}

function Word({
  children,
  color,
  pill,
  big,
}: {
  children: React.ReactNode;
  color: "cherry" | "sky" | "pink" | "lemon";
  pill?: boolean;
  big?: boolean;
}) {
  const map = {
    cherry: "bg-cherry text-cream",
    sky: "bg-skyish text-ink",
    pink: "bg-pinkish text-ink",
    lemon: "bg-lemon text-ink",
  };
  if (big) {
    return (
      <span className="relative inline-block font-bold">
        <span
          className={`absolute inset-x-0 bottom-1 h-[55%] ${map[color]} -skew-x-6 -z-0`}
        />
        <span className="relative">{children}</span>
      </span>
    );
  }
  if (pill) {
    return (
      <span
        className={`inline-block ${map[color]} px-3 py-0.5 rounded-full font-bold align-middle text-[26px] md:text-[40px] leading-none`}
        style={{ transform: "translateY(-2px) rotate(-1.5deg)", display: "inline-block" }}
      >
        {children}
      </span>
    );
  }
  return <span className={`${map[color]} px-2 rounded`}>{children}</span>;
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="bg-ink/5 border border-ink/10 rounded-xl px-3 py-2 text-center min-w-[68px]">
      <div className="font-display text-2xl leading-none text-cherry">{n}</div>
      <div className="font-mono text-[8px] uppercase tracking-[0.2em] opacity-60 mt-1">
        {label}
      </div>
    </div>
  );
}
