export default function Marquee() {
  const words = [
    "I win", "I would win", "I have to win", "definitely",
    "🍒", "introvert mode", "vibe coding", "future millionaire",
    "kota → world", "no average", "mystery", "🩷",
  ];
  return (
    <section className="relative py-10 border-y border-black/10 bg-cream overflow-hidden">
      <div className="flex whitespace-nowrap marquee-track">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex items-center gap-8 pr-8 font-display text-6xl md:text-8xl leading-none">
            {words.map((w, i) => (
              <span key={`${k}-${i}`} className={`flex items-center gap-8 ${i % 3 === 0 ? "italic text-cherry" : ""}`}>
                {w} <span className="text-cherry text-3xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
