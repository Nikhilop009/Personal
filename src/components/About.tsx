import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const facts = [
  { k: "Based in", v: "Kota, Rajasthan 🇮🇳" },
  { k: "Type", v: "Introvert. Builder. Observer." },
  { k: "Stack", v: "HTML · CSS · Java" },
  { k: "Learning", v: "Python · n8n · Game Dev" },
  { k: "Free time", v: "Vibe coding · Games (mood-based)" },
  { k: "Mission", v: "Millionaire by 19 — non-negotiable" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> 01 — Who is this guy
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
                I treat <span className="italic text-cherry">code</span> like a
                language only the patient can speak — and I'm patient enough
                to whisper at it until it answers.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg md:text-xl leading-relaxed max-w-2xl opacity-80">
                People are tools. Mom & Dad are everything. That's the whole worldview. I don't make friends for emotions — I build, I learn, I observe, and one day I'll vanish from the small talk and reappear as the answer.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="paper rounded-3xl p-6 md:p-8 border border-black/5">
                <div className="text-xs font-mono uppercase opacity-60 mb-3">// the loop</div>
                <p className="font-display text-3xl md:text-4xl italic leading-tight">
                  "I win. I could win. I would win. I have to win. I win — definitely."
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {facts.map((f, i) => (
                  <motion.div
                    key={f.k}
                    whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="paper rounded-2xl p-4 border border-black/5"
                  >
                    <div className="text-[10px] font-mono uppercase opacity-50 tracking-widest">{f.k}</div>
                    <div className="font-display text-xl mt-1 leading-tight">{f.v}</div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Horizontal moving tape */}
      <motion.div
        style={{ x }}
        className="mt-24 font-display text-[18vw] leading-none whitespace-nowrap text-ink/90"
      >
        introvert · builder · observer · introvert · builder · observer ·
      </motion.div>
    </section>
  );
}
