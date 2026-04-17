import { motion } from "framer-motion";
import Reveal from "./Reveal";

const quotes = [
  {
    big: "If you wanna be my friend — I'm the best friend you've ever seen. If you wanna be my enemy — I'm good at that too.",
    small: "rule #01",
    style: "bg-cream text-ink",
  },
  {
    big: "Don't be average when you have potential to become the best in your bloodline.",
    small: "rule #02",
    style: "bg-cherry text-cream",
  },
  {
    big: "Don't focus on girls at a young age. They're a distraction with a soft voice.",
    small: "rule #03",
    style: "bg-lemon text-ink",
  },
  {
    big: "I want to become a mystery for everyone who meets me — and force them to wonder who's behind that face.",
    small: "rule #04",
    style: "bg-pinkish text-ink",
  },
  {
    big: "I never said you deserve better. Because I've never seen anyone better than me.",
    small: "rule #05",
    style: "bg-ink text-cream",
  },
  {
    big: "Enjoy my temporary downfall. Once I come back — you'll never smile again.",
    small: "for the enemies",
    style: "bg-skyish text-ink",
  },
];

export default function Mind() {
  return (
    <section id="mind" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> 04 — The mind, unfiltered
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl">
            Notes I tell myself <span className="italic text-cherry">in the mirror.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.2, 0.85, 0.2, 1] }}
              whileHover={{ y: -8, rotate: i % 2 ? -1.5 : 1.5 }}
              className={`sticker rounded-3xl p-7 md:p-8 ${q.style} min-h-[280px] flex flex-col justify-between paper`}
            >
              <div className="text-xs font-mono uppercase opacity-70 tracking-widest">{q.small}</div>
              <p className="font-display text-2xl md:text-[26px] leading-tight">"{q.big}"</p>
            </motion.div>
          ))}
        </div>

        {/* Big highlight banner */}
        <Reveal delay={0.2}>
          <div className="mt-16 relative overflow-hidden rounded-[2rem] border border-black/10 paper px-8 py-14 md:py-20">
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-pinkish blob opacity-80" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-skyish blob opacity-80" />
            <p className="relative font-display text-4xl md:text-6xl leading-[0.95] text-center">
              No one can love you more than your <span className="italic text-cherry">Mom & Dad.</span>
              <br />
              Everything else is just <span className="line-through opacity-50">noise</span> data.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
