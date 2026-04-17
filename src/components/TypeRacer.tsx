import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const phrases = [
  "don't be average when you have potential.",
  "i win, i would win, i have to win. definitely.",
  "be the mystery they can't decode.",
];

export default function TypeRacer() {
  const [target, setTarget] = useState(phrases[0]);
  const [typed, setTyped] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typed && !start) setStart(Date.now());
    if (typed === target && start) {
      const secs = (Date.now() - start) / 1000;
      const words = target.split(" ").length;
      setWpm(Math.round((words / secs) * 60));
      setDone(true);
    }
  }, [typed, target, start]);

  const reset = () => {
    const next = phrases[Math.floor(Math.random() * phrases.length)];
    setTarget(next);
    setTyped("");
    setStart(null);
    setDone(false);
    setWpm(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <section className="relative py-32 px-6 bg-lemon/40 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> type race · prove your speed
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-12">
            type my <span className="italic text-cherry">manifesto.</span>
          </h2>
        </Reveal>

        <div
          onClick={() => inputRef.current?.focus()}
          className="bg-cream rounded-3xl p-8 md:p-12 paper cursor-text"
        >
          <div className="font-mono text-2xl md:text-4xl leading-relaxed tracking-tight">
            {target.split("").map((ch, i) => {
              const t = typed[i];
              const ok = t === ch;
              const wrong = t !== undefined && !ok;
              return (
                <span
                  key={i}
                  className={
                    wrong ? "text-cherry bg-cherry/10 rounded" :
                    t !== undefined ? "text-ink" :
                    "text-ink/25"
                  }
                >
                  {ch}
                  {i === typed.length && <span className="inline-block w-0.5 h-7 bg-cherry animate-pulse align-middle ml-0.5" />}
                </span>
              );
            })}
          </div>
          <input
            ref={inputRef}
            value={typed}
            onChange={(e) => !done && setTyped(e.target.value)}
            className="opacity-0 absolute pointer-events-none"
          />

          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <div className="flex-1 h-2 bg-ink/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${(typed.length / target.length) * 100}%` }}
                className="h-full bg-cherry"
              />
            </div>
            {done && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-ink text-cream px-4 py-2 rounded-full font-mono text-sm"
              >
                {wpm} WPM · 🔥
              </motion.div>
            )}
            <button
              onClick={reset}
              className="bg-ink text-cream rounded-full px-5 py-2 font-mono text-xs uppercase hover:bg-cherry transition-colors"
              data-cursor="hover"
            >
              new phrase
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
