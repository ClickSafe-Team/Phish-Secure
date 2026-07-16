"use client";

import { useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/marketing/hero-section";
import { ResultCard } from "@/components/marketing/result-card";
import { ScannerCard } from "@/components/marketing/scanner-card";
import {
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  StatisticsSection,
  TestimonialsSection,
} from "@/components/marketing/sections";
import { featuredScan } from "@/lib/mock-data";
import type { ScanResult } from "@/types";

export function LandingPage() {
  const [result, setResult] = useState<ScanResult>(featuredScan);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-70" />
      <Navbar />
      <HeroSection />

      <section id="scanner" className="container px-4 py-10">
        <div className="grid gap-6 xl:grid-cols-[0.86fr,1.14fr]">
          <ScannerCard onScanned={setResult} />
          <ResultCard result={result} />
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <StatisticsSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
