import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
}

export function Stars({ count = 60 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const s = rand(i + 3) * 2.5 + 1;
        return (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full bg-foreground"
            style={{
              left: `${rand(i) * 100}%`,
              top: `${rand(i + 100) * 100}%`,
              width: s,
              height: s,
              animationDelay: `${rand(i + 50) * 3}s`,
              boxShadow: "0 0 6px var(--foreground)",
            }}
          />
        );
      })}
    </div>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
      transition={{ delay }}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

export function Words({ text, wordClassName = "" }: { text: string; wordClassName?: string }) {
  return (
    <motion.span initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} transition={{ staggerChildren: 0.08 }} className="inline">
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%", opacity: 0, filter: "blur(6px)" }, show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <span className={wordClassName}>{w}</span>&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
