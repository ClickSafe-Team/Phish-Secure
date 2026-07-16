"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardPaste, LoaderCircle, Radar, Sparkles } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { urlScanSchema, type UrlScanSchema } from "@/lib/schemas";
import { useUrlScan } from "@/hooks/use-url-scan";
import type { ScanResult } from "@/types";

const phases = ["Analyzing URL structure", "Inspecting trust signals", "Generating AI explanation"];

interface ScannerCardProps {
  onScanned: (result: ScanResult) => void;
  compact?: boolean;
}

export function ScannerCard({ onScanned, compact = false }: ScannerCardProps) {
  const mutation = useUrlScan();
  const [progress, setProgress] = useState(8);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const form = useForm<UrlScanSchema>({
    resolver: zodResolver(urlScanSchema),
    defaultValues: {
      url: "https://secure-password-reset-alert.com",
    },
  });

  useEffect(() => {
    if (!mutation.isPending) {
      setProgress(8);
      setPhaseIndex(0);
      return;
    }

    const progressTimer = window.setInterval(() => {
      setProgress((value) => (value >= 92 ? value : value + 6));
    }, 180);

    const phaseTimer = window.setInterval(() => {
      setPhaseIndex((value) => (value + 1) % phases.length);
    }, 850);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(phaseTimer);
    };
  }, [mutation.isPending]);

  async function handlePaste() {
    try {
      const clipboard = await navigator.clipboard.readText();
      form.setValue("url", clipboard, { shouldValidate: true });
    } catch {
      toast.error("Clipboard access is unavailable in this browser");
    }
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const result = await mutation.mutateAsync(values);
      startTransition(() => {
        setProgress(100);
        onScanned(result);
      });
    } catch {
      toast.error("The scan could not be completed");
    }
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-5">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-sky-500" />
          AI scan engine
        </div>
        <CardTitle className={compact ? "text-xl" : "text-2xl"}>
          Paste a URL and let the model inspect it
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="url">
              Suspicious URL
            </label>
            <Input
              id="url"
              aria-invalid={Boolean(form.formState.errors.url)}
              placeholder="https://example.com"
              {...form.register("url")}
              className={compact ? "h-11" : "h-14 text-base"}
            />
            {form.formState.errors.url ? (
              <p className="text-sm text-rose-600">{form.formState.errors.url.message}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="secondary" onClick={handlePaste}>
              <ClipboardPaste className="h-4 w-4" />
              Paste
            </Button>
            <Button type="submit" size={compact ? "default" : "lg"} disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Scanning
                </>
              ) : (
                <>
                  <Radar className="h-4 w-4" />
                  Scan URL
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="rounded-[28px] border border-white/60 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-950/45">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Scan progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <svg viewBox="0 0 100 10" className="h-3 w-full overflow-visible rounded-full">
            <rect height="10" width="100" rx="5" fill="rgba(148,163,184,0.18)" />
            <motion.rect
              animate={{ width: progress }}
              height="10"
              rx="5"
              fill="url(#scanner-progress)"
            />
            <defs>
              <linearGradient id="scanner-progress" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={phases[phaseIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex items-center gap-3 rounded-2xl bg-sky-50/90 px-4 py-3 text-sm text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
            >
              <LoaderCircle className={mutation.isPending ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
              {mutation.isPending ? phases[phaseIndex] : "Ready to analyze suspicious links"}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
