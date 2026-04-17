import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        setPct(100);
        clearInterval(t);
        setTimeout(() => setDone(true), 500);
      } else setPct(Math.floor(p));
    }, 110);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] bg-ink text-cream flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-6"
          >
            🍒
          </motion.div>
          <div className="font-display text-5xl md:text-7xl mb-2">Nikhil Mehra</div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-60 mb-8">
            booting the mystery...
          </div>
          <div className="w-64 h-1 bg-cream/15 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${pct}%` }}
              className="h-full bg-cherry"
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="mt-3 font-mono text-xs opacity-60">{pct}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
