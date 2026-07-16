import { Github, Linkedin, ShieldCheck, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  Product: ["Dashboard", "Scan History", "Profile", "Pricing"],
  Company: ["About", "Customers", "Blog", "Careers"],
  Resources: ["Docs", "Security", "Status", "Contact"],
};

export function Footer() {
  return (
    <footer className="container pb-10 pt-16">
      <div className="glass-panel overflow-hidden px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,2fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-glow">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold">Cipher Sentry</div>
                <div className="text-sm text-muted-foreground">
                  Premium phishing detection for modern security teams.
                </div>
              </div>
            </div>
            <div className="rounded-[calc(var(--radius)+4px)] border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-slate-900/55">
              <div className="mb-2 text-sm font-medium">Security newsletter</div>
              <div className="text-sm text-muted-foreground">
                Weekly signal, no noise. Product updates, threat insights, and operator workflows.
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Input aria-label="Email address" placeholder="Enter your work email" />
                <Button type="button" variant="secondary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <div className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {group}
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {links.map((link) => (
                    <div key={link}>{link}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/60 pt-6 text-sm text-muted-foreground dark:border-white/10 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Cipher Sentry. Built for decisive security teams.</span>
          <div className="flex items-center gap-3">
            <Link href="#" aria-label="Twitter" className="rounded-full border border-white/60 p-2 dark:border-white/10">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="rounded-full border border-white/60 p-2 dark:border-white/10">
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link href="#" aria-label="GitHub" className="rounded-full border border-white/60 p-2 dark:border-white/10">
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
