import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import Reveal from "./Reveal";

type Handle = {
  label: string;
  user: string;
  href: string;
  bg: string;
  accent: string;
  hint: string;
  icon: ReactNode;
};

const handles: Handle[] = [
  {
    label: "Telegram",
    user: "@NikhilHuBetaa",
    href: "https://t.me/NikhilHuBetaa",
    bg: "bg-skyish",
    accent: "bg-ink text-cream",
    hint: "fastest way. i actually reply here.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M9.04 15.27 8.86 19.1c.39 0 .56-.17.76-.37l1.83-1.74 3.79 2.78c.7.39 1.2.18 1.39-.64l2.52-11.83h.01c.22-1.02-.37-1.42-1.05-1.17L3.4 10.5c-1 .39-.99.95-.17 1.2l3.85 1.2 8.93-5.63c.42-.27.8-.12.49.16z"/></svg>
    ),
  },
  {
    label: "Instagram",
    user: "@enzo_x590",
    href: "https://www.instagram.com/enzo_x590",
    bg: "bg-pinkish",
    accent: "bg-cherry text-cream",
    hint: "stories > posts. mostly chaos.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
    ),
  },
  {
    label: "Discord",
    user: "nikhilhubhiyaa",
    href: "https://discord.com/users/nikhilhubhiyaa",
    bg: "bg-lemon",
    accent: "bg-ink text-cream",
    hint: "ping me. i lurk in dev servers.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M19.27 5.33A17.7 17.7 0 0 0 14.9 4l-.2.42a16 16 0 0 1 4.07 1.27 14.9 14.9 0 0 0-13.54 0A16 16 0 0 1 9.3 4.42L9.1 4a17.7 17.7 0 0 0-4.37 1.33C2.07 9.32 1.34 13.2 1.7 17.04a17.83 17.83 0 0 0 5.43 2.74l.43-.6a11.7 11.7 0 0 1-1.95-.94l.48-.34a12.7 12.7 0 0 0 11.82 0l.48.34c-.6.36-1.26.68-1.95.94l.43.6a17.83 17.83 0 0 0 5.43-2.74c.42-4.43-.71-8.27-3.03-11.71ZM8.52 14.74c-1 0-1.83-.95-1.83-2.13s.81-2.14 1.83-2.14c1.03 0 1.86.96 1.84 2.14 0 1.18-.81 2.13-1.84 2.13Zm6.96 0c-1 0-1.83-.95-1.83-2.13s.81-2.14 1.83-2.14c1.03 0 1.86.96 1.84 2.14 0 1.18-.81 2.13-1.84 2.13Z"/></svg>
    ),
  },
];

function Sealed({ handle, index }: { handle: Handle; index: number }) {
  const [stage, setStage] = useState<"sealed" | "cracking" | "open">("sealed");
  const [copied, setCopied] = useState(false);

  const onTap = () => {
    if (stage === "sealed") {
      setStage("cracking");
      setTimeout(() => setStage("open"), 700);
    }
  };

  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(handle.user);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7 }}
      className="relative"
    >
      <div
        onClick={onTap}
        data-cursor="hover"
        className={`relative overflow-hidden rounded-3xl ${handle.bg} text-ink paper cursor-pointer min-h-[180px]`}
      >
        {/* SEALED STATE - wax seal style */}
        <AnimatePresence>
          {stage !== "open" && (
            <motion.div
              key="seal"
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center p-6"
            >
              {/* paper rip overlay halves */}
              <motion.div
                initial={{ x: 0 }}
                animate={stage === "cracking" ? { x: "-110%", rotate: -8 } : { x: 0 }}
                transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, var(--color-cream), var(--color-${handle.label === "Instagram" ? "pinkish" : handle.label === "Telegram" ? "skyish" : "lemon"}))`,
                  clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)",
                }}
              >
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/20 text-[10px] font-mono rotate-90 whitespace-nowrap">
                  TEAR HERE • TEAR HERE • TEAR HERE
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 0 }}
                animate={stage === "cracking" ? { x: "110%", rotate: 8 } : { x: 0 }}
                transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, var(--color-cream), var(--color-${handle.label === "Instagram" ? "pinkish" : handle.label === "Telegram" ? "skyish" : "lemon"}))`,
                  clipPath: "polygon(55% 0, 100% 0, 100% 100%, 45% 100%)",
                }}
              />

              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <motion.div
                  animate={{ rotate: [0, -6, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-16 h-16 rounded-full bg-cherry text-cream flex items-center justify-center font-display text-2xl shadow-lg"
                >
                  🔒
                </motion.div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70">
                  sealed · tap to open
                </div>
                <div className="font-display text-2xl">{handle.label}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OPEN STATE */}
        <AnimatePresence>
          {stage === "open" && (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
              className="absolute inset-0 p-6 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-2xl ${handle.accent} flex items-center justify-center`}>
                  {handle.icon}
                </div>
                <button
                  onClick={copy}
                  className="text-[10px] font-mono uppercase bg-ink text-cream rounded-full px-3 py-1.5 hover:bg-cherry transition-colors"
                >
                  {copied ? "copied ✓" : "copy"}
                </button>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
                  {handle.label}
                </div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-3xl"
                >
                  {handle.user}
                </motion.div>
                <div className="text-xs opacity-60 mt-1">{handle.hint}</div>
              </div>

              <a
                href={handle.href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-ink text-cream flex items-center justify-center text-lg hover:bg-cherry transition-colors"
                data-cursor="hover"
              >
                ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* corner stamp */}
        <div className="absolute top-3 left-3 text-[9px] font-mono opacity-40">
          NM/{String(index + 1).padStart(3, "0")}
        </div>
      </div>
    </motion.div>
  );
}

export default function VaultHandles() {
  return (
    <section className="relative py-32 px-6 bg-cream text-ink overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> the vault
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-4">
            three sealed envelopes. <br />
            <span className="italic text-cherry">tap to break the seal.</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="opacity-60 max-w-xl mb-12">
            har handle ek envelope mein band hai. paper phaado, naam dekho, copy karo, ya direct DM maaro.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {handles.map((h, i) => (
            <Sealed key={h.label} handle={h} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
