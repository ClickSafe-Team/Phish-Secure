"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  History,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn, titleCase } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/history", label: "Scan History", icon: History },
  { href: "/profile", label: "Profile", icon: Settings },
];

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="glass-panel flex h-full flex-col p-5">
      <Link href="/" className="flex items-center gap-3 pb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-glow">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="font-display text-lg font-semibold">Cipher Sentry</div>
          <div className="text-xs text-muted-foreground">AI phishing defense</div>
        </div>
      </Link>

      <div className="space-y-2">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all",
                active
                  ? "bg-sky-500 text-white shadow-glow"
                  : "border border-transparent text-slate-600 hover:border-white/60 hover:bg-white/65 dark:text-slate-300 dark:hover:border-white/10 dark:hover:bg-slate-900/60",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto rounded-[calc(var(--radius)+4px)] border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-slate-900/55">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <BarChart3 className="h-4 w-4 text-sky-500" />
          Live posture
        </div>
        <div className="text-sm text-muted-foreground">
          Threat pressure is elevated today. Prioritize suspicious redirect chains and young domains.
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeItem = items.find((item) => item.href === pathname);
  const pageTitle = activeItem?.label ?? titleCase(pathname.replace("/", "") || "dashboard");

  return (
    <div className="container min-h-screen px-4 py-4 lg:py-6">
      <div className="grid min-h-[calc(100vh-2rem)] gap-4 lg:grid-cols-[280px,1fr]">
        <aside className="hidden lg:block">
          <SidebarNav pathname={pathname} />
        </aside>

        <div className="space-y-4">
          <header className="glass-panel flex items-center justify-between px-5 py-4">
            <div>
              <div className="text-sm text-muted-foreground">Security Workspace</div>
              <h1 className="font-display text-2xl font-semibold">{pageTitle}</h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                className="lg:hidden"
                variant="secondary"
                size="icon"
                onClick={() => setOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu />
              </Button>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/40 p-4 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              className="h-full max-w-xs"
            >
              <div className="mb-3 flex justify-end">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close sidebar"
                >
                  <X />
                </Button>
              </div>
              <SidebarNav pathname={pathname} onNavigate={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
