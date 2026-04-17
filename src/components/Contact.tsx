import { motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

const handles = [
  {
    label: "Telegram",
    user: "@NikhilHuBetaa",
    href: "https://t.me/NikhilHuBetaa",
    bg: "bg-skyish",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M9.04 15.27 8.86 19.1c.39 0 .56-.17.76-.37l1.83-1.74 3.79 2.78c.7.39 1.2.18 1.39-.64l2.52-11.83h.01c.22-1.02-.37-1.42-1.05-1.17L3.4 10.5c-1 .39-.99.95-.17 1.2l3.85 1.2 8.93-5.63c.42-.27.8-.12.49.16z"/></svg>
    ),
  },
  {
    label: "Instagram",
    user: "@enzo_x590",
    href: "https://www.instagram.com/enzo_x590",
    bg: "bg-pinkish",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
    ),
  },
  {
    label: "Discord",
    user: "nikhilhubhiyaa",
    href: "https://discord.com/users/nikhilhubhiyaa",
    bg: "bg-lemon",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M19.27 5.33A17.7 17.7 0 0 0 14.9 4l-.2.42a16 16 0 0 1 4.07 1.27 14.9 14.9 0 0 0-13.54 0A16 16 0 0 1 9.3 4.42L9.1 4a17.7 17.7 0 0 0-4.37 1.33C2.07 9.32 1.34 13.2 1.7 17.04a17.83 17.83 0 0 0 5.43 2.74l.43-.6a11.7 11.7 0 0 1-1.95-.94l.48-.34a12.7 12.7 0 0 0 11.82 0l.48.34c-.6.36-1.26.68-1.95.94l.43.6a17.83 17.83 0 0 0 5.43-2.74c.42-4.43-.71-8.27-3.03-11.71ZM8.52 14.74c-1 0-1.83-.95-1.83-2.13s.81-2.14 1.83-2.14c1.03 0 1.86.96 1.84 2.14 0 1.18-.81 2.13-1.84 2.13Zm6.96 0c-1 0-1.83-.95-1.83-2.13s.81-2.14 1.83-2.14c1.03 0 1.86.96 1.84 2.14 0 1.18-.81 2.13-1.84 2.13Z"/></svg>
    ),
  },
];

// Simple aesthetic QR-like glyph (decorative)
function QRGlyph() {
  const cells = Array.from({ length: 21 * 21 });
  // pseudo-random fixed pattern
  const filled = (i: number) => {
    const r = Math.floor(i / 21);
    const c = i % 21;
    // corner squares
    const corner = (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
    if (corner) {
      const inCorner =
        (r < 7 && c < 7 && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4))) ||
        (r < 7 && c > 13 && (r === 0 || r === 6 || c === 14 || c === 20 || (r >= 2 && r <= 4 && c >= 16 && c <= 18))) ||
        (r > 13 && c < 7 && (r === 14 || r === 20 || c === 0 || c === 6 || (r >= 16 && r <= 18 && c >= 2 && c <= 4)));
      return inCorner;
    }
    // pseudo data
    return ((r * 31 + c * 17 + ((r * c) % 7)) % 3) === 0;
  };
  return (
    <div className="grid grid-cols-21 gap-[2px] p-3 bg-cream rounded-2xl" style={{ gridTemplateColumns: "repeat(21, 1fr)" }}>
      {cells.map((_, i) => (
        <div
          key={i}
          className={filled(i) ? "bg-ink rounded-[2px]" : "bg-transparent"}
          style={{ width: 10, height: 10 }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const [revealed, setRevealed] = useState(false);
  // Real digits hidden — show xx unless guessed
  // The user said "guess two numbers" — easter egg
  const phoneVisible = "+91 935 1517 1xx";

  return (
    <section id="contact" className="relative py-32 px-6 bg-ink text-cream overflow-hidden">
      <svg className="absolute -top-[1px] left-0 w-full h-10" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path d="M0,40 L0,15 C100,35 220,0 360,18 C500,36 640,2 800,20 C960,38 1080,4 1200,18 L1200,40 Z" fill="#fdf8f3" />
      </svg>

      <div className="max-w-7xl mx-auto pt-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-cream" /> 05 — Reach the mystery
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-6xl md:text-[8rem] leading-[0.86]">
            slide into <br />
            <span className="italic text-pinkish">my dms.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            {handles.map((h, i) => (
              <motion.a
                key={h.label}
                href={h.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ x: 10 }}
                className={`group flex items-center justify-between gap-6 ${h.bg} text-ink rounded-2xl px-6 py-5 paper`}
                data-cursor="hover"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-ink text-cream flex items-center justify-center">
                    {h.icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase opacity-60 tracking-widest">{h.label}</div>
                    <div className="font-display text-3xl">{h.user}</div>
                  </div>
                </div>
                <motion.div whileHover={{ rotate: 45 }} className="w-10 h-10 rounded-full border border-ink/30 flex items-center justify-center">↗</motion.div>
              </motion.a>
            ))}

            {/* Phone game */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-cream text-ink rounded-2xl p-6 paper"
            >
              <div className="text-xs font-mono uppercase opacity-60 tracking-widest">Phone — guess the last 2 digits</div>
              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <div className="font-display text-4xl tracking-wider">{phoneVisible}</div>
                <button
                  onClick={() => setRevealed((r) => !r)}
                  className="ml-auto text-xs font-mono bg-ink text-cream rounded-full px-4 py-2 hover:bg-cherry transition-colors"
                >
                  {revealed ? "hide hint" : "give me a hint"}
                </button>
              </div>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm opacity-70 font-mono"
                >
                  hint: serious people don't need a phone. dm on telegram instead. 😉
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* QR card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="qr-card rounded-3xl p-6 text-ink"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono uppercase opacity-60 tracking-widest">scan me</div>
                  <div className="font-display text-2xl">@enzo_x590</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-cherry text-cream flex items-center justify-center">IG</div>
              </div>
              <a href="https://www.instagram.com/enzo_x590" target="_blank" rel="noreferrer" className="block">
                <QRGlyph />
              </a>
              <div className="mt-4 text-xs font-mono opacity-60 text-center">
                point camera → meet the mystery
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
