import { motion } from "framer-motion";
import Reveal from "./Reveal";

const projects = [
  {
    n: "01",
    title: "Vibe Coded Portfolios",
    tag: "personal · web",
    desc: "Tiny experiments where layout, motion and color collide. Built at 2 AM, deleted by sunrise.",
    bg: "bg-pinkish",
    accent: "text-cherry",
  },
  {
    n: "02",
    title: "Game Dev — In Progress",
    tag: "learning · play",
    desc: "Currently figuring out loops, collisions and why my character keeps walking through walls.",
    bg: "bg-lemon",
    accent: "text-ink",
  },
  {
    n: "03",
    title: "n8n Automations",
    tag: "workflow · curious",
    desc: "Building tiny automations to remove humans from the boring parts of life. Including mine.",
    bg: "bg-skyish",
    accent: "text-cherry-deep",
  },
  {
    n: "04",
    title: "MoodOS — concept",
    tag: "future · ui",
    desc: "An OS theme that changes based on the music you're playing. Half daydream, half blueprint.",
    bg: "bg-cherry",
    accent: "text-cream",
  },
];

export default function Work() {
  return (
    <section id="work" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> 03 — Selected experiments
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl">
            Things I made <span className="italic text-cherry">when no one was watching.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: [0.2, 0.85, 0.2, 1] }}
              whileHover={{ y: -10 }}
              className={`group relative ${p.bg} rounded-3xl p-8 md:p-10 overflow-hidden min-h-[340px] flex flex-col justify-between cursor-pointer`}
              data-cursor="hover"
            >
              <div className="flex items-start justify-between">
                <div className={`font-mono text-sm ${p.accent} opacity-80`}>{p.n} · {p.tag}</div>
                <motion.div
                  whileHover={{ rotate: 45 }}
                  className={`w-10 h-10 rounded-full border ${p.accent === "text-cream" ? "border-cream/40 text-cream" : "border-ink/30"} flex items-center justify-center transition-transform`}
                >
                  ↗
                </motion.div>
              </div>

              <div>
                <h3 className={`font-display text-4xl md:text-5xl leading-[0.95] ${p.accent}`}>
                  {p.title}
                </h3>
                <p className={`mt-4 max-w-md ${p.accent === "text-cream" ? "text-cream/85" : "text-ink/75"}`}>
                  {p.desc}
                </p>
              </div>

              {/* liquid hover layer */}
              <motion.div
                initial={{ y: "100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.6, ease: [0.2, 0.85, 0.2, 1] }}
                className="absolute inset-0 bg-ink text-cream p-8 md:p-10 flex flex-col justify-end pointer-events-none"
                style={{ borderRadius: "1.5rem" }}
              >
                <div className="text-xs font-mono opacity-60">// hover</div>
                <div className="font-display text-3xl mt-1">More soon →</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
