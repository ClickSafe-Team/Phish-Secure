"use client";

import { Search, Trash2 } from "lucide-react";
import { startTransition, useDeferredValue, useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteHistoryRecord, useHistoryData } from "@/hooks/use-history-data";
import { exportHistoryToCsv } from "@/lib/download";
import { formatDate } from "@/lib/utils";
import type { HistoryRecord, RiskLevel } from "@/types";

function riskVariant(level: RiskLevel) {
  if (level === "safe") return "success";
  if (level === "suspicious") return "warning";
  return "danger";
}

export function HistoryTable() {
  const { data, isLoading } = useHistoryData();
  const deleteMutation = useDeleteHistoryRecord();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | RiskLevel>("all");
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query);

  if (isLoading || !data) {
    return (
      <PageShell>
        <Skeleton className="h-24" />
        <Skeleton className="h-[520px]" />
      </PageShell>
    );
  }

  const filtered = data.filter((record) => {
    const matchesQuery = record.url
      .toLowerCase()
      .includes(deferredQuery.trim().toLowerCase());
    const matchesFilter = filter === "all" ? true : record.riskLevel === filter;
    return matchesQuery && matchesFilter;
  });

  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedRecords = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = async (record: HistoryRecord) => {
    try {
      await deleteMutation.mutateAsync(record.id);
      toast.success(`Deleted ${record.url}`);
    } catch {
      toast.error("Unable to delete scan");
    }
  };

  return (
    <PageShell>
      <Card>
        <CardHeader className="gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Scan history</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Search prior results, filter by risk, and export the current working set.
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                exportHistoryToCsv(filtered);
                toast.success("CSV export started");
              }}
            >
              Export CSV
            </Button>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr,220px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  startTransition(() => {
                    setQuery(nextValue);
                    setPage(1);
                  });
                }}
                placeholder="Search by URL"
                className="pl-10"
              />
            </div>

            <select
              aria-label="Filter by risk level"
              className="h-12 rounded-2xl border border-white/70 bg-white/80 px-4 text-sm shadow-sm outline-none focus-visible:border-sky-300 focus-visible:ring-2 focus-visible:ring-sky-200 dark:border-white/10 dark:bg-slate-950/55"
              value={filter}
              onChange={(event) => {
                const nextValue = event.target.value as "all" | RiskLevel;
                startTransition(() => {
                  setFilter(nextValue);
                  setPage(1);
                });
              }}
            >
              <option value="all">All risks</option>
              <option value="safe">Safe</option>
              <option value="suspicious">Suspicious</option>
              <option value="phishing">Phishing</option>
            </select>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {pagedRecords.length ? (
            pagedRecords.map((record) => (
              <div
                key={record.id}
                className="grid gap-4 rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45 xl:grid-cols-[1.8fr,auto,auto,auto]"
              >
                <div>
                  <div className="font-medium">{record.url}</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {formatDate(record.scannedAt)} · {record.redirects} redirects
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge variant={riskVariant(record.riskLevel)} className="capitalize">
                    {record.riskLevel}
                  </Badge>
                </div>
                <div className="flex items-center text-sm font-medium">
                  {record.probability}% probability
                </div>
                <div className="flex items-center justify-between gap-3 xl:justify-end">
                  <div className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium dark:bg-slate-900/70">
                    {record.status}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${record.url}`}
                    onClick={() => handleDelete(record)}
                  >
                    <Trash2 className="h-4 w-4 text-rose-500" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/70 bg-white/55 p-10 text-center text-muted-foreground dark:border-white/10 dark:bg-slate-950/35">
              No scans match the current search and filter combination.
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              {filtered.length
                ? `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filtered.length)} of ${filtered.length} results`
                : "Showing 0 results"}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === pageCount}
                onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
