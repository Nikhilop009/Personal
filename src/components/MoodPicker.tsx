import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

const moods = [
  { id: "lost",  emoji: "🌫️", label: "lost",  color: "bg-skyish",  text: "text-ink",   accent: "bg-ink",     quote: "you're not lost. you're early. keep walking." },
  { id: "angry", emoji: "🔥", label: "angry", color: "bg-cherry",  text: "text-cream", accent: "bg-cream",   quote: "good. weaponize it. build something they can't ignore." },
  { id: "lazy",  emoji: "🛌", label: "lazy",  color: "bg-pinkish", text: "text-ink",   accent: "bg-ink",     quote: "5 minutes. one task. start small. momentum is a drug." },
  { id: "broke", emoji: "🪙", label: "broke", color: "bg-lemon",   text: "text-ink",   accent: "bg-ink",     quote: "broke is temporary. average is permanent if you choose it." },
  { id: "alone", emoji: "🌙", label: "alone", color: "bg-cream",   text: "text-ink",   accent: "bg-cherry",  quote: "alone ≠ lonely. that silence is where you cook." },
  { id: "hyped", emoji: "⚡", label: "hyped", color: "bg-cherry",  text: "text-cream", accent: "bg-lemon",   quote: "ride it. sleep less. ship more. tomorrow you'll thank you." },
];

export default function MoodPicker() {
  const [pick, setPick] = useState<typeof moods[number] | null>(null);

  return (
    <section className="relative py-32 px-6 bg-cream overflow-hidden">
      {/* bg blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pinkish/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-lemon/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> diagnostic — what's the vibe?
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-4">
            how are you feeling <span className="italic text-cherry">right now?</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-base md:text-lg opacity-70 mb-12 max-w-xl">
            tap a mood. nikhil prescribes a quote. no judgement, just truth.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {moods.map((m, i) => {
            const active = pick?.id === m.id;
            return (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 120, damping: 16 }}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? -4 : 4, scale: 1.04 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setPick(m)}
                className={`group relative ${m.color} ${m.text} aspect-square rounded-[28px] paper flex flex-col items-center justify-center gap-2 border-[3px] ${active ? "border-ink shadow-2xl" : "border-transparent"} transition-shadow`}
                data-cursor="hover"
              >
                {/* sticker corner pill */}
                <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${m.accent} ${m.text === "text-cream" || m.accent === "bg-ink" || m.accent === "bg-cherry" ? "text-cream" : "text-ink"} text-[10px] font-mono flex items-center justify-center font-bold border-2 border-cream`}>
                  0{i + 1}
                </span>
                {/* big emoji */}
                <motion.span
                  className="text-5xl drop-shadow-sm"
                  animate={active ? { rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.7 }}
                >
                  {m.emoji}
                </motion.span>
                {/* label — bold, mono, very visible */}
                <span className="font-mono uppercase text-sm tracking-[0.2em] font-bold">
                  {m.label}
                </span>
                {/* hover underline */}
                <span className={`absolute bottom-3 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-8 transition-all ${m.accent}`} />
                {/* tap hint */}
                {!active && (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-mono uppercase tracking-[0.3em] opacity-0 group-hover:opacity-70 transition-opacity bg-ink text-cream px-2 py-0.5 rounded-full whitespace-nowrap">
                    tap me
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* === RX PRESCRIPTION CARD === */}
        <AnimatePresence mode="wait">
          {pick ? (
            <motion.div
              key={pick.id}
              initial={{ opacity: 0, y: 40, scale: 0.94, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
              className="relative"
              style={{ perspective: 1200 }}
            >
              {/* shadow plate */}
              <div className="absolute inset-x-6 -bottom-4 h-8 bg-ink/20 blur-2xl rounded-full" />

              <div className="relative bg-cream border-[3px] border-ink rounded-[28px] overflow-hidden paper">
                {/* prescription header */}
                <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b-2 border-dashed border-ink/30 bg-cream">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cherry text-cream flex items-center justify-center font-display text-xl">
                      Rx
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
                        prescription · for the {pick.label}
                      </div>
                      <div className="font-display text-xl leading-none">dr. nikhil mehra</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl">{pick.emoji}</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 mt-1">
                      mood: {pick.label}
                    </div>
                  </div>
                </div>

                {/* the quote */}
                <div className="relative px-6 md:px-12 py-10 md:py-14 bg-ink text-cream overflow-hidden">
                  <div className="absolute -top-10 -right-10 text-[220px] opacity-10 select-none">
                    {pick.emoji}
                  </div>
                  <div className="absolute top-4 left-4 text-cherry text-5xl font-display leading-none">
                    "
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="font-display text-3xl md:text-5xl italic leading-[1.15] max-w-3xl pl-6"
                  >
                    {pick.quote}
                  </motion.div>
                  <div className="absolute bottom-4 right-6 text-cherry text-5xl font-display leading-none">
                    "
                  </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-between px-6 md:px-10 py-4 bg-cream border-t-2 border-dashed border-ink/30">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                    take 1 deep breath. repeat as needed.
                  </div>
                  <button
                    onClick={() => setPick(null)}
                    className="text-[10px] font-mono uppercase tracking-[0.25em] bg-ink text-cream px-3 py-1.5 rounded-full hover:bg-cherry transition-colors"
                    data-cursor="hover"
                  >
                    new mood ↻
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-2 border-dashed border-ink/20 rounded-[28px] py-14 text-center"
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-50">
                ☝ pick a mood above to get your prescription
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
