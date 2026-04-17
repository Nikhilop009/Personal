import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const c = animate(mv, to, { duration: 2.2, ease: [0.2, 0.85, 0.2, 1] });
      return c.stop;
    }
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  const items = [
    { n: 19, s: "", l: "the goal age" },
    { n: 100, s: "%", l: "self-belief" },
    { n: 0, s: "", l: "best friends" },
    { n: 24, s: "/7", l: "build mode" },
  ];
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="paper rounded-3xl p-6 border border-black/5">
              <div className="font-display text-6xl md:text-7xl tracking-tight text-cherry">
                <Counter to={it.n} suffix={it.s} />
              </div>
              <div className="mt-2 text-sm font-mono uppercase tracking-widest opacity-60">{it.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
