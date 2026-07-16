"use client";

import { motion } from "framer-motion";
import { Copy, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { downloadScanReport } from "@/lib/download";
import { shareScanResult } from "@/lib/share";
import { cn, formatDate } from "@/lib/utils";
import type { RiskLevel, ScanResult } from "@/types";

function riskVariant(riskLevel: RiskLevel) {
  if (riskLevel === "safe") {
    return "success";
  }

  if (riskLevel === "suspicious") {
    return "warning";
  }

  return "danger";
}

const toneClasses = {
  positive:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
  neutral:
    "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300",
};

export function ResultCard({ result }: { result: ScanResult }) {
  return (
    <motion.div layout>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-5 pb-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge variant={riskVariant(result.riskLevel)} className="mb-4 capitalize">
              {result.riskLevel}
            </Badge>
            <CardTitle className="text-2xl">Live scan result</CardTitle>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {result.aiSummary}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Scanned {formatDate(result.createdAt)}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[240px,1fr]">
            <div className="rounded-[32px] border border-white/60 bg-white/65 p-5 dark:border-white/10 dark:bg-slate-950/45">
              <ProgressRing value={result.phishingProbability} label="phishing probability" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45">
                <div className="text-sm text-muted-foreground">Confidence</div>
                <div className="mt-3 font-display text-4xl font-semibold">
                  {result.confidenceScore}%
                </div>
              </div>
              <div className="rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45">
                <div className="text-sm text-muted-foreground">Threat level</div>
                <div className="mt-3 font-display text-4xl font-semibold">
                  {result.threatLevel}
                </div>
              </div>
              <div className="rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45">
                <div className="text-sm text-muted-foreground">Domain age</div>
                <div className="mt-3 text-lg font-semibold">{result.domainAge}</div>
              </div>
              <div className="rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45">
                <div className="text-sm text-muted-foreground">SSL / Redirects</div>
                <div className="mt-3 text-lg font-semibold">
                  {result.sslStatus} · {result.redirectCount} hops
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {result.detectionFactors.map((factor) => (
              <div
                key={factor.label}
                className={cn(
                  "rounded-[24px] border px-4 py-4",
                  toneClasses[factor.tone],
                )}
              >
                <div className="text-xs uppercase tracking-[0.24em] opacity-75">
                  {factor.label}
                </div>
                <div className="mt-2 font-medium">{factor.value}</div>
              </div>
            ))}
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="details">
              <AccordionTrigger>Detailed AI explanation</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {result.aiExplanation.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="secondary"
              onClick={async () => {
                await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
                toast.success("Result copied to clipboard");
              }}
            >
              <Copy className="h-4 w-4" />
              Copy result
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                downloadScanReport(result);
                toast.success("PDF report downloaded");
              }}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button
              variant="secondary"
              onClick={async () => {
                await shareScanResult(result.scannedUrl, result.aiSummary);
                toast.success("Scan result shared");
              }}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
