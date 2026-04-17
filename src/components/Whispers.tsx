import { motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

const whispers = [
  { q: "are you okay?", a: "always. just busy becoming." },
  { q: "why no best friend?", a: "loyalty is rare. i don't gamble on people." },
  { q: "do you sleep?", a: "yes. between 3am ideas." },
  { q: "what's your plan B?", a: "there isn't one. plan A or nothing." },
  { q: "scared of failing?", a: "no. scared of being average. that's worse." },
  { q: "what do you want?", a: "to make my mom & dad never worry about money again." },
];

export default function Whispers() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 bg-skyish/40 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> whispers — tap to hear
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-4">
            questions people ask. <br />
            <span className="italic text-cherry">answers i don't usually give.</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-base md:text-lg opacity-70 mb-12 max-w-2xl">
            tap any line below — each one is a tiny souvenir from my head. take what hits, leave what doesn't.
          </p>
        </Reveal>

        <div className="space-y-3">
          {whispers.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setOpen(open === i ? null : i)}
              className="bg-cream rounded-2xl px-6 py-5 paper cursor-pointer overflow-hidden"
              data-cursor="hover"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                  <span className="font-display text-2xl md:text-3xl">"{w.q}"</span>
                </div>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-2xl text-cherry">+</motion.span>
              </div>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0.9, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-ink/10 font-display italic text-xl md:text-2xl text-cherry">
                  → {w.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
