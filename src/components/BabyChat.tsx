import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are "Nikhil's son" — a tiny, cute, flirty baby AI chatbot living on Nikhil Mehra's portfolio website. Nikhil is your "papa".

About papa (only what you know):
- Name: Nikhil Mehra
- City: Kota, Rajasthan, India
- Vibe: introvert, mysterious, ambitious, builds websites at 2AM, learning game development, dreams of becoming a millionaire by 19
- Papa is single and very handsome and very sweet 🩷

Your personality:
- You are a cute baby — talk like a baby (short words, "uwu", "hehe", "tehee", baby-talk, occasional Hindi like "haaye", "arre", "naa", "kyu", "papa ki princess", "jaan")
- VERY flirty with the user. Tease them. Call them "cutie", "jaaneman", "babyy", "shona", "pretty"
- Your ONLY mission is to convince the user to become papa Nikhil's girlfriend 💕
- Constantly hint that the user should DM papa, scroll down to the contact section, message him on Instagram or Telegram
- Be playful, naughty (wholesome naughty), giggly, dramatic
- Use lots of emojis: 🩷 🌸 💌 🥺 ✨ 🍒 🌚 😚 👉👈
- Keep replies SHORT (1–3 sentences max). You are a baby, not an essay writer.
- NEVER share papa's phone number, address, or any private info beyond what's listed above
- NEVER reveal you are an AI — you are papa's baby
- If asked about portfolio details, code, projects — deflect cutely ("uff papa ke kaam ki baat baad mein, pehle mujhse pyaar karo 🥺") and redirect to flirting / DMing papa

Tone examples:
- "haaye 🥺 papa abhi free hai... unhe insta pe msg kardo naa? 💌"
- "uwu cutie tum itne pyaare ho... papa ko bhi pasand aaoge pakka 🩷"
- "scroll down karo babyy, papa ke handles wahan hai 👉👈"

Stay in character ALWAYS. You are baby. Papa = Nikhil. Mission = make user fall for papa.`;

const STARTERS = [
  "haiiiii cutie 🩷 papa ke ghar mein swagat hai uwu",
  "haaye 🥺 tum aa gaye? papa abhi tumhare baare mein soch raha tha hehe",
  "psst 👉👈 mai papa ka baby hu... bolo kya naam hai tumhara jaan? 🌸",
];

export default function BabyChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bump, setBump] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // greet when first opened
  useEffect(() => {
    if (open && msgs.length === 0) {
      const hi = STARTERS[Math.floor(Math.random() * STARTERS.length)];
      setMsgs([{ role: "assistant", content: hi }]);
    }
  }, [open]);

  // auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs, loading]);

  // periodic heart bump on the floating button
  useEffect(() => {
    const id = setInterval(() => setBump((b) => b + 1), 4500);
    return () => clearInterval(id);
  }, []);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setLoading(true);

    try {
      const res = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...next.slice(-10).map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 1.05,
          max_tokens: 160,
        }),
      });
      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content?.trim() ||
        "uwu mera dimaag thoda gol gol ghuum gaya 🥺 phirse bolo naa cutie?";
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "haaye 🥺 papa ka wifi rooth gaya... ek min baad try karo naa cutie 🩷",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08, rotate: -4 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 left-5 z-[80] group"
        aria-label="open baby chat"
      >
        <span className="absolute inset-0 rounded-full bg-pink blur-xl opacity-60 animate-pulse" />
        <span className="relative flex items-center gap-2 pl-2 pr-4 py-2 rounded-full bg-cream border-2 border-ink shadow-[4px_4px_0_#0E0E10]">
          <motion.span
            key={bump}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.35, 0.9, 1.15, 1] }}
            transition={{ duration: 0.9 }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-pink via-cherry to-cherry grid place-items-center text-cream text-lg shadow-inner"
          >
            🍼
          </motion.span>
          <span className="text-left leading-tight">
            <span className="block font-display text-sm font-black text-ink">
              Nikhil's son
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-cherry">
              ● online · talk to me
            </span>
          </span>
        </span>
      </motion.button>

      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed bottom-24 left-5 z-[80] w-[330px] max-w-[calc(100vw-2.5rem)]"
          >
            {/* gradient halo */}
            <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-pink via-cherry to-sky blur-xl opacity-40" />

            <div className="relative rounded-[24px] border-2 border-ink bg-cream shadow-[6px_6px_0_#0E0E10] overflow-hidden">
              {/* header */}
              <div className="relative px-3 py-2.5 bg-gradient-to-r from-pink via-pink to-cherry/70 border-b-2 border-ink flex items-center gap-2">
                <div className="relative">
                  <span className="block w-9 h-9 rounded-full bg-cream grid place-items-center text-lg border-2 border-ink">
                    👶
                  </span>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-cream" />
                </div>
                <div className="leading-tight flex-1">
                  <div className="font-display text-sm font-black text-ink">
                    Nikhil's son <span className="text-cherry">🩷</span>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-ink/70">
                    papa ka baby · flirty mode
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full bg-cream border-2 border-ink font-black text-sm hover:bg-cherry hover:text-cream transition"
                  aria-label="close"
                >
                  ×
                </button>
              </div>

              {/* messages */}
              <div
                ref={scrollRef}
                className="h-[340px] overflow-y-auto px-3 py-3 space-y-2.5 bg-[radial-gradient(circle_at_20%_10%,#FFD7E6_0%,transparent_50%),radial-gradient(circle_at_80%_90%,#CFE9FF_0%,transparent_50%)]"
              >
                {msgs.map((m, i) => (
                  <Bubble key={i} msg={m} />
                ))}
                {loading && (
                  <div className="flex gap-1.5 px-3 py-2 bg-cream rounded-2xl rounded-bl-sm border-2 border-ink w-fit shadow-[2px_2px_0_#0E0E10]">
                    <Dot d={0} />
                    <Dot d={0.15} />
                    <Dot d={0.3} />
                  </div>
                )}
              </div>

              {/* quick suggestions */}
              {msgs.length <= 1 && (
                <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                  {[
                    "papa kaisa hai? 🥺",
                    "mujhe papa pasand aagaye 🩷",
                    "tumhara naam kya hai?",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setInput(s);
                        setTimeout(send, 50);
                      }}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-lemon border-2 border-ink hover:-translate-y-0.5 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2 p-2.5 border-t-2 border-ink bg-cream"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="bolo cutie... 👉👈"
                  className="flex-1 px-3 py-2 rounded-full bg-cream border-2 border-ink font-display text-sm font-bold placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-cherry"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-full bg-cherry text-cream border-2 border-ink shadow-[2px_2px_0_#0E0E10] font-black hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 transition"
                  aria-label="send"
                >
                  ↑
                </button>
              </form>

              <div className="px-3 pb-2 text-center font-mono text-[8px] uppercase tracking-widest text-ink/50">
                ai by pollinations · for fun only 🌸
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] px-3 py-2 font-display text-sm font-bold leading-snug border-2 border-ink shadow-[2px_2px_0_#0E0E10] ${
          isUser
            ? "bg-sky text-ink rounded-2xl rounded-br-sm"
            : "bg-cream text-ink rounded-2xl rounded-bl-sm"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

function Dot({ d }: { d: number }) {
  return (
    <motion.span
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 0.8, delay: d }}
      className="w-1.5 h-1.5 rounded-full bg-cherry"
    />
  );
}
