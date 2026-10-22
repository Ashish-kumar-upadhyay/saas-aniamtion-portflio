import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Stars, Words } from "./fx";

const inputCls =
  "w-full rounded-2xl border border-border bg-background/60 px-4 py-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:shadow-[var(--shadow-glow)]";

function Field({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-4 text-muted-foreground">{icon}</span>
      {children}
    </div>
  );
}

const card = {
  hidden: { opacity: 0, y: 60, rotateX: 12 },
  show: (d: number) => ({ opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function Contact() {
  const [sent, setSent] = useState(false);
  const [comments, setComments] = useState<{ n: string; c: string }[]>([]);
  const [cn, setCn] = useState("");
  const [cc, setCc] = useState("");

  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-24" style={{ perspective: 1200 }}>
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 size-96 rounded-full bg-primary/20 blur-3xl" />
      <Stars count={25} />

      <div className="relative mx-auto mb-12 text-center">
        <h2 className="text-4xl font-medium md:text-5xl"><Words text="Get in touch" /></h2>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_2fr]">
        <motion.div variants={card} custom={0} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="glass-card rounded-3xl p-8">
          <h3 className="text-3xl font-semibold leading-tight">Ashish Kumar<br />Upadhyay</h3>
          <p className="mt-3 text-sm text-muted-foreground">Freelance Full Stack Developer · Indore, Madhya Pradesh, India</p>
          <div className="mt-6 space-y-4 text-sm">
            {[
              [<Mail key="m" className="size-4" />, "Email", <a key="e" href="mailto:hello@resq.io" className="hover:text-lavender">Send an email</a>],
              [<Phone key="p" className="size-4" />, "Phone", <a key="t" href="tel:+917987665254" className="hover:text-lavender">+91 7987665254</a>],
              [<MapPin key="a" className="size-4" />, "Address", "Indore, Madhya Pradesh, India 453441"],
            ].map(([i, l, v], k) => (
              <motion.div key={k} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + k * 0.1 }} className="flex items-center gap-3">
                <span className="text-lavender">{i}</span><span className="w-16 text-xs text-muted-foreground">{l}</span><span>{v}</span>
              </motion.div>
            ))}
          </div>

          <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); e.currentTarget.reset(); setTimeout(() => setSent(false), 3000); }}>
            <Field icon={<User className="size-5" />}><input required placeholder="Your Name" className={`${inputCls} pl-12`} /></Field>
            <Field icon={<Mail className="size-5" />}><input required type="email" placeholder="Your Email" className={`${inputCls} pl-12`} /></Field>
            <Field icon={<MessageSquare className="size-5" />}><textarea required rows={5} placeholder="Your Message" className={`${inputCls} resize-none pl-12`} /></Field>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn-primary flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm">
              {sent ? <><CheckCircle2 className="size-4" />Message sent!</> : <><Send className="size-4" />Send Message</>}
            </motion.button>
          </form>
        </motion.div>

        <motion.div variants={card} custom={0.15} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="glass-card flex flex-col rounded-3xl p-8">
          <h3 className="text-3xl font-semibold">Comments</h3>
          <p className="mt-1 text-sm text-muted-foreground">Leave your thoughts here</p>
          <form className="mt-6 flex flex-1 flex-col gap-4" onSubmit={(e) => { e.preventDefault(); if (!cn.trim() || !cc.trim()) return; setComments((c) => [{ n: cn, c: cc }, ...c]); setCn(""); setCc(""); }}>
            <input value={cn} onChange={(e) => setCn(e.target.value)} placeholder="Your Name" className={inputCls} />
            <textarea value={cc} onChange={(e) => setCc(e.target.value)} placeholder="Your Comment" className={`${inputCls} min-h-56 flex-1 resize-none`} />
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} className="btn-ghost-glow w-full rounded-2xl py-4 text-sm">Post Comment</motion.button>
          </form>
          {comments.length > 0 && (
            <div className="mt-6 max-h-60 space-y-3 overflow-y-auto">
              {comments.map((c, i) => (
                <motion.div key={comments.length - i} initial={{ opacity: 0, y: -10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="rounded-2xl border border-border bg-secondary/50 p-4 text-sm">
                  <p className="font-semibold text-lavender">{c.n}</p><p className="mt-1 opacity-85">{c.c}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <footer className="relative mx-auto mt-24 flex max-w-5xl flex-wrap justify-between gap-6 text-xs text-foreground/80">
        <div className="flex gap-8"><span>Solutions</span><span>Products</span><span>Pricing</span></div>
        <div className="flex gap-8"><span>Careers</span><span>Resources</span><span>Privacy &amp; Policy</span></div>
      </footer>
    </section>
  );
}
