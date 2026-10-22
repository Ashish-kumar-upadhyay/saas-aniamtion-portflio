import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "910000000000"; // demo number

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 6 6 0 0 0 1.2 3.1 13 13 0 0 0 5.2 4.6c1.9.8 2.6.9 3.6.7a3 3 0 0 0 2-1.4 2.4 2.4 0 0 0 .1-1.4c0-.2-.3-.3-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.4-1.7A11.8 11.8 0 0 0 24 12a11.7 11.7 0 0 0-3.5-8.5z" />
    </svg>
  );
}

const replies = [
  "Hi! I'm Ashish AI. I can help you triage incidents, set up on-call, and more.",
  "Great question! Book a demo and our team will walk you through it.",
  "Our AI SRE detects problems and suggests fixes automatically.",
];

export function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ me: boolean; t: string }[]>([{ me: false, t: replies[0] ?? "" }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { me: true, t: text }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { me: false, t: replies[1 + (m.length % 2)] ?? "" }]);
    }, 1200);
  };

  return (
    <>
      {/* AI chatbot - left */}
      <div className="fixed bottom-6 left-6 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="glass-card absolute bottom-20 left-0 flex h-[420px] w-80 origin-bottom-left flex-col overflow-hidden rounded-2xl"
            >
              <div className="flex items-center justify-between border-b border-border bg-primary/30 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-full bg-primary"><Bot className="size-4" /></span>
                  <div><p className="text-sm font-semibold">Ashish AI</p><p className="flex items-center gap-1 text-[10px] opacity-70"><span className="size-1.5 rounded-full bg-success" />Online</p></div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close chat"><X className="size-4" /></button>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto p-4 text-xs">
                {msgs.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.me ? "btn-primary ml-auto" : "bg-secondary"}`}>{m.t}</motion.div>
                ))}
                {typing && (
                  <div className="flex w-14 gap-1 rounded-2xl bg-secondary px-3 py-3">
                    {[0, 1, 2].map((i) => <motion.span key={i} className="size-1.5 rounded-full bg-lavender" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />)}
                  </div>
                )}
              </div>
              <div className="flex gap-2 border-t border-border p-3">
                <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask anything..." className="flex-1 rounded-full bg-muted px-4 py-2 text-xs outline-none ring-primary focus:ring-1" />
                <button onClick={send} aria-label="Send" className="btn-primary grid size-8 place-items-center rounded-full"><Send className="size-3.5" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setOpen((o) => !o)}
          initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 1 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          aria-label="Open AI chat"
          className="btn-primary relative grid size-14 place-items-center rounded-full"
        >
          <motion.span className="absolute inset-0 rounded-full border-2 border-lavender" animate={{ scale: [1, 1.6], opacity: [0.7, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.span className="absolute -inset-1 rounded-full border border-dashed border-lavender/60" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
          {open ? <X className="size-6" /> : <Bot className="size-6" />}
        </motion.button>
      </div>

      {/* WhatsApp - right */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi ashishkumarupadhyay.qzz.io, I'd like to book a demo")}`}
        target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 1.2 }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="group fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full border border-lavender/50 bg-success text-foreground"
        style={{ boxShadow: "0 0 30px -4px var(--success)" }}
      >
        <motion.span className="absolute inset-0 rounded-full border-2 border-success" animate={{ scale: [1, 1.6], opacity: [0.7, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
        <motion.span animate={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}><WhatsAppIcon /></motion.span>
        <span className="glass-card pointer-events-none absolute right-16 whitespace-nowrap rounded-full px-3 py-1.5 text-xs opacity-0 transition-opacity group-hover:opacity-100">Chat with us</span>
      </motion.a>
    </>
  );
}
