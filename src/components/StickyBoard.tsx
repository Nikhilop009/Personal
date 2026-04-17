import { motion } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

/**
 * Sticky notes use FIXED hex colors (not theme variables) so the
 * paper-color + text-color contrast stays correct in BOTH light & dark mode.
 */
type Note = {
  text: string;
  bg: string;       // raw hex
  fg: string;       // raw hex (always readable on bg)
  rot: number;
  x: number;        // % left
  y: number;        // % top
  size: "md" | "lg";
  tape?: "tl" | "tr" | "tc";
};

const notes: Note[] = [
  // ROW 1
  { text: "ship daily.\nexcuses cost interest.",         bg: "#fff3a0", fg: "#0a0a0a", rot: -6, x: 2,  y: 4,  size: "md", tape: "tc" },
  { text: "log off ig.\nopen vs code.",                  bg: "#ffc8d6", fg: "#0a0a0a", rot:  4, x: 26, y: 3,  size: "md", tape: "tl" },
  { text: "mom & dad first.\nalways.",                   bg: "#d23652", fg: "#fdf8f3", rot: -3, x: 50, y: 5,  size: "md", tape: "tr" },
  { text: "sleep is for\nafter the bag.",                bg: "#c8e6ff", fg: "#0a0a0a", rot:  7, x: 74, y: 3,  size: "md", tape: "tc" },

  // ROW 2
  { text: "no plan B.\nplan A or die trying.",           bg: "#fff3a0", fg: "#0a0a0a", rot:  5, x: 2,  y: 38, size: "md", tape: "tr" },
  { text: "be kind.\nstay sharp.",                       bg: "#fdf8f3", fg: "#0a0a0a", rot: -4, x: 26, y: 39, size: "md", tape: "tl" },
  { text: "build > consume.\nconsume = decay.",          bg: "#ffc8d6", fg: "#0a0a0a", rot: -8, x: 50, y: 40, size: "md", tape: "tc" },
  { text: "the mystery never\nexplains itself.",         bg: "#d23652", fg: "#fdf8f3", rot:  3, x: 74, y: 38, size: "md", tape: "tl" },

  // ROW 3
  { text: "every no is a\nredirect to a bigger yes.",    bg: "#c8e6ff", fg: "#0a0a0a", rot: -5, x: 2,  y: 72, size: "md", tape: "tr" },
  { text: "discipline >\nmotivation. always.",           bg: "#fff3a0", fg: "#0a0a0a", rot:  6, x: 26, y: 73, size: "md", tape: "tc" },
  { text: "they laugh now.\nthey'll forward my reels later.", bg: "#fdf8f3", fg: "#0a0a0a", rot: -2, x: 50, y: 73, size: "md", tape: "tl" },
  { text: "stay broke or\nstay average. pick one.",      bg: "#ffc8d6", fg: "#0a0a0a", rot:  4, x: 74, y: 72, size: "md", tape: "tr" },

  // floater
  { text: "i don't network.\ni build & let it pull.",    bg: "#0a0a0a", fg: "#fdf8f3", rot: -6, x: 38, y: 22, size: "md", tape: "tc" },
];

const sizeMap = {
  md: "w-52 h-52 text-[17px]",
  lg: "w-60 h-56 text-[19px]",
};

function Tape({ pos }: { pos: Note["tape"] }) {
  const base = "absolute h-5 w-16 bg-black/15 backdrop-blur-sm rounded-[2px] shadow-sm";
  if (pos === "tl") return <span className={`${base} -top-2 left-3 -rotate-12`} />;
  if (pos === "tr") return <span className={`${base} -top-2 right-3 rotate-12`} />;
  return <span className={`${base} -top-2 left-1/2 -translate-x-1/2`} />;
}

export default function StickyBoard() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-32 px-6 bg-skyish/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> the wall — drag the notes around
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-12">
            sticky reminders <br />
            <span className="italic text-cherry">i tell myself daily.</span>
          </h2>
        </Reveal>

        <div
          ref={ref}
          className="relative h-[1100px] md:h-[760px] bg-cream rounded-3xl border-2 border-dashed border-ink/15 overflow-hidden paper"
        >
          {/* corkboard texture dots */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* faded watermark behind */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="font-display text-[180px] md:text-[260px] leading-none opacity-[0.05] tracking-tighter select-none">
              wall.
            </div>
          </div>

          {notes.map((n, i) => (
            <motion.div
              key={i}
              drag
              dragConstraints={ref}
              dragElastic={0.15}
              dragMomentum={false}
              initial={{ opacity: 0, scale: 0.4, rotate: 0, y: -40 }}
              whileInView={{ opacity: 1, scale: 1, rotate: n.rot, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 140, damping: 14 }}
              whileHover={{ scale: 1.06, zIndex: 50, rotate: n.rot * 0.3 }}
              whileDrag={{ scale: 1.12, rotate: 0, zIndex: 100, cursor: "grabbing" }}
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                background: n.bg,
                color: n.fg,
              }}
              className={`${sizeMap[n.size]} absolute p-5 rounded-sm shadow-xl cursor-grab font-display leading-[1.15] flex items-center text-center justify-center select-none whitespace-pre-line`}
              data-cursor="hover"
            >
              <Tape pos={n.tape} />
              <span className="relative font-medium">"{n.text}"</span>
              {/* tiny corner index */}
              <span
                className="absolute bottom-1.5 right-2 text-[9px] font-mono opacity-50"
                style={{ color: n.fg }}
              >
                #{String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}

          <div className="absolute bottom-4 right-4 text-[10px] font-mono opacity-60 bg-cream/90 text-ink px-2 py-1 rounded shadow-sm">
            ☝ drag any note · {notes.length} total
          </div>
          <div className="absolute bottom-4 left-4 text-[10px] font-mono opacity-60 bg-cream/90 text-ink px-2 py-1 rounded shadow-sm">
            cork.board / v1.4
          </div>
        </div>
      </div>
    </section>
  );
}
