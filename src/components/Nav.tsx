import { motion, useScroll, useTransform } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -2]);
  const w = useTransform(scrollY, [0, 200], ["96%", "70%"]);
  const bg = useTransform(scrollY, [0, 200], ["rgba(253,248,243,0)", "rgba(253,248,243,.85)"]);

  return (
    <motion.nav
      style={{ y, width: w, backgroundColor: bg }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 backdrop-blur-md border border-black/5 rounded-full px-5 py-3 flex items-center justify-between"
    >
      <a href="#top" className="flex items-center gap-2 group">
        <span className="w-2.5 h-2.5 rounded-full bg-cherry inline-block animate-pulse" />
        <span className="font-display text-xl tracking-tight">Nikhil <span className="italic text-cherry">Mehra</span></span>
      </a>
      <div className="hidden md:flex items-center gap-7 text-sm font-medium">
        {[
          ["about", "About"],
          ["work", "Work"],
          ["mind", "Mind"],
          ["contact", "Contact"],
        ].map(([h, l]) => (
          <a key={h} href={`#${h}`} className="link-cherry">
            {l}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href="https://t.me/NikhilHuBetaa"
          target="_blank"
          rel="noreferrer"
          className="bg-ink text-cream rounded-full px-4 py-2 text-sm font-medium hover:bg-cherry transition-colors"
        >
          Let's talk →
        </a>
      </div>
    </motion.nav>
  );
}
