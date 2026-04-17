import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const commands = [
  { label: "Open Telegram", action: "https://t.me/NikhilHuBetaa", icon: "📨", hint: "dm me" },
  { label: "Open Instagram", action: "https://www.instagram.com/enzo_x590", icon: "📸", hint: "follow" },
  { label: "Discord — nikhilhubhiyaa", action: "copy:nikhilhubhiyaa", icon: "🎮", hint: "copy username" },
  { label: "Scroll to Skills", action: "scroll:#skills", icon: "⚡", hint: "section" },
  { label: "Scroll to Work", action: "scroll:#work", icon: "🛠️", hint: "section" },
  { label: "Scroll to Contact", action: "scroll:#contact", icon: "💌", hint: "section" },
  { label: "Toss me a coin", action: "coin", icon: "🪙", hint: "luck" },
  { label: "Random quote", action: "quote", icon: "💭", hint: "wisdom" },
];

const quotes = [
  "I win, I would win, I have to win. definitely.",
  "don't be average when you have potential.",
  "people are tools. mom & dad aren't.",
  "enjoying my temporary downfall.",
  "be the mystery.",
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showToast = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(""), 1800);
  };

  const run = (action: string) => {
    if (action.startsWith("http")) window.open(action, "_blank");
    else if (action.startsWith("copy:")) {
      navigator.clipboard?.writeText(action.slice(5));
      showToast("copied to clipboard ✓");
    } else if (action.startsWith("scroll:")) {
      document.querySelector(action.slice(7))?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "coin") {
      showToast(Math.random() > 0.5 ? "heads — message me 👑" : "tails — message me anyway 🌚");
    } else if (action === "quote") {
      showToast(quotes[Math.floor(Math.random() * quotes.length)]);
    }
    setOpen(false);
    setQ("");
  };

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      {/* floating trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] bg-ink text-cream rounded-full px-4 py-3 font-mono text-xs flex items-center gap-2 hover:bg-cherry transition-colors shadow-lg"
        data-cursor="hover"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cherry animate-pulse" />
        ⌘K · open palette
      </button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[70] bg-ink text-cream font-mono text-sm px-5 py-3 rounded-full shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          >
            <motion.div
              initial={{ y: -30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -30, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-cream rounded-2xl overflow-hidden shadow-2xl paper"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-ink/10">
                <span className="text-cherry">⌘</span>
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="type a command, jump anywhere..."
                  className="flex-1 bg-transparent outline-none font-mono text-sm"
                />
                <span className="text-[10px] font-mono opacity-50">ESC</span>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <div className="p-6 text-center text-sm opacity-60 font-mono">
                    no command, but the mystery remains.
                  </div>
                )}
                {filtered.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => run(c.action)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pinkish/40 text-left transition-colors"
                    data-cursor="hover"
                  >
                    <span className="text-xl">{c.icon}</span>
                    <span className="flex-1 font-medium">{c.label}</span>
                    <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">{c.hint}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
