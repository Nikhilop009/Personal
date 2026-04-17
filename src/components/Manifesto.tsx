import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const lines = [
  "I'm not building a portfolio.",
  "I'm building proof.",
  "Proof that a kid from Kota,",
  "with HTML, CSS, Java",
  "and a head full of plans,",
  "can rewrite his bloodline by 19.",
];

function Line({ text, progress, i, total, italic }: { text: string; progress: MotionValue<number>; i: number; total: number; italic?: boolean }) {
  const start = i / total;
  const end = (i + 1) / total;
  const op = useTransform(progress, [start * 0.7, (start + end) / 2 * 0.9, end * 0.95], [0.15, 1, 0.25]);
  const x = useTransform(progress, [start * 0.7, end * 0.95], [40, -10]);
  return (
    <motion.p
      style={{ opacity: op, x }}
      className={`font-display text-4xl md:text-6xl leading-tight ${italic ? "italic text-cherry" : ""}`}
    >
      {text}
    </motion.p>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest opacity-60 mb-8">// manifesto</div>
        {lines.map((l, i) => (
          <Line key={i} text={l} progress={scrollYProgress} i={i} total={lines.length} italic={i === lines.length - 1} />
        ))}
      </div>
    </section>
  );
}
