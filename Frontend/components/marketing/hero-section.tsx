"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const orbitCards = [
  { label: "AI verdict", value: "Critical" },
  { label: "SSL posture", value: "Weak" },
  { label: "Redirects", value: "4 hops" },
];

export function HeroSection() {
  return (
    <section className="container px-4 pb-10 pt-8 lg:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-8"
        >
          <Badge variant="outline" className="w-fit gap-2 px-4 py-2 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            Premium AI security interface
          </Badge>

          <div className="space-y-5">
            <h1 className="font-display text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              AI Powered{" "}
              <span className="text-gradient">Phishing Detection</span>
            </h1>
            <p className="max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-300">
              Scan malicious URLs, read model-backed verdicts, and move from suspicion to
              action with a sharper, calmer security workflow.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#scanner">
                Scan URL
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="section-border rounded-[calc(var(--radius)+4px)] p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-4 w-4 text-sky-500" />
                Threat coverage
              </div>
              <div className="text-sm text-muted-foreground">
                Detect spoofing, risky redirects, and trust-signal drift in one flow.
              </div>
            </div>
            <div className="section-border rounded-[calc(var(--radius)+4px)] p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-cyan-500" />
                Explainable AI
              </div>
              <div className="text-sm text-muted-foreground">
                Turn model confidence into human-readable decisions and summaries.
              </div>
            </div>
            <div className="section-border rounded-[calc(var(--radius)+4px)] p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Zap className="h-4 w-4 text-sky-500" />
                Fast response
              </div>
              <div className="text-sm text-muted-foreground">
                Move from raw URL to report in seconds without context switching.
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative"
        >
          <div className="glass-panel hairline-grid relative overflow-hidden rounded-[36px] px-6 py-8 lg:px-8 lg:py-10">
            <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/15" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.72),transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_50%)]" />

            <div className="relative flex min-h-[430px] items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-72 w-72 rounded-full border border-sky-200/70 dark:border-sky-400/20" />
                <div className="absolute h-56 w-56 rounded-full border border-dashed border-cyan-300/80 dark:border-cyan-400/20" />
                <div className="absolute h-40 w-40 rounded-full border border-sky-300/80 dark:border-sky-400/25" />
              </div>

              {orbitCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.4,
                  }}
                  className={[
                    "absolute rounded-[28px] border border-white/70 bg-white/80 px-4 py-3 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/75",
                    index === 0 && "left-4 top-10 sm:left-10",
                    index === 1 && "right-4 top-16 sm:right-10",
                    index === 2 && "bottom-10 left-6 sm:left-16",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="text-xs text-muted-foreground">{card.label}</div>
                  <div className="mt-1 font-display text-lg font-semibold">{card.value}</div>
                </motion.div>
              ))}

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                className="relative z-10 flex h-56 w-56 items-center justify-center rounded-[32px] border border-white/70 bg-white/82 shadow-glow backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75"
              >
                <div className="absolute inset-4 rounded-[28px] border border-sky-200/70 dark:border-sky-400/20" />
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-glow">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold">98.7%</div>
                    <div className="text-sm text-muted-foreground">
                      model confidence
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
