import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const events = [
  { year: "stage 01", title: "discovered the keyboard", text: "first <html> tag. small fire. addicted.", color: "bg-skyish" },
  { year: "stage 02", title: "vibe coding became a habit", text: "free time = building. weekends = building. nights = building.", color: "bg-pinkish" },
  { year: "stage 03", title: "added java, then python", text: "logic clicked. now learning n8n to automate the boring parts.", color: "bg-lemon" },
  { year: "stage 04", title: "game dev experiment", text: "depends on the mood. some days unity, some days web. always something.", color: "bg-cherry", textC: "text-cream" },
  { year: "stage 05", title: "millionaire by 19", text: "loading… nothing is impossible. i win definitely.", color: "bg-ink", textC: "text-cream" },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 px-6 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6 text-sm font-mono uppercase tracking-widest opacity-70">
            <span className="w-8 h-px bg-ink" /> the road so far
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-16">
            no shortcuts. <br />
            <span className="italic text-cherry">just stages.</span>
          </h2>
        </Reveal>

        <div className="relative pl-8 md:pl-0">
          {/* spine */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-ink/15" />
          <motion.div
            style={{ height: lineH }}
            className="absolute left-3 md:left-1/2 top-0 w-px bg-cherry origin-top"
          />

          <div className="space-y-16">
            {events.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
              >
                <div className="absolute left-3 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-cherry ring-4 ring-cream" />
                <div className={`${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12 md:col-start-2"} pl-8 md:pl-0`}>
                  <div className={`inline-block ${e.color} ${e.textC || "text-ink"} px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-3`}>
                    {e.year}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl mb-2">{e.title}</h3>
                  <p className="opacity-70 max-w-md md:inline-block">{e.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
