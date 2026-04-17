import { motion } from "framer-motion";
import Reveal from "./Reveal";

const skills = [
  { name: "HTML", level: 92, color: "bg-cherry", note: "structure poetry" },
  { name: "CSS", level: 88, color: "bg-pinkish", note: "make it dance" },
  { name: "Java", level: 70, color: "bg-lemon", note: "OOP brain" },
  { name: "Python", level: 45, color: "bg-skyish", note: "still learning" },
  { name: "n8n", level: 30, color: "bg-cherry/70", note: "automating life" },
  { name: "Game Dev", level: 25, color: "bg-ink text-cream", note: "in progress" },
];

const stack = ["HTML5", "CSS3", "Java", "Python", "n8n", "Vite", "Node", "Git", "Tailwind", "Figma", "Unity (soon)", "Blender (curious)"];

export default function Skills() {
  return (
    <section className="relative py-28 px-6 bg-ink text-cream overflow-hidden">
      {/* paper-cut top edge */}
      <svg className="absolute -top-[1px] left-0 w-full h-10" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path d="M0,40 L0,20 C150,0 300,40 450,20 C600,0 750,40 900,20 C1050,0 1200,40 1200,20 L1200,40 Z" fill="#fdf8f3" />
      </svg>
      <svg className="absolute -bottom-[1px] left-0 w-full h-10 rotate-180" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path d="M0,40 L0,20 C150,0 300,40 450,20 C600,0 750,40 900,20 C1050,0 1200,40 1200,20 L1200,40 Z" fill="#fdf8f3" />
      </svg>

      <div className="max-w-7xl mx-auto pt-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-cream" /> 02 — Toolkit
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl">
            Small toolkit. <span className="italic text-pinkish">Sharp edges.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-display text-3xl">{s.name}</div>
                  <div className="text-xs font-mono opacity-60">{s.note} · {s.level}%</div>
                </div>
                <div className="h-2 w-full bg-cream/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.2, 0.85, 0.2, 1], delay: 0.1 + i * 0.05 }}
                    className={`h-full ${s.color} rounded-full`}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stack chips */}
        <div className="mt-16 flex flex-wrap gap-2">
          {stack.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.6 }}
              whileHover={{ y: -4, backgroundColor: "#d23652", color: "#fdf8f3" }}
              className="border border-cream/20 rounded-full px-4 py-1.5 text-sm font-mono"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
