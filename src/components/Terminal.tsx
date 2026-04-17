import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

type Line = { type: "in" | "out" | "sys"; text: string };

const responses: Record<string, string | string[]> = {
  help: [
    "available: whoami, stack, dream, age, friends, girls, advice, contact, joke, clear",
  ],
  whoami: "nikhil mehra. kota, rajasthan. introvert. builder. mystery in progress.",
  stack: "html · css · java · python (learning) · n8n (learning) · vibe coding 24/7",
  dream: "millionaire by 19. nothing is impossible. i win definitely.",
  age: "doesn't matter. mindset > number.",
  friends: "0 best friends. people are tools. mom & dad are everything.",
  girls: "distraction. focus on bag first. love later.",
  advice: "don't be average when you have potential to become best in your bloodline.",
  contact: "telegram: @NikhilHuBetaa · ig: @enzo_x590 · discord: nikhilhubhiyaa",
  joke: "why did the introvert go viral? he didn't. that's the joke.",
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "sys", text: "nikhil-os v1.0 — type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const handle = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    if (!c) return;
    const newLines: Line[] = [...lines, { type: "in", text: cmd }];
    if (c === "clear") {
      setLines([{ type: "sys", text: "cleared." }]);
      return;
    }
    const r = responses[c];
    if (r) {
      const arr = Array.isArray(r) ? r : [r];
      arr.forEach((t) => newLines.push({ type: "out", text: t }));
    } else {
      newLines.push({ type: "out", text: `command not found: ${cmd}. try 'help'.` });
    }
    setLines(newLines);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    handle(input);
    setInput("");
  };

  return (
    <section className="relative py-32 px-6 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> talk to nikhil-os
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-10">
            ask the <span className="italic text-cherry">machine.</span>
          </h2>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-ink text-cream rounded-2xl overflow-hidden paper"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-cream/10">
            <span className="w-3 h-3 rounded-full bg-cherry" />
            <span className="w-3 h-3 rounded-full bg-lemon" />
            <span className="w-3 h-3 rounded-full bg-skyish" />
            <span className="ml-3 font-mono text-xs opacity-60">nikhil@kota:~$</span>
          </div>
          <div ref={scrollRef} className="p-5 font-mono text-sm h-80 overflow-y-auto leading-relaxed">
            {lines.map((l, i) => (
              <div key={i} className={l.type === "in" ? "text-pinkish" : l.type === "sys" ? "text-skyish" : "text-cream"}>
                {l.type === "in" && <span className="text-cherry">$ </span>}
                {l.text}
              </div>
            ))}
            <form onSubmit={submit} className="flex items-center gap-2 mt-2">
              <span className="text-cherry">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-cream caret-cherry"
                placeholder="type a command..."
                autoFocus={false}
              />
            </form>
          </div>
        </motion.div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["whoami", "stack", "dream", "advice", "contact", "joke"].map((s) => (
            <button
              key={s}
              onClick={() => handle(s)}
              className="text-xs font-mono px-3 py-1.5 rounded-full border border-ink/20 hover:bg-ink hover:text-cream transition-colors"
              data-cursor="hover"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
