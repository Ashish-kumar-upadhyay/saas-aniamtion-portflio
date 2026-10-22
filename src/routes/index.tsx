import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";
import { BarChart3, FileText, ArrowDown, Workflow, Sparkles, RefreshCw, Compass, Box } from "lucide-react";
import { Dashboard } from "@/components/resq/Dashboard";
import { feed } from "@/components/resq/feed";
import { CTA } from "@/components/resq/CTA";
import { Contact } from "@/components/resq/Contact";
import { FloatingWidgets } from "@/components/resq/FloatingWidgets";
import { Stars, Reveal, fadeUp, Words } from "@/components/resq/fx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ashishkumarupadhyay.qzz.io — Act fast when challenges arise" },
      { name: "description", content: "Complete AI support for incidents, on-call scheduling, and status communication." },
      { property: "og:title", content: "ashishkumarupadhyay.qzz.io — Act fast when challenges arise" },
      { property: "og:description", content: "AI incident platform for modern teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = ["Solutions", "Products", "Pricing", "Careers", "Resources"];

function Index() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  return (
    <div className="p-2 md:p-3">
      <main className="relative overflow-hidden rounded-[28px] bg-background">
        <Hero />
        <Logos />
        <Issues />
        <Unified />
        <Capabilities />
        <Foundation />
        <CTA />
        <Contact />
      </main>
      <FloatingWidgets />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.5], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const mx = useMotionValue(0.5); const my = useMotionValue(0.3);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 }); const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotX = useTransform(sx, (v) => `${v * 100}%`); const spotY = useTransform(sy, (v) => `${v * 100}%`);
  const tiltY = useTransform(sx, [0, 1], [-8, 8]); const tiltX = useTransform(sy, [0, 1], [6, -6]);
  const words = ["Websites", "SaaS apps", "Dashboards", "Experiences"];
  const [wi, setWi] = useState(0);
  useEffect(() => { const t = setInterval(() => setWi((i) => (i + 1) % words.length), 2200); return () => clearInterval(t); }, []);

  return (
    <section ref={ref} onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - b.left) / b.width); my.set((e.clientY - b.top) / Math.min(b.height, 900)); }} className="relative min-h-[150vh] px-4 pt-6">
      <motion.div className="pointer-events-none absolute size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" style={{ left: spotX, top: spotY }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] opacity-20 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      {[{ l: "78%", t: "22%", s: 90, d: 0 }, { l: "86%", t: "48%", s: 50, d: 1.5 }, { l: "70%", t: "8%", s: 30, d: 0.8 }].map((o, i) => (
        <motion.div key={i} className="pointer-events-none absolute rounded-full border border-lavender/30 bg-gradient-to-br from-lavender/30 to-primary/10 backdrop-blur-sm" style={{ left: o.l, top: o.t, width: o.s, height: o.s, boxShadow: "inset 0 0 20px var(--lavender)" }} animate={{ y: [0, -25, 0], x: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, delay: o.d, ease: "easeInOut" }} />
      ))}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-beam absolute -left-40 -top-40 h-[900px] w-[500px] rotate-[-35deg] bg-gradient-to-b from-transparent via-lavender/40 to-transparent blur-3xl" />
        <div className="animate-beam absolute left-[5%] top-[10%] h-[700px] w-[80px] rotate-[-38deg] bg-gradient-to-b from-transparent via-foreground/50 to-transparent blur-2xl" />
        <motion.div initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} className="absolute -top-20 left-[2%] h-[680px] w-[3px] origin-top rotate-[-35deg] bg-gradient-to-b from-transparent via-foreground to-foreground blur-[1px]" style={{ boxShadow: "0 0 30px 6px var(--lavender)" }} />
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.4, 1], opacity: 1 }} transition={{ duration: 1.4, delay: 1 }} className="absolute left-[11%] top-[60%]">
          <div className="animate-beam size-6 rounded-full bg-foreground blur-[2px]" style={{ boxShadow: "0 0 60px 30px var(--lavender)" }} />
          <div className="absolute left-1/2 top-1/2 h-px w-[500px] -translate-y-1/2 bg-gradient-to-r from-foreground/80 to-transparent" />
        </motion.div>
        <div className="absolute left-[10%] top-[55%] size-40 rounded-full bg-lavender/40 blur-3xl" />
      </div>
      <Stars count={70} />

      <motion.nav
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="glass-card relative z-20 mx-auto flex max-w-4xl items-center justify-between rounded-full px-5 py-2.5"
      >
        <span className="font-display font-semibold">ashishkumarupadhyay.qzz.io</span>
        <ul className="hidden gap-10 text-sm md:flex">{nav.map((n) => <li key={n} className="cursor-pointer transition-opacity hover:opacity-70">{n}</li>)}</ul>
        <button className="btn-primary rounded-full px-6 py-2 text-sm">Log in</button>
      </motion.nav>

      <motion.div style={{ y: textY }} className="relative z-10 mx-auto mt-20 max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.2 }} className="glass-card mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
          <span className="relative flex size-2"><span className="absolute inset-0 animate-ping rounded-full bg-success" /><span className="relative size-2 rounded-full bg-success" /></span>
          Freelance Web Developer · Available for projects
        </motion.div>
        <h1 className="text-5xl font-medium leading-tight md:text-6xl">
          <span className="block">{"I build".split("").map((c, i) => (
            <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 40, rotateX: -90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.3 + i * 0.04, type: "spring", stiffness: 120, damping: 12 }}>{c === " " ? "\u00a0" : c}</motion.span>
          ))}</span>
          <span className="relative flex h-[1.25em] justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span key={wi} className="text-lavender-grad" initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>{words[wi]}</motion.span>
            </AnimatePresence>
          </span>
          <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>that convert</motion.span>
        </h1>
        <motion.p initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.15 }} className="mx-auto mt-5 max-w-md text-sm text-foreground/85">
          Hi, I'm Ashish Kumar Upadhyay — a freelance full stack developer crafting fast, beautiful websites and SaaS products for modern brands.
        </motion.p>
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.3 }} className="mt-8 flex justify-center gap-3">
          <button className="btn-primary rounded-full px-6 py-3 text-sm transition-transform hover:scale-105">Book a demo</button>
          <button className="btn-ghost-glow rounded-full px-6 py-3 text-sm transition-transform hover:scale-105">View my work</button>
        </motion.div>
      </motion.div>

      <div className="sticky top-16 z-10 mx-auto mt-14 max-w-4xl" style={{ perspective: 1200 }}>
        <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.4 }}>
          <motion.div style={{ rotateX: rotate, scale }}>
            <motion.div style={{ rotateY: tiltY, rotateX: tiltX }}>
              <Dashboard />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Logos() {
  const items = [
    <span key="n" className="font-display text-2xl font-bold tracking-tight">NETFLIX</span>,
    <span key="t" className="flex items-center gap-2 text-xl font-bold"><Compass className="size-6" />Trace</span>,
    <span key="r" className="flex items-center gap-2 text-lg font-bold"><span className="font-display text-2xl">R</span>Recharge</span>,
    <span key="a" className="flex items-center gap-2 text-lg font-semibold"><RefreshCw className="size-6" />Automation</span>,
    <span key="o" className="flex items-center gap-2 text-lg font-semibold"><Box className="size-6" />Orbitc</span>,
  ];
  return (
    <section className="relative mx-auto max-w-3xl overflow-hidden py-16 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
      <div className="animate-marquee flex w-max gap-20">{[...items, ...items].map((el, i) => <div key={i}>{el}</div>)}</div>
    </section>
  );
}

function Issues() {
  const tags = [
    { t: "Proof or it's not real", x: "10%", y: "28%", r: -4, h: 70 },
    { t: "All systems stable", x: "18%", y: "52%", r: 6, h: 140, active: true },
    { t: "Incidents resolved", x: "2%", y: "80%", r: 0, h: 220 },
    { t: "Perfect rhythm", x: "60%", y: "36%", r: 8, h: 110 },
    { t: "Fix pushed", x: "58%", y: "66%", r: -6, h: 190 },
  ];
  return (
    <section className="px-4 py-16">
      <Reveal className="relative mx-auto grid max-w-4xl overflow-hidden rounded-3xl border border-border p-8 md:grid-cols-2 md:p-10" >
        <div className="absolute inset-0" style={{ background: "var(--gradient-banner)" }} />
        <Stars count={20} />
        <div className="relative self-center py-10">
          <h2 className="text-4xl font-medium text-lavender-grad leading-tight">Issues arise<br />every day</h2>
          <p className="mt-4 max-w-xs text-sm text-foreground/85">Issues arise every day. Outages are inevitable, but with the right approach, chaos isn't.</p>
        </div>
        <div className="relative h-64">
          {tags.map((g, i) => (
            <motion.div
              key={g.t}
              initial={{ y: -200, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 60, damping: 9, delay: i * 0.12 }}
              className="absolute"
              style={{ left: g.x, top: g.y }}
            >
              <div className="animate-float" style={{ animationDelay: `${i * 0.6}s` }}>
                <div className="absolute bottom-full left-1/2 w-px bg-gradient-to-t from-lavender to-transparent" style={{ height: g.h }} />
                <div className="animate-pulse-dot absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary-glow" />
                <div className={`rounded-md border px-3 py-1.5 text-xs ${g.active ? "btn-primary" : "border-lavender/40 bg-secondary/80"}`} style={{ rotate: `${g.r}deg` }}>
                  {g.t}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Unified() {
  const cards = [["Response", "Manage incidents from start to finish"], ["On-call", "Bring the right experts together"], ["AI SRE", "Fix incidents faster with AI-powered support"], ["Status Pages", "Keep users informed in real time"]];
  const lines = Array.from({ length: 14 });
  return (
    <section className="px-4 py-20">
      <Reveal className="text-center">
        <h2 className="text-4xl font-medium md:text-5xl"><Words text="Unified incident platform" /></h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-foreground/85">From first alert to full resolution, equip your team with the tools to act fast, minimize disruptions, and keep customers informed.</p>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-4xl items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="relative grid grid-cols-2 gap-x-6 gap-y-14">
          {cards.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="glass-card rounded-xl px-4 py-6 text-center transition-transform hover:-translate-y-1">
                <p className="text-sm font-semibold">{t}</p>
                <p className="mt-2 text-xs text-foreground/75">{d}</p>
              </div>
            </Reveal>
          ))}
          <svg className="pointer-events-none absolute -right-10 top-0 hidden h-full w-16 md:block" viewBox="0 0 60 300" preserveAspectRatio="none">
            <path d="M0 75 H25 Q35 75 35 90 V210 Q35 225 25 225 H0 M35 150 H60" fill="none" stroke="var(--lavender)" strokeOpacity=".5" strokeWidth="3" />
            <path d="M0 75 H25 Q35 75 35 90 V210 Q35 225 25 225 H0 M35 150 H60" fill="none" stroke="var(--primary-glow)" strokeWidth="3" strokeDasharray="8 32" className="animate-flow" />
          </svg>
        </div>
        <Reveal className="relative mx-auto grid size-72 place-items-center">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
          {lines.map((_, i) => {
            const a = (i / lines.length) * 360;
            return (
              <div key={i} className="absolute left-1/2 top-1/2 h-px w-32 origin-left" style={{ rotate: `${a}deg` }}>
                <div className="h-px w-full bg-gradient-to-r from-lavender/70 to-transparent" />
                <span className="animate-twinkle absolute right-2 -top-[3px] size-1.5 rounded-full bg-primary-glow" style={{ animationDelay: `${i * 0.2}s` }} />
              </div>
            );
          })}
          <motion.div
            animate={{ boxShadow: ["0 0 40px var(--primary)", "0 0 90px var(--primary-glow)", "0 0 40px var(--primary)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative grid size-36 place-items-center rounded-3xl border-4 border-lavender/60 bg-gradient-to-br from-primary-glow to-primary"
          >
            <span className="font-display text-6xl">AI</span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="px-4 py-20">
      <Reveal className="text-center"><h2 className="text-4xl font-medium leading-tight md:text-5xl mx-auto max-w-lg"><Words text="All-in-one platform capabilities" /></h2></Reveal>
      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-[1fr_1.7fr]">
        <Reveal className="relative overflow-hidden rounded-2xl bg-primary p-6">
          <Stars count={18} />
          <h3 className="relative text-3xl leading-tight">Your world, simplified in one dashboard.</h3>
          <p className="relative mt-4 text-sm opacity-85">Gain full visibility across your systems with real-time insights and effortless control.</p>
        </Reveal>
        <Reveal delay={0.1} className="relative h-80 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/40 to-background">
          <Stars count={15} />
          <div className="absolute left-12 top-16 w-[700px] origin-top-left -rotate-12 scale-[0.8]"><Dashboard /></div>
        </Reveal>
        <Reveal className="relative h-96 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/30 to-background p-6">
          <div className="absolute right-6 top-0 h-[68%] w-60 overflow-hidden [mask-image:linear-gradient(transparent,black_15%,black_85%,transparent)]">
            <div className="animate-feed flex flex-col gap-3">
              {[...feed, ...feed].map((f, i) => (
                <div key={i} className="glass-card rounded-xl p-3 text-xs">
                  <div className="flex justify-between"><span className={`rounded-full px-3 py-1 ${f.s === "Investigating" ? "btn-primary" : "bg-foreground text-background"}`}>{f.s}</span><span className="opacity-60">INC-0000</span></div>
                  <p className="mt-3 opacity-80">{f.m}</p>
                  <p className="mt-3 font-semibold">{f.n}</p><p className="opacity-60">{f.e}</p>
                </div>
              ))}
            </div>
          </div>
          <h3 className="absolute bottom-6 left-6 z-10 text-3xl">Quick issue<br />resolution</h3>
        </Reveal>
        <Reveal delay={0.1} className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/30 to-background p-6">
          <h3 className="max-w-xs text-xl font-medium leading-snug">AI SRE fixes issues like your best engineer - automatically.</h3>
          <p className="mt-4 max-w-xs text-sm opacity-80">Detects problems, suggests fixes, and restores systems fast.</p>
          <button className="btn-primary mt-6 rounded-full px-6 py-2 text-sm transition-transform hover:scale-105">Discover</button>
          <motion.div animate={{ x: ["-30%", "130%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-transparent via-primary-glow to-transparent" />
        </Reveal>
      </div>
    </section>
  );
}

function Foundation() {
  const items = [
    { t: "Insights", d: "Identify patterns, cut through the noise, and speed up response times.", I: BarChart3, r: -4 },
    { t: "Catalog", d: "Access the right and relevant context for your team instantly.", I: FileText, r: 4 },
    { t: "Integrations", d: "Bring together the tools you already use and take action from one place.", I: ArrowDown, r: -4, active: true },
    { t: "Workflows", d: "Automate incident handling and maintain consistency at scale.", I: Workflow, r: 0 },
    { t: "AI", d: "Intelligence, context, and power at the heart of every incident.", I: Sparkles, r: 5 },
  ];
  const Card = ({ it, i }: { it: (typeof items)[number]; i: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: it.r }}
      whileHover={{ rotate: 0, y: -8, scale: 1.04 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 70, damping: 13, delay: i * 0.1 }}
      className={`w-48 rounded-2xl p-5 text-center ${it.active ? "bg-primary/80 border border-lavender/40" : "glass-card"}`}
    >
      <div className="relative mx-auto size-14">
        <div className="absolute right-0 top-0 size-11 rounded-xl bg-lavender/70" />
        <div className="absolute bottom-0 left-0 grid size-11 place-items-center rounded-xl border border-lavender/50 bg-gradient-to-br from-primary to-background"><it.I className="size-5" /></div>
      </div>
      <p className="mt-4 text-sm font-medium">{it.t}</p>
      <p className="mt-2 text-xs opacity-80">{it.d}</p>
    </motion.div>
  );
  return (
    <section className="px-4 py-20">
      <Reveal className="text-center"><h2 className="text-4xl font-medium md:text-5xl"><Words text="Built on a solid foundation" /></h2></Reveal>
      <div className="mt-16 flex flex-col items-center">
        <div className="flex flex-wrap justify-center">{items.slice(0, 2).map((it, i) => <Card key={it.t} it={it} i={i} />)}</div>
        <div className="flex flex-wrap justify-center gap-2 md:-mt-2">{items.slice(2).map((it, i) => <Card key={it.t} it={it} i={i + 2} />)}</div>
      </div>
    </section>
  );
}

