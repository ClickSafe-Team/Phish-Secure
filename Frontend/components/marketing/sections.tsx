"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  Lock,
  Radar,
} from "lucide-react";
import { featureCards, pricingTiers, testimonials } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const icons = [Radar, Bot, BrainCircuit, ChartNoAxesCombined, Lock, BadgeCheck];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300">
        {eyebrow}
      </div>
      <h2 className="font-display text-balance text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-balance text-muted-foreground">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="container px-4 py-12">
      <SectionHeading
        eyebrow="Capabilities"
        title="Purpose-built security UX for fast threat decisions"
        description="Every surface is designed to compress uncertainty and make phishing analysis feel crisp, modern, and actionable."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featureCards.map((item, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="glass-panel group p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition-transform duration-300 group-hover:-translate-y-1 dark:bg-sky-500/10 dark:text-sky-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.copy}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    "Paste a suspicious URL into the scanner.",
    "AI reviews trust signals, redirects, and phishing cues.",
    "Get a report with probability, verdict, and explanation.",
  ];

  return (
    <section id="how-it-works" className="container px-4 py-12">
      <div className="glass-panel p-6 lg:p-8">
        <SectionHeading
          eyebrow="Workflow"
          title="Three steps from uncertainty to a clear verdict"
          description="The experience keeps friction low while still surfacing enough security context to support confident action."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              className="rounded-[28px] border border-white/60 bg-white/65 p-6 dark:border-white/10 dark:bg-slate-900/50"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-glow">
                0{index + 1}
              </div>
              <p className="text-lg font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatisticsSection() {
  const stats = [
    { label: "URLs scanned", value: "18.4K" },
    { label: "Accuracy", value: "98.7%" },
    { label: "Threats prevented", value: "1,286" },
    { label: "Active users", value: "3,942" },
  ];

  return (
    <section className="container px-4 py-12">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="glass-panel p-6"
          >
            <div className="text-sm text-muted-foreground">{stat.label}</div>
            <div className="mt-3 font-display text-4xl font-semibold">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="container px-4 py-12">
      <SectionHeading
        eyebrow="Customer Voice"
        title="Security teams trust the speed and clarity"
        description="A refined UI is only useful if it improves decision-making. These operators use it to shorten review loops and communicate risk better."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.07 }}
            className="glass-panel p-6"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-400 font-display text-lg font-semibold text-white">
              {item.name
                .split(" ")
                .map((token) => token[0])
                .join("")}
            </div>
            <p className="text-base leading-7 text-slate-700 dark:text-slate-200">
              “{item.review}”
            </p>
            <div className="mt-6">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">{item.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="container px-4 py-12">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple plans for teams at different security maturities"
        description="Start with lightweight protection or scale into a deeper operating layer for high-volume threat review."
      />
      <div className="mt-10 grid gap-4 xl:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className={[
              "glass-panel p-6",
              tier.featured && "ring-2 ring-sky-300/70 dark:ring-cyan-400/40",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              </div>
              {tier.featured ? (
                <div className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </div>
              ) : null}
            </div>
            <div className="mb-6">
              <span className="font-display text-5xl font-semibold">{tier.price}</span>
              <span className="ml-2 text-muted-foreground">{tier.cadence}</span>
            </div>
            <div className="space-y-3">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  {feature}
                </div>
              ))}
            </div>
            <Button className="mt-8 w-full" variant={tier.featured ? "default" : "secondary"}>
              Choose {tier.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
