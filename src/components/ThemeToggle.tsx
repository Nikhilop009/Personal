import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nm-theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nm-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nm-theme", "light");
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="toggle theme"
      className="relative w-14 h-7 rounded-full bg-ink/10 border border-ink/15 flex items-center px-1 hover:bg-ink/20 transition-colors"
      data-cursor="hover"
    >
      <motion.div
        animate={{ x: dark ? 26 : 0, rotate: dark ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="w-5 h-5 rounded-full bg-cream border border-ink/20 flex items-center justify-center text-[10px] shadow"
      >
        {dark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}
