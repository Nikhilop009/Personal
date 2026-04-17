import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-cream text-ink overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0.85, 0.2, 1] }}
          className="font-display text-[18vw] md:text-[15vw] leading-[0.85]"
        >
          <span className="block">don't be</span>
          <span className="block italic text-cherry">average.</span>
        </motion.div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-black/10 pt-8">
          <div>
            <div className="font-mono text-xs uppercase opacity-60">a portfolio by</div>
            <div className="font-display text-2xl">Nikhil Mehra · Kota, RJ</div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-mono">
            <a href="https://t.me/NikhilHuBetaa" target="_blank" rel="noreferrer" className="link-cherry">telegram</a>
            <a href="https://www.instagram.com/enzo_x590" target="_blank" rel="noreferrer" className="link-cherry">instagram</a>
            <span className="link-cherry">discord · nikhilhubhiyaa</span>
          </div>
          <div className="text-xs font-mono opacity-50">
            © {new Date().getFullYear()} — built with vibes, lemonade & cherry pulp.
          </div>
        </div>
      </div>
    </footer>
  );
}
