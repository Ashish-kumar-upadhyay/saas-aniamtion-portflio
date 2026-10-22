import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Stars, Words } from "./fx";

function r(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
}

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const beamH = useTransform(scrollYProgress, [0, 1], ["10%", "100%"]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const ringScale = useTransform(scrollYProgress, [0.3, 1], [0.6, 1]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 15 });
  const sy = useSpring(my, { stiffness: 200, damping: 15 });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 pb-16 pt-32">
      <motion.div style={{ opacity: glow }} className="pointer-events-none absolute inset-0">
        <motion.div style={{ height: beamH }} className="absolute bottom-0 left-1/2 w-[280px] -translate-x-1/2 bg-gradient-to-t from-lavender/70 via-primary/30 to-transparent blur-3xl" />
        <motion.div style={{ height: beamH }} className="absolute bottom-0 left-1/2 w-[60px] -translate-x-1/2 bg-gradient-to-t from-foreground/60 via-lavender/30 to-transparent blur-xl" />
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-beam absolute left-[18%] top-10 h-[600px] w-24 rotate-[15deg] bg-gradient-to-b from-lavender/25 to-transparent blur-2xl" />
        <div className="animate-beam absolute right-[18%] top-10 h-[600px] w-24 -rotate-[15deg] bg-gradient-to-b from-lavender/20 to-transparent blur-2xl" style={{ animationDelay: "3s" }} />
      </motion.div>
      <Stars count={40} />

      {/* rising particles */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full">
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full bg-foreground"
            style={{ left: `${35 + r(i) * 30}%`, width: 2 + r(i + 9) * 3, height: 2 + r(i + 9) * 3, boxShadow: "0 0 8px var(--lavender)" }}
            animate={{ y: [0, -600 - r(i + 3) * 300], opacity: [0, 1, 0] }}
            transition={{ duration: 5 + r(i + 5) * 5, repeat: Infinity, delay: r(i + 7) * 6, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="relative text-center">
        <motion.p initial={{ opacity: 0, letterSpacing: "0.6em" }} whileInView={{ opacity: 1, letterSpacing: "0em" }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="font-display text-2xl font-medium">ashishkumarupadhyay.qzz.io</motion.p>
        <h2 className="mt-6 text-5xl font-medium md:text-7xl"><Words text="Book Your Demo Today" wordClassName="text-lavender-grad" /></h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }} className="mx-auto mt-8 max-w-xs text-sm text-lavender">
          Ready to streamline your incident management? Schedule a call with our experts today
        </motion.p>

        <motion.div style={{ scale: ringScale }} className="relative mx-auto mt-12 grid size-64 place-items-center">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="absolute inset-0 rounded-full border border-lavender/40"
              animate={{ scale: [0.5, 1.3], opacity: [0.8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i, ease: "easeOut" }} />
          ))}
          <motion.div className="absolute inset-6 rounded-full border border-dashed border-lavender/30" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <span className="animate-pulse-dot absolute -top-1 left-1/2 size-2 rounded-full bg-primary-glow" />
          </motion.div>
          <motion.button
            style={{ x: sx, y: sy }}
            onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - b.left - b.width / 2) * 0.35); my.set((e.clientY - b.top - b.height / 2) * 0.35); }}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary relative overflow-hidden rounded-full px-10 py-4 text-lg ring-4 ring-lavender/30"
          >
            <span className="relative z-10">Book a demo</span>
            <motion.span className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
              animate={{ left: ["-40%", "140%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }} />
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
}
