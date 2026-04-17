import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

export default function BusinessCard() {
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rx = useTransform(sy, [-100, 100], [12, -12]);
  const ry = useTransform(sx, [-100, 100], [-12, 12]);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <section className="relative py-32 px-6 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> the card · hover & flip
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-12">
            collect a <span className="italic text-cherry">souvenir.</span>
          </h2>
        </Reveal>

        <div className="flex justify-center" style={{ perspective: 1200 }}>
          <motion.div
            onMouseMove={move}
            onMouseLeave={leave}
            onClick={() => setFlipped((f) => !f)}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative w-[360px] h-[220px] md:w-[480px] md:h-[280px] cursor-pointer"
            data-cursor="hover"
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute inset-0"
            >
              {/* FRONT */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 bg-ink text-cream rounded-2xl p-7 paper flex flex-col justify-between overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">est. kota · rajasthan</div>
                    <div className="font-display text-3xl md:text-4xl mt-1">Nikhil Mehra</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cherry flex items-center justify-center text-cream font-display">N</div>
                </div>
                <div>
                  <div className="font-mono text-xs opacity-70">vibe coder · automator · mystery</div>
                  <div className="mt-2 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-cherry" />
                    <span className="w-2 h-2 rounded-full bg-lemon" />
                    <span className="w-2 h-2 rounded-full bg-skyish" />
                    <span className="w-2 h-2 rounded-full bg-pinkish" />
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 text-[160px] opacity-5 font-display">N</div>
              </div>
              {/* BACK */}
              <div
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                className="absolute inset-0 bg-cherry text-cream rounded-2xl p-7 paper flex flex-col justify-between"
              >
                <div className="font-display text-2xl italic leading-tight">
                  "if you wanna be my friend, i'm the best you've ever seen.
                  if enemy — i'm good at that too."
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-80">
                  click to flip · move mouse to tilt
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="text-center mt-8 font-mono text-xs opacity-60">
          ☝ tilts with your cursor · click to see what's behind
        </div>
      </div>
    </section>
  );
}
