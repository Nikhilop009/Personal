import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const status = [
  { mode: "BUILDING", task: "a portfolio that doesn't suck", color: "bg-cherry text-cream" },
  { mode: "LEARNING", task: "n8n automations + python", color: "bg-lemon" },
  { mode: "PLAYING", task: "depends on the mood today", color: "bg-skyish" },
  { mode: "VIBING", task: "lo-fi + 3am ideas", color: "bg-pinkish" },
  { mode: "OFFLINE", task: "cooking the next move", color: "bg-ink text-cream" },
];

export default function NowPlaying() {
  const [i, setI] = useState(0);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % status.length), 4000);
    const tm = setInterval(() => setMs((m) => m + 1), 1000);
    return () => { clearInterval(t); clearInterval(tm); };
  }, []);

  const cur = status[i];
  const mins = Math.floor(ms / 60).toString().padStart(2, "0");
  const secs = (ms % 60).toString().padStart(2, "0");

  return (
    <section className="relative py-24 px-6 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> live status
          </div>
        </Reveal>

        <motion.div
          key={i}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 130, damping: 18 }}
          className={`${cur.color} rounded-3xl p-8 md:p-12 paper relative overflow-hidden`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-current" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-80">currently</span>
            <span className="ml-auto font-mono text-xs opacity-60">session · {mins}:{secs}</span>
          </div>

          <div className="font-mono text-sm uppercase tracking-widest opacity-70 mb-2">{cur.mode}</div>
          <div className="font-display text-4xl md:text-7xl leading-[0.95]">{cur.task}</div>

          <div className="mt-8 flex gap-1">
            {status.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-colors ${idx === i ? "bg-current" : "bg-current/20"}`}
              />
            ))}
          </div>

          <div className="absolute -bottom-10 -right-10 font-display text-[180px] opacity-10 select-none">
            {i + 1}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
