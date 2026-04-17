import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";

/* ============================================================
   ASSETS
============================================================ */
const YES_GIF =
  "https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUya3hieGZlM2x4ZmhvNGx0d2t4ZjI1MGhuYjR0cG4wcDN4emxxY2VwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/o4SlpaRhLLV57eOhER/giphy.gif";

const NO_GIFS = [
  "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyMnNjb2NhM2N3emh5b2xsbmtoMTljOGJ0c3czNWhwMXY5cGgzYjc0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lGBecpB2dIMwt6ohfI/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUyam1pZ3c2Mzlld3lmbWJvdDhmZnUycW43NnhxeGVkdXAzZHp1dHQ1cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lz6971fkGSgCMOOncl/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUycmUxbGt5aDliOGUyZTBzODRtbjIyYm12c3U1aGo4bWozNXJnaWZ3dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P53TSsopKicrm/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUydTI3YTB3Zm03Zmh4dG40dWNwZGZweTM3b2FlanFtNGRva3BjcWt3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ar71Hyi0ZKejXzMoNs/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUybndnYmZoeTcxam1rbW01dTI2YzQ3Nnk3enR2OGNnd3J3aG54bWp2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vr9CseLC85kdjC56lR/giphy.gif",
];

// Audio (myinstants direct mp3)
const NO_SOUNDS = [
  "https://www.myinstants.com/media/sounds/tf_nemesis.mp3",        // 1 sad violin
  "https://www.myinstants.com/media/sounds/sad-hamster.mp3",       // 2 sad hamster
  "https://www.myinstants.com/media/sounds/tmpauxfo4ff.mp3",       // 3 sad indian
  "https://www.myinstants.com/media/sounds/sadtrombone.swf.mp3",   // 4 sad trombone
  "https://www.myinstants.com/media/sounds/tmpq7mpzzl9_ZmrpDiC.mp3", // 5 sadddd
];
const HAPPY_SOUND = "https://www.myinstants.com/media/sounds/happy-happy-happy-song.mp3";
const CLICK_SOUND = "https://www.myinstants.com/media/sounds/we-got-him.mp3"; // played on yes flip surprise (stage 6)

const STAGES = [
  "do you love me?",
  "really? 🥺 ek aur baar sochlo na…",
  "yaar mai aapse pyaar karta hu — maan jaao na, yes boldo ab 🥹",
  "mai sach mai pasand nahi hu kya aapko? 😥",
  "chalo thik hai dabado no 😓",
  "ek baar aur pls — soch lo. last time, agli baar nahi bolunga.",
];

const STAGE_LABELS = [
  "stage · 00",
  "stage · 01 / heartbreak loading",
  "stage · 02 / begging mode",
  "stage · 03 / damage taken",
  "stage · 04 / accepting fate",
  "stage · 05 / final plea",
];

/* ============================================================
   COMPONENT
============================================================ */
export default function DoYouLoveMe() {
  const [stage, setStage] = useState(0); // 0..5
  const [answered, setAnswered] = useState<"yes" | "flipped" | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; e: string }[]>([]);
  const [shake, setShake] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // play helper — stops previous sound first
  const play = (src: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const a = new Audio(src);
      a.volume = 0.65;
      a.play().catch(() => {});
      audioRef.current = a;
    } catch {}
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => () => stopAudio(), []);

  const burstHearts = (count = 28) => {
    const next = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      e: ["🩷", "💖", "💘", "🌸", "🍒", "✨"][Math.floor(Math.random() * 6)],
    }));
    setHearts((p) => [...p, ...next]);
    setTimeout(() => setHearts((p) => p.slice(count)), 4500);
  };

  const handleYes = () => {
    play(HAPPY_SOUND);
    setAnswered("yes");
    burstHearts(40);
  };

  const handleNo = () => {
    if (stage < 5) {
      // play the sad sound for this attempt (NO_SOUNDS[stage] aligns: stage 0→sound[0], etc.)
      play(NO_SOUNDS[stage]);
      setShake((s) => s + 1);
      setStage(stage + 1);
    } else {
      // 6th time — the FLIP. No becomes Yes.
      play(CLICK_SOUND); // surprise click
      setAnswered("flipped");
      // small delay then happy song + hearts
      setTimeout(() => {
        play(HAPPY_SOUND);
        burstHearts(40);
      }, 900);
    }
  };

  const reset = () => {
    stopAudio();
    setStage(0);
    setAnswered(null);
    setHearts([]);
    setShake(0);
  };

  // dynamic Yes/No sizing
  const yesScale = 1 + stage * 0.18;
  const noScale = Math.max(0.45, 1 - stage * 0.13);
  const noTilt = stage * 4;

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-pinkish/35">
      {/* floating background hearts */}
      <div className="pointer-events-none absolute inset-0">
        {[..."🩷💖🌸🍒💘"].map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl opacity-20"
            style={{ left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 12, -10], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> the question · choose wisely
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-12">
            a tiny test <br />
            <span className="italic text-cherry">between us.</span>
          </h2>
        </Reveal>

        {/* THE CARD */}
        <Reveal delay={0.1}>
          <motion.div
            key={shake}
            initial={{ x: 0 }}
            animate={
              shake > 0 && !answered ? { x: [0, -14, 14, -10, 10, -4, 4, 0] } : { x: 0 }
            }
            transition={{ duration: 0.55 }}
            className="relative"
          >
            {/* stacked depth layers */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[36px] bg-cherry/80" />
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[36px] bg-ink/90" />

            <div className="relative rounded-[36px] bg-cream border-2 border-ink overflow-hidden shadow-2xl">
              {/* top ribbon */}
              <div className="flex items-center justify-between px-6 py-3 border-b-2 border-ink bg-lemon">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cherry border border-ink" />
                  <span className="w-3 h-3 rounded-full bg-skyish border border-ink" />
                  <span className="w-3 h-3 rounded-full bg-pinkish border border-ink" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/80">
                  love.exe — confidential
                </span>
                <span className="font-mono text-[11px] text-ink/60">●REC</span>
              </div>

              {/* content */}
              <div className="px-6 md:px-12 py-12 md:py-16 text-center">
                <AnimatePresence mode="wait">
                  {answered === null && (
                    <motion.div
                      key={`stage-${stage}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                    >
                      {/* tiny stage label */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink text-cream font-mono text-[10px] tracking-[0.25em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-cherry animate-pulse" />
                        {STAGE_LABELS[stage]}
                      </div>

                      {/* gif preview when stage > 0 */}
                      {stage > 0 && (
                        <motion.div
                          initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 180, damping: 14 }}
                          className="mx-auto mb-8 inline-block relative"
                        >
                          {/* polaroid frame */}
                          <div className="bg-cream p-3 pb-10 border-2 border-ink shadow-xl rotate-[-2deg]">
                            <img
                              src={NO_GIFS[stage - 1]}
                              alt="sad reaction"
                              className="w-56 h-56 md:w-64 md:h-64 object-cover bg-ink/10"
                              loading="lazy"
                            />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-display italic text-sm text-ink/60">
                              attempt #{stage}
                            </div>
                          </div>
                          {/* tape */}
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-lemon/80 border border-ink/30 rotate-[-4deg] shadow" />
                        </motion.div>
                      )}

                      {/* THE QUESTION TEXT */}
                      <motion.h3
                        className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink mb-2"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        {stage === 0 ? (
                          <>
                            do you <span className="italic text-cherry">love</span> me?
                          </>
                        ) : (
                          <span className="italic">{STAGES[stage]}</span>
                        )}
                      </motion.h3>

                      {stage === 0 && (
                        <p className="mt-4 text-base md:text-lg text-ink/70 font-display italic">
                          (warning: this is a multi-stage test 🍒)
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* YES screen */}
                  {answered === "yes" && (
                    <motion.div
                      key="yes-screen"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 170, damping: 14 }}
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cherry text-cream font-mono text-[10px] tracking-[0.25em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-lemon animate-pulse" />
                        you said yes 🩷
                      </div>

                      <div className="mx-auto mb-6 inline-block relative">
                        <div className="bg-cream p-3 pb-10 border-2 border-ink shadow-2xl rotate-[2deg]">
                          <img
                            src={YES_GIF}
                            alt="i love you too"
                            className="w-64 h-64 md:w-80 md:h-80 object-cover bg-ink/10"
                          />
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-display italic text-base text-cherry font-bold">
                            ✦ certified mutual ✦
                          </div>
                        </div>
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-pinkish border border-ink/30 rotate-3 shadow" />
                      </div>

                      <h3 className="font-display text-5xl md:text-7xl leading-[1] text-cherry">
                        i know you love me
                      </h3>
                      <p className="font-display text-3xl md:text-5xl italic text-ink mt-2">
                        i love you too 🌸
                      </p>

                      <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <button
                          onClick={reset}
                          className="px-6 py-3 rounded-full bg-ink text-cream font-display text-base hover:bg-cherry transition"
                        >
                          ↻ play again
                        </button>
                        <a
                          href="https://www.instagram.com/enzo_x590"
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 rounded-full bg-cherry text-cream font-display text-base hover:bg-ink transition"
                        >
                          dm on insta →
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* FLIPPED screen — same as yes but came after 6 NOs */}
                  {answered === "flipped" && (
                    <motion.div
                      key="flipped-screen"
                      initial={{ opacity: 0, rotateX: 90 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      transition={{ type: "spring", stiffness: 140, damping: 14 }}
                      style={{ transformOrigin: "center" }}
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cherry text-cream font-mono text-[10px] tracking-[0.25em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-lemon animate-pulse" />
                        plot twist · the no flipped
                      </div>

                      <div className="mx-auto mb-6 inline-block relative">
                        <div className="bg-cream p-3 pb-10 border-2 border-ink shadow-2xl rotate-[2deg]">
                          <img
                            src={YES_GIF}
                            alt="i love you too"
                            className="w-64 h-64 md:w-80 md:h-80 object-cover bg-ink/10"
                          />
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-display italic text-base text-cherry font-bold">
                            ✦ no escape from love ✦
                          </div>
                        </div>
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-lemon border border-ink/30 -rotate-3 shadow" />
                      </div>

                      <h3 className="font-display text-5xl md:text-7xl leading-[1] text-cherry">
                        i know you love me
                      </h3>
                      <p className="font-display text-3xl md:text-5xl italic text-ink mt-2">
                        i love you too 🌸
                      </p>
                      <p className="mt-3 text-sm font-mono text-ink/60 uppercase tracking-widest">
                        told you · no plan B
                      </p>

                      <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <button
                          onClick={reset}
                          className="px-6 py-3 rounded-full bg-ink text-cream font-display text-base hover:bg-cherry transition"
                        >
                          ↻ play again
                        </button>
                        <a
                          href="https://www.instagram.com/enzo_x590"
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 rounded-full bg-cherry text-cream font-display text-base hover:bg-ink transition"
                        >
                          dm on insta →
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BUTTONS */}
                {answered === null && (
                  <div className="mt-12 flex items-center justify-center gap-6 md:gap-10 flex-wrap">
                    {/* YES button — grows */}
                    <motion.button
                      onClick={handleYes}
                      animate={{ scale: yesScale }}
                      whileHover={{ scale: yesScale * 1.06 }}
                      whileTap={{ scale: yesScale * 0.94 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14 }}
                      className="relative group"
                      data-cursor="hover"
                    >
                      <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full bg-ink" />
                      <span className="relative inline-flex items-center gap-2 px-10 py-5 rounded-full bg-cherry text-cream font-display text-2xl md:text-3xl border-2 border-ink shadow-lg">
                        🩷 yes
                      </span>
                    </motion.button>

                    {/* NO button — shrinks + tilts. On stage 5 (last), the flip happens on-click */}
                    <motion.button
                      onClick={handleNo}
                      animate={{ scale: noScale, rotate: noTilt }}
                      whileHover={{ scale: noScale * 1.04 }}
                      whileTap={{ scale: noScale * 0.92 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14 }}
                      className="relative overflow-hidden rounded-full"
                      data-cursor="hover"
                    >
                      <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full bg-ink" />
                      <span className="relative inline-flex items-center gap-2 px-10 py-5 rounded-full bg-cream text-ink font-display text-2xl md:text-3xl border-2 border-ink shadow-lg">
                        no
                      </span>
                      {/* hover hint label */}
                      {stage >= 3 && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest text-ink/50 whitespace-nowrap">
                          ← think twice
                        </span>
                      )}
                    </motion.button>
                  </div>
                )}

                {/* progress dots */}
                {answered === null && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i <= stage ? "w-8 bg-cherry" : "w-3 bg-ink/15"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* footer */}
              <div className="px-6 py-3 border-t-2 border-ink bg-skyish/40 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink/70">
                <span>built with 🩷 by nikhil</span>
                <span>collect · a · souvenir</span>
                <span>v 2.6</span>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* falling hearts overlay */}
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.span
                key={h.id}
                initial={{ y: -40, x: `${h.x}vw`, opacity: 0, scale: 0.4, rotate: 0 }}
                animate={{
                  y: "110vh",
                  opacity: [0, 1, 1, 0],
                  scale: [0.4, 1.2, 1, 0.8],
                  rotate: 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4 + Math.random() * 2, ease: "easeIn" }}
                className="absolute text-3xl"
              >
                {h.e}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
