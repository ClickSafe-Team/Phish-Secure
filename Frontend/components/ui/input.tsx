import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-offset-background placeholder:text-slate-400 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-sky-300 focus-visible:ring-2 focus-visible:ring-sky-200 dark:border-white/10 dark:bg-slate-950/55 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-cyan-400 dark:focus-visible:ring-cyan-400/20",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
