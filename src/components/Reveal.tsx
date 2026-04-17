import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

const v: Variants = {
  hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
  show: (d: number = 0) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: d, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export default function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.2, 0.85, 0.2, 1] }}
            style={{ display: "inline-block", paddingRight: "0.28em" }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
