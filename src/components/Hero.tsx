import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitText } from "./Reveal";
import IntroCard3D from "./IntroCard3D";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBlob = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scaleBig = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen pt-28 pb-10 overflow-hidden">
      {/* Floating sticker blobs */}
      <motion.div
        style={{ y: yBlob, scale: scaleBig }}
        className="absolute -top-20 -right-32 w-[520px] h-[520px] bg-cherry blob opacity-90"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -120]) }}
        className="absolute top-40 -left-24 w-72 h-72 bg-lemon blob"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
        className="absolute bottom-10 right-1/3 w-56 h-56 bg-skyish blob"
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-40 h-40 bg-pinkish blob"
      />

      {/* Marquee top thin */}
      <div className="absolute top-24 inset-x-0 overflow-hidden border-y border-black/10 bg-cream/60 backdrop-blur-sm">
        <div className="flex whitespace-nowrap marquee-track py-1.5 text-xs font-mono uppercase tracking-widest">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10 pr-10">
              {["Vibe coding daily", "🍒 Kota → World", "Future millionaire @ 19", "I win. I would win. I have to win.", "Don't be average", "Mystery in motion"].map((t, i) => (
                <span key={i} className="flex items-center gap-10">
                  {t}<span className="text-cherry">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.div style={{ y: yTitle, opacity: op }} className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-32">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 bg-cream border border-black/10 rounded-full px-3 py-1.5 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available for chaos
          </span>
          <span className="text-xs font-mono opacity-60">Kota, Rajasthan • IST</span>
        </div>

        <h1 className="font-display leading-[0.86] tracking-tight text-[14vw] md:text-[10.5vw]">
          <span className="block">
            <SplitText text="The mystery" />
          </span>
          <span className="block italic text-cherry">
            <SplitText text="behind you." delay={0.2} />
          </span>
        </h1>

        <div className="mt-10 grid md:grid-cols-3 gap-8 items-end">
          <div className="md:col-span-2">
            <IntroCard3D />
          </div>
          <div className="flex md:justify-end gap-3">
            <a href="#work" className="paper rounded-2xl px-5 py-4 hover:-rotate-2 transition-transform">
              <div className="text-xs font-mono opacity-60">↓ scroll</div>
              <div className="font-display text-xl">see the work</div>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Bottom name hugely */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
      >
        <div className="font-display text-cherry/10 text-[28vw] leading-[0.8] whitespace-nowrap -mb-10">
          NIKHIL · MEHRA
        </div>
      </motion.div>
    </section>
  );
}
