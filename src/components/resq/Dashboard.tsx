import { Search, Bell, ArrowUpRight } from "lucide-react";

const tabs = ["Overview", "Incidents", "Metrics", "History", "Teams"];

export function Dashboard() {
  return (
    <div className="glass-card rounded-2xl p-4 text-left font-sans md:p-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold">ashishkumarupadhyay.qzz.io</span>
        <div className="flex items-center gap-2">
          <div className="hidden rounded-full bg-muted p-1 sm:flex">
            {tabs.map((t, i) => (
              <span
                key={t}
                className={`rounded-full px-4 py-1.5 text-[10px] ${i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
              >
                {t}
              </span>
            ))}
          </div>
          <span className="grid size-7 place-items-center rounded-full border border-border"><Search className="size-3" /></span>
          <span className="grid size-7 place-items-center rounded-full border border-border"><Bell className="size-3" /></span>
          <span className="size-7 rounded-full bg-gradient-to-br from-chart-4 to-pinkish" />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-lg">Welcome in, <span className="text-muted-foreground">Caroline</span></h3>
          <div className="mt-2 grid grid-cols-4 gap-1.5 text-[9px] text-muted-foreground">
            <span>On-call shifts</span><span>Status pages</span><span>Alerts used</span><span>Reports</span>
            <span className="rounded-full bg-pinkish px-3 py-1.5 text-foreground">20%</span>
            <span className="rounded-full bg-foreground px-3 py-1.5 text-background">25%</span>
            <span className="rounded-full bg-secondary px-3 py-1.5 text-foreground">40%</span>
            <span className="rounded-full bg-muted px-3 py-1.5 text-foreground">15%</span>
          </div>
        </div>
        <div className="flex gap-6">
          {[["+12%", "38", "Critical issues"], ["+24%", "26", "Days spent"], ["-54%", "103", "Overnight work"]].map(([p, n, l]) => (
            <div key={l}>
              <div className="flex items-center gap-1">
                <span className="rounded-full bg-foreground px-1 text-[7px] text-background">{p}</span>
                <span className="font-display text-2xl">{n}</span>
              </div>
              <span className="text-[9px] text-muted-foreground">{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_2.4fr_1fr]">
        <div className="rounded-xl border border-border bg-muted/50 p-3 text-[10px]">
          <p className="mb-2 text-xs">Summary</p>
          {[["Triage", "1234", "bg-primary"], ["Fixing", "0", "bg-success"], ["Investigating", "24", "bg-pinkish"]].map(([t, n, c]) => (
            <div key={t} className="mb-2 flex items-center justify-between rounded-md border border-border bg-secondary/60 px-2 py-1.5">
              <span className="flex items-center gap-1.5"><span className={`size-1.5 rounded-full ${c}`} />{t}</span>
              <span className="rounded-full bg-muted px-2">{n}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-xs">Incident frequency</span>
            <div className="flex rounded-full border border-border p-0.5 text-[9px] text-muted-foreground">
              <span className="px-3 py-1">12 months</span><span className="rounded-full bg-secondary px-3 py-1 text-foreground">30 days</span><span className="px-3 py-1">1 week</span>
            </div>
          </div>
          <svg viewBox="0 0 320 110" className="mt-2 w-full">
            {[20, 45, 70, 95].map((y) => <line key={y} x1="20" x2="320" y1={y} y2={y} stroke="currentColor" className="text-border" strokeWidth=".5" />)}
            <path d="M20 30 C50 10 60 100 100 80 S140 20 160 60 S190 100 210 70 S230 40 240 45" fill="none" stroke="var(--primary)" strokeWidth="2" />
            <path d="M20 60 C50 90 70 90 90 70 S120 10 140 40 S170 110 190 60" fill="none" stroke="var(--pinkish)" strokeWidth="2" />
            <circle cx="190" cy="78" r="4" fill="var(--primary)" stroke="white" />
          </svg>
        </div>
        <div className="rounded-xl bg-primary p-3 text-[10px] text-primary-foreground">
          <div className="flex items-center justify-between"><span className="text-xs">Vulnerability</span><ArrowUpRight className="size-3" /></div>
          <p className="mt-2 opacity-80">Encryption ensures supplier data remains consistently secure from breaches</p>
          <div className="mt-3 rotate-2 rounded-md bg-foreground px-2 py-1.5 text-background">Priority</div>
          <div className="mt-1 -rotate-1 rounded-md bg-foreground/80 px-2 py-1.5 text-background">Thread</div>
        </div>
      </div>
    </div>
  );
}
