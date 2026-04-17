import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.4 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-cherry origin-left z-50"
      style={{ scaleX: x }}
    />
  );
}
