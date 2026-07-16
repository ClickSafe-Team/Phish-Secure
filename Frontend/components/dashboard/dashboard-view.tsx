"use client";

import { ArrowDownRight, ArrowUpRight, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { ScannerCard } from "@/components/marketing/scanner-card";
import { ResultCard } from "@/components/marketing/result-card";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { featuredScan } from "@/lib/mock-data";
import { cn, formatDate } from "@/lib/utils";
import type { ChartPoint, RiskLevel, ScanResult } from "@/types";

function OverviewCard({
  label,
  value,
  delta,
  direction,
}: {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
}) {
  const Icon = direction === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="font-display text-4xl font-semibold">{value}</div>
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
              direction === "up"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {delta}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AreaChart({ points }: { points: ChartPoint[] }) {
  const max = Math.max(...points.map((point) => point.value), 1);
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1 || 1)) * 100;
      const y = 100 - (point.value / max) * 82;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const fillPath = `${path} L 100 100 L 0 100 Z`;

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 100 100" className="h-56 w-full">
        <defs>
          <linearGradient id="trend-line" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="trend-fill" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.30)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.02)" />
          </linearGradient>
        </defs>
        {[20, 40, 60, 80].map((line) => (
          <line
            key={line}
            x1="0"
            x2="100"
            y1={line}
            y2={line}
            stroke="rgba(148,163,184,0.16)"
            strokeDasharray="2 4"
          />
        ))}
        <path d={fillPath} fill="url(#trend-fill)" />
        <path
          d={path}
          fill="none"
          stroke="url(#trend-line)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        {points.map((point, index) => {
          const x = (index / (points.length - 1 || 1)) * 100;
          const y = 100 - (point.value / max) * 82;
          return <circle key={point.label} cx={x} cy={y} fill="#0ea5e9" r="2.3" />;
        })}
      </svg>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
        {points.map((point) => (
          <div key={point.label}>{point.label}</div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ points }: { points: ChartPoint[] }) {
  const total = points.reduce((sum, point) => sum + point.value, 0);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const strokeColors = ["#38bdf8", "#f59e0b", "#fb7185"];
  const dotClasses = ["bg-sky-400", "bg-amber-400", "bg-rose-400"];

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
      <div className="relative">
        <svg viewBox="0 0 120 120" className="h-52 w-52 -rotate-90">
          <circle
            cx="60"
            cy="60"
            fill="transparent"
            r={radius}
            stroke="rgba(148,163,184,0.14)"
            strokeWidth="16"
          />
          {points.map((point, index) => {
            const segment = (point.value / total) * circumference;
            const currentOffset = offset;
            offset += segment;
            return (
              <circle
                key={point.label}
                cx="60"
                cy="60"
                fill="transparent"
                r={radius}
                stroke={strokeColors[index]}
                strokeDasharray={`${segment} ${circumference - segment}`}
                strokeDashoffset={-currentOffset}
                strokeLinecap="round"
                strokeWidth="16"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display text-4xl font-semibold">{total}%</span>
          <span className="text-xs text-muted-foreground">coverage mix</span>
        </div>
      </div>
      <div className="w-full max-w-xs space-y-4">
        {points.map((point, index) => (
          <div key={point.label} className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/55 px-4 py-3 dark:border-white/10 dark:bg-slate-950/45">
            <div className="flex items-center gap-3">
              <span className={cn("h-3 w-3 rounded-full", dotClasses[index])} />
              <span className="text-sm">{point.label}</span>
            </div>
            <span className="text-sm font-semibold">{point.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function riskVariant(level: RiskLevel) {
  if (level === "safe") return "success";
  if (level === "suspicious") return "warning";
  return "danger";
}

export function DashboardView() {
  const { data, isLoading } = useDashboardData();
  const [result, setResult] = useState<ScanResult>(featuredScan);

  if (isLoading || !data) {
    return (
      <PageShell>
        <div className="grid gap-4 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36" />
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <Skeleton className="h-[360px]" />
          <Skeleton className="h-[360px]" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="grid gap-4 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <OverviewCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Scan volume trend</CardTitle>
            <p className="text-sm text-muted-foreground">
              Weekly URL detection throughput with operator-ready clarity.
            </p>
          </CardHeader>
          <CardContent>
            <AreaChart points={data.scanTrend} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Balance of safe, suspicious, and confirmed phishing outcomes.
            </p>
          </CardHeader>
          <CardContent>
            <DonutChart points={data.riskDistribution} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.92fr,1.08fr]">
        <ScannerCard onScanned={setResult} compact />
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.activity.map((item) => (
              <div
                key={item.id}
                className="rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                  <div className="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                    {item.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <div className="rounded-[28px] border border-sky-200 bg-sky-50/90 p-5 dark:border-sky-500/20 dark:bg-sky-500/10">
              <div className="mb-2 flex items-center gap-2 font-medium text-sky-700 dark:text-sky-300">
                <ShieldAlert className="h-4 w-4" />
                Elevated phishing pressure
              </div>
              <p className="text-sm text-sky-700/80 dark:text-sky-300/80">
                Microsoft-style credential lures are trending today. Prioritize scans with
                urgent language and young domains.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ResultCard result={result} />

      <Card>
        <CardHeader>
          <CardTitle>Recent phishing detections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.recentScans.map((scan) => (
            <div
              key={scan.id}
              className="flex flex-col gap-4 rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <div className="font-medium">{scan.url}</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {formatDate(scan.scannedAt)} · {scan.redirects} redirects
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={riskVariant(scan.riskLevel)} className="capitalize">
                  {scan.riskLevel}
                </Badge>
                <div className="rounded-full bg-white/80 px-3 py-1 text-sm font-medium dark:bg-slate-900/70">
                  {scan.probability}% probability
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
