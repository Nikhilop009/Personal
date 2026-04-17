import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

type Pop = { id: number; x: number; y: number };

const ranks = [
  { min: 0, label: "average npc", color: "bg-skyish" },
  { min: 10, label: "trying", color: "bg-lemon" },
  { min: 25, label: "locked in", color: "bg-pinkish" },
  { min: 50, label: "menace", color: "bg-cherry text-cream" },
  { min: 100, label: "millionaire energy", color: "bg-ink text-cream" },
];

export default function CherryGame() {
  const [score, setScore] = useState(0);
  const [pops, setPops] = useState<Pop[]>([]);

  const tap = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setPops((p) => [...p, { id, x, y }]);
    setScore((s) => s + 1);
    setTimeout(() => setPops((p) => p.filter((pp) => pp.id !== id)), 800);
  };

  const rank = [...ranks].reverse().find((r) => score >= r.min)!;

  return (
    <section className="relative py-32 px-6 bg-pinkish/40 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> mini-game · cherry tap
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-4">
            tap the cherry. <br />
            <span className="italic text-cherry">earn your rank.</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="opacity-60 mb-10">no leaderboard. no glory. just dopamine.</p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6">
          <div
            onClick={tap}
            className="relative lg:col-span-2 h-[450px] bg-cream rounded-3xl overflow-hidden paper cursor-pointer select-none"
            data-cursor="hover"
          >
            <motion.div
              animate={{ scale: [1, 0.9, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] select-none pointer-events-none"
            >
              🍒
            </motion.div>
            <div className="absolute top-4 left-4 font-mono text-xs opacity-50">tap anywhere</div>
            <AnimatePresence>
              {pops.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 1, scale: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1.5, y: -60 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ left: p.x, top: p.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-cherry font-display text-3xl pointer-events-none"
                >
                  +1
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="bg-ink text-cream rounded-3xl p-6 paper">
              <div className="text-xs font-mono uppercase tracking-widest opacity-60">score</div>
              <motion.div
                key={score}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="font-display text-7xl"
              >
                {score}
              </motion.div>
            </div>
            <motion.div
              key={rank.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`${rank.color} rounded-3xl p-6 paper`}
            >
              <div className="text-xs font-mono uppercase tracking-widest opacity-70">rank</div>
              <div className="font-display text-3xl">{rank.label}</div>
            </motion.div>
            <button
              onClick={() => setScore(0)}
              className="w-full bg-cream border border-ink/15 rounded-2xl py-3 font-mono text-xs uppercase hover:bg-ink hover:text-cream transition-colors"
            >
              reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
