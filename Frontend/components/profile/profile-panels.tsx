"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useProfileData } from "@/hooks/use-profile-data";
import { profileSchema, type ProfileSchema } from "@/lib/schemas";
import { formatDate } from "@/lib/utils";

export function ProfilePanels() {
  const { data, isLoading } = useProfileData();
  const { resolvedTheme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    form.reset({
      name: data.name,
      email: data.email,
      company: data.company,
    });
    setNotificationsEnabled(data.notificationsEnabled);
  }, [data, form]);

  if (isLoading || !data) {
    return (
      <PageShell>
        <Skeleton className="h-[220px]" />
        <Skeleton className="h-[320px]" />
      </PageShell>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <PageShell>
      <div className="grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Account settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={form.handleSubmit(() => {
                toast.success("Profile settings saved");
              })}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Full name
                </label>
                <Input id="name" {...form.register("name")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input id="email" {...form.register("email")} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium" htmlFor="company">
                  Company
                </label>
                <Input id="company" {...form.register("company")} />
              </div>
              <div className="rounded-[28px] border border-white/60 bg-white/60 p-5 md:col-span-2 dark:border-white/10 dark:bg-slate-950/45">
                <div className="text-sm text-muted-foreground">Current plan</div>
                <div className="mt-2 font-display text-2xl font-semibold">
                  {data.plan} · {data.role}
                </div>
              </div>
              <div className="md:col-span-2">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45">
              <div>
                <div className="font-medium">Dark mode</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Switch between light and dark operator views.
                </div>
              </div>
              <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
            <div className="flex items-center justify-between rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45">
              <div>
                <div className="font-medium">Notifications</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Receive product and scan alerts in-app.
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            {data.securityPreferences.map((preference) => (
              <div
                key={preference.label}
                className="flex items-center justify-between rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45"
              >
                <div>
                  <div className="font-medium">{preference.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {preference.description}
                  </div>
                </div>
                <Switch defaultChecked={preference.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.apiKeys.map((key) => (
            <div
              key={key.id}
              className="flex flex-col gap-4 rounded-[28px] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-950/45 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="font-medium">{key.name}</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Created {formatDate(key.createdAt)} · Last used {key.lastUsed}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">
                    <Eye className="h-4 w-4" />
                    View key
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{key.name}</DialogTitle>
                    <DialogDescription>
                      Placeholder key preview for frontend state design. Replace with real backend-secured token flows.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="rounded-2xl border border-white/60 bg-white/70 p-4 font-mono text-sm dark:border-white/10 dark:bg-slate-900/70">
                    {key.prefix}••••••••••••
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
