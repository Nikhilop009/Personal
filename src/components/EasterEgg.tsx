import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function EasterEgg() {
  const [pos, setPos] = useState(0);
  const [show, setShow] = useState(false);
  const [pieces, setPieces] = useState<{id:number;x:number;c:string;d:number;r:number}[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const expected = seq[pos];
      if (e.key === expected) {
        const next = pos + 1;
        if (next === seq.length) {
          setShow(true);
          fire();
          setPos(0);
        } else setPos(next);
      } else setPos(0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pos]);

  const fire = () => {
    const colors = ["#d23652", "#fff3a0", "#ffc8d6", "#c8e6ff"];
    const p = Array.from({ length: 80 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      c: colors[Math.floor(Math.random() * colors.length)],
      d: 1 + Math.random() * 2,
      r: Math.random() * 720 - 360,
    }));
    setPieces(p);
    setTimeout(() => setPieces([]), 4000);
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
            className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 130 }}
              className="bg-cream text-ink rounded-3xl p-10 md:p-16 max-w-2xl text-center paper"
            >
              <div className="text-6xl mb-4">🍒</div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-60 mb-3">
                you found the konami sequence
              </div>
              <div className="font-display text-4xl md:text-5xl italic leading-tight">
                "few notice the details. <br />
                <span className="text-cherry">you're not average.</span>"
              </div>
              <div className="mt-6 font-mono text-xs opacity-50">click anywhere to close</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -20, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
            animate={{ y: "110vh", rotate: p.r, opacity: 0 }}
            transition={{ duration: p.d, ease: "easeIn" }}
            className="absolute w-2 h-3"
            style={{ background: p.c }}
          />
        ))}
      </div>

      {/* tiny hint */}
      <div className="fixed bottom-6 left-6 z-[60] font-mono text-[10px] opacity-30 hidden md:block">
        psst... ↑↑↓↓←→←→ b a
      </div>
    </>
  );
}
